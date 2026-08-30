import { createMcpHandler } from "agents/mcp/server";
import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

/* An MCP server that reads this site's Cloudflare analytics.
 *
 * It holds nothing between requests — a call goes out to Cloudflare's GraphQL
 * Analytics API and comes straight back — so it is a stateless
 * createMcpHandler rather than an McpAgent. McpAgent is a Durable Object,
 * which is the right shape for a server that remembers something and the
 * wrong one for this; the Agents docs now mark it deprecated and
 * feature-frozen for new work.
 *
 * The one endpoint everything goes through, and the token permission it
 * needs, are the ones Cloudflare documents for this API:
 * Account > Account Analytics > Read. That permission cannot deploy, cannot
 * edit DNS and cannot read anything but analytics, which is the whole reason
 * to use a scoped token here rather than a global key. */
const GRAPHQL_ENDPOINT = "https://api.cloudflare.com/client/v4/graphql";

interface Env {
  /** Cloudflare API token, Account > Account Analytics > Read. A secret. */
  CF_API_TOKEN: string;
  /** The account the analytics belong to. */
  CF_ACCOUNT_ID: string;
  /** Shared secret every caller must present. A secret. See the gate below. */
  MCP_SHARED_SECRET: string;
}

/** What Cloudflare answered, or a description of why it did not. */
async function graphql(env: Env, query: string, variables: unknown) {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.CF_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: variables ?? {} }),
  });

  const body = await res.text();
  if (!res.ok) {
    /* The body is Cloudflare's own error text. It names the problem — a bad
       token, a missing permission — far better than the status alone, and it
       carries no secret of ours. */
    return { ok: false as const, text: `HTTP ${res.status} from Cloudflare\n${body}` };
  }

  let parsed: { data?: unknown; errors?: unknown };
  try {
    parsed = JSON.parse(body);
  } catch {
    return { ok: false as const, text: `Cloudflare returned something that is not JSON\n${body}` };
  }

  /* GraphQL reports a rejected query as 200 with an errors array, so a
     response that is only checked for its status reads as a success and
     returns nothing. Both halves are handed back: a partial result can carry
     errors beside the data it did manage. */
  const out = [];
  if (parsed.errors) out.push(`errors:\n${JSON.stringify(parsed.errors, null, 2)}`);
  if (parsed.data) out.push(`data:\n${JSON.stringify(parsed.data, null, 2)}`);
  return { ok: !parsed.errors, text: out.join("\n\n") || body };
}

const text = (s: string) => ({ content: [{ type: "text" as const, text: s }] });

function createServer(env: Env) {
  const server = new McpServer({ name: "hajin-lee-analytics", version: "1.0.0" });

  /* The account this server reads, so a caller does not have to know it or be
     told it out of band. */
  server.registerTool(
    "account_id",
    { description: "The Cloudflare account ID this server reads analytics for.", inputSchema: {} },
    async () => text(env.CF_ACCOUNT_ID),
  );

  /* Every dataset on the account, straight from the schema.
   *
   * This is here because the name of the Web Analytics RUM dataset is not
   * something to carry in from memory and hope. Cloudflare's own docs answer
   * "which dataset holds this" with "use introspection", so the server can
   * answer it too, against the live schema, at the version the account is
   * actually on. */
  server.registerTool(
    "list_datasets",
    {
      description:
        "List the analytics datasets available on this account, from the live GraphQL schema. " +
        "Use this to find the right dataset before writing a query — e.g. the RUM/Core Web Vitals ones.",
      inputSchema: {
        contains: z
          .string()
          .optional()
          .describe("Case-insensitive substring filter on the dataset name, e.g. 'rum' or 'vitals'."),
      },
    },
    async ({ contains }) => {
      const r = await graphql(
        env,
        `query { __type(name: "Account") { fields { name description } } }`,
        {},
      );
      if (!r.ok) return text(r.text);
      let fields: Array<{ name: string; description: string | null }> = [];
      try {
        fields = JSON.parse(r.text.replace(/^data:\n/, "")).__type?.fields ?? [];
      } catch {
        return text(r.text);
      }
      const needle = contains?.toLowerCase();
      const hits = needle ? fields.filter((f) => f.name.toLowerCase().includes(needle)) : fields;
      return text(
        `${hits.length} of ${fields.length} datasets${needle ? ` matching "${contains}"` : ""}:\n\n` +
          hits.map((f) => `${f.name}${f.description ? ` — ${f.description}` : ""}`).join("\n"),
      );
    },
  );

  /* What a dataset will actually let you ask for. Once list_datasets has
     named one, this is how you learn its filters, dimensions and measures
     without leaving the conversation. */
  server.registerTool(
    "describe_dataset",
    {
      description:
        "Describe one dataset's fields — its dimensions, measures and filter shape — from the live schema.",
      inputSchema: {
        name: z.string().describe("Dataset type name, e.g. as returned by list_datasets."),
      },
    },
    async ({ name }) => {
      const r = await graphql(
        env,
        `query Describe($name: String!) {
           __type(name: $name) {
             name
             fields { name description type { name kind ofType { name kind } } }
           }
         }`,
        { name },
      );
      return text(r.text);
    },
  );

  /* The general door. Everything above is a convenience over this one.
   *
   * It is deliberately not fenced to a fixed set of queries: the token behind
   * it can only read analytics, so the worst a query can do is read analytics,
   * and pinning the server to the handful of questions imagined today would
   * mean a redeploy for the next one. */
  server.registerTool(
    "graphql_query",
    {
      description:
        "Run a GraphQL query against Cloudflare's Analytics API and return the result. " +
        "The account ID is available from the account_id tool; pass it as a variable. " +
        "Read-only: the token behind this can read analytics and nothing else.",
      inputSchema: {
        query: z.string().describe("The GraphQL query document."),
        variables: z
          .record(z.string(), z.unknown())
          .optional()
          .describe("Variables for the query, as an object."),
      },
    },
    async ({ query, variables }) => {
      const r = await graphql(env, query, variables);
      return text(r.text);
    },
  );

  return server;
}

/* The gate.
 *
 * A Worker on workers.dev is reachable by anyone who learns the URL, and what
 * is behind this one is a live read of the account's analytics. CORS and
 * hostname allowlists are browser-side rules — they do nothing about a plain
 * curl — so the check has to be on the request itself.
 *
 * A shared secret is the proportionate answer for a server with one user.
 * OAuth is the answer for a server with many, and the Agents SDK supports it
 * through @cloudflare/workers-oauth-provider if this ever needs to be shared.
 *
 * The comparison is length-first and then constant-time: an early return on
 * the first differing byte tells a patient caller how much of a guess was
 * right. */
function authorized(request: Request, secret: string) {
  const header = request.headers.get("Authorization") ?? "";
  const offered = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (offered.length !== secret.length) return false;
  let diff = 0;
  for (let i = 0; i < secret.length; i++) diff |= offered.charCodeAt(i) ^ secret.charCodeAt(i);
  return diff === 0;
}

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    /* Missing configuration is answered plainly rather than as a 500 from
       somewhere inside a GraphQL call. All three have to be set with
       `wrangler secret put` (CF_ACCOUNT_ID can be a plain var); a server
       missing any of them cannot do its job and should say which. */
    const missing = (["CF_API_TOKEN", "CF_ACCOUNT_ID", "MCP_SHARED_SECRET"] as const).filter(
      (k) => !env[k],
    );
    if (missing.length) {
      return new Response(`Not configured: ${missing.join(", ")} unset\n`, { status: 500 });
    }

    if (!authorized(request, env.MCP_SHARED_SECRET)) {
      return new Response("Unauthorized\n", {
        status: 401,
        headers: { "WWW-Authenticate": "Bearer" },
      });
    }

    /* The factory, not a built server: the handler makes one per request, so
       two concurrent requests never share a connected instance. And the
       handler is called here rather than default-exported, because Wrangler
       reads a function default export as a WorkerEntrypoint class. */
    return createMcpHandler(() => createServer(env), { route: "/mcp" })(request, env, ctx);
  },
} satisfies ExportedHandler<Env>;
