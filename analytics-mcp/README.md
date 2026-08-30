# analytics-mcp

An MCP server that reads this site's Cloudflare analytics, so the numbers can
be asked for in a conversation instead of read off a dashboard.

It is a separate Worker from the site. The site is `site/wrangler.jsonc`
(`hajin-lee`), a static-assets Worker with no script; this is
`analytics-mcp/wrangler.jsonc` (`hajin-lee-analytics-mcp`), a script with no
assets. Deploying either one does not touch the other.

## What it is built on

A stateless `createMcpHandler`, not an `McpAgent`. `McpAgent` is a Durable
Object — the right shape for a server that remembers something between calls,
and the wrong one here, where a call goes out to Cloudflare and comes straight
back. The Agents docs now mark `McpAgent` deprecated and feature-frozen for new
work. So there is no DO binding and no migration in the wrangler config, and
their absence is deliberate rather than an omission.

## Tools

| Tool | What it answers |
| --- | --- |
| `account_id` | Which account these numbers belong to. |
| `list_datasets` | Every analytics dataset on the account, from the live schema. Takes a `contains` filter. |
| `describe_dataset` | One dataset's dimensions, measures and filter shape. |
| `graphql_query` | Any query against the Analytics API, with variables. |

`list_datasets` and `describe_dataset` read the schema rather than carry a list
of dataset names in the source. The name of the Web Analytics RUM dataset is
not something to hardcode from memory and hope: Cloudflare's own documentation
answers "which dataset holds this" with "use introspection", so this server
does that, against whatever version the account is actually on.

`graphql_query` is the general door and the other three are conveniences over
it. It is deliberately not fenced to a fixed set of queries — the token behind
it can only read analytics, so the worst any query can do is read analytics,
and pinning the server to the questions imagined today would mean a redeploy
for the next one.

## Setup

### 1. The API token

Cloudflare dashboard → **My Profile → API Tokens → Create Token → Create
Custom Token**. Give it exactly one permission:

```
Account  →  Account Analytics  →  Read
```

Scope it to the one account, and set a short expiry. That permission cannot
deploy, cannot edit DNS, and cannot read anything but analytics — which is the
reason to use a scoped token here rather than a global key.

### 2. The account ID

Dashboard → account home. Put it in `wrangler.jsonc` under `vars.CF_ACCOUNT_ID`.
It identifies an account, it does not open one, so it is not a secret.

### 3. The shared secret

Any long random string. Generate one and keep a copy — the client needs it:

```bash
openssl rand -hex 32
```

### 4. Deploy

```bash
cd analytics-mcp
npm install
npx wrangler secret put CF_API_TOKEN        # paste the token from step 1
npx wrangler secret put MCP_SHARED_SECRET   # paste the secret from step 3
npx wrangler deploy
```

Wrangler prints the URL. The endpoint is that URL plus `/mcp`.

### 5. Connect a client

```bash
claude mcp add --transport http hajin-analytics \
  https://hajin-lee-analytics-mcp.<subdomain>.workers.dev/mcp \
  --header "Authorization: Bearer <the shared secret>"
```

## Why the shared secret

A Worker on `workers.dev` is reachable by anyone who learns its URL, and what
is behind this one is a live read of the account's analytics. CORS and hostname
allowlists are browser-side rules and do nothing about a plain `curl`, so the
check is on the request itself: a `Bearer` token compared in constant time,
before anything else runs.

That is the proportionate answer for a server with one user. OAuth is the
answer for a server with several, and the Agents SDK supports it through
`@cloudflare/workers-oauth-provider` if this is ever shared.

A client that cannot send an `Authorization` header cannot use this server.
That is the trade: `claude mcp add --header` can, and a connector UI that only
takes a URL cannot.

## Local development

```bash
cp .dev.vars.example .dev.vars   # fill in the three values
npx wrangler dev
```

`.dev.vars` is gitignored. The real token belongs there and nowhere else in
this directory.

Driving it by hand, without a client:

```bash
curl -s -X POST http://localhost:8787/mcp \
  -H "Authorization: Bearer $MCP_SHARED_SECRET" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

## What has been verified, and what has not

Run locally against a real `wrangler dev`, driven with raw JSON-RPC:

- a request with no `Authorization` header is refused with 401
- a wrong secret of the same length is refused with 401
- `initialize` completes and the server reports protocol `2025-06-18`
- `tools/list` returns all four tools
- `account_id` returns the configured account, so env and dispatch are wired
- `list_datasets` and `graphql_query` reach `api.cloudflare.com` and hand back
  its reply verbatim — with a deliberately invalid token, error 9106
  "Authentication failed", which is Cloudflare answering rather than the Worker
  failing
- a missing required argument is refused by the schema with a readable message
- with `CF_API_TOKEN` unset the server answers `500 Not configured:
  CF_API_TOKEN unset` rather than failing somewhere inside a GraphQL call

Not verified: any query against real data. That needs a real token, which the
environment this was built in does not have. The request path is proven to be
correct as far as Cloudflare's own authentication check; what a valid token
returns beyond that is still to be seen.
