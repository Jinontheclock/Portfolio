# Deploying this site

Where the site lives is read by `site/vite.config.js` at build time, in this
order. Nothing else in the repo hardcodes a host.

| Source | Base | Canonical / og:url |
|---|---|---|
| `SITE_DOMAIN=example.com` (build env var) | `/` | `https://example.com/` |
| `CF_PAGES` or `WORKERS_CI` set, no `SITE_DOMAIN` | `/` | `https://hajin-lee.com/` |
| `site/public/CNAME` | `/` | the domain in that file |
| none of the above | `/Portfolio/` | `https://jinontheclock.github.io/Portfolio/` |

Cloudflare sets one of those two itself — `CF_PAGES` on Pages, `WORKERS_CI`
on Workers Builds — and neither is ever set locally or on GitHub Actions, so
the host is recognised without anyone remembering a flag.

`hajin-lee.com` is the canonical home, so a Cloudflare build defaults to it
rather than to whatever `workers.dev` or `pages.dev` URL it was deployed at
— forgetting `SITE_DOMAIN` cannot publish a preview host as canonical. Set
`SITE_DOMAIN` only for a staging project that should claim a different
address.

Every build prints what it picked:

```
[site] base /   canonical https://example.com/
```

Check that line first when something 404s after a move.

## What follows the base automatically

- Everything Vite emits, plus every `import.meta.env.BASE_URL` consumer:
  hero and card videos, the demo iframes, the favicon and apple-touch-icon.
- `canonical`, `og:url`, `og:image`, `twitter:image` in `index.html`, which
  are written as `%SITE_URL%` and filled in at build.
- The `/Portfolio/` prefix baked into the two prebuilt demos under
  `public/tinypaws/` and `public/prolog/`. Those are finished builds from
  their own repos (`Jinontheclock/TinyPaws`, `Jinontheclock/ProLog`) with
  ~3,000 absolute asset URLs in them, and Vite copies `public/` into `dist/`
  untouched, so the prefix is rewritten in `dist/` on the way out. A fresh
  export dropped in later that still carries the old prefix is rewritten
  too, so the two never need to be re-exported just to move host.
  `public/compass/` already emits relative paths and is left alone.

## Moving to Cloudflare

The site goes to Cloudflare as a **Worker serving static assets**, not as a
Pages project. Pages is the older of the two and Cloudflare's dashboard now
opens on Workers; the Worker is also the cheaper shape, because requests
answered from static assets are free and unbilled. `site/wrangler.jsonc` is
what makes that work — it declares a Worker with no script at all, so every
request is answered straight from `site/dist`.

**The move happened on 2026-08-16 and all six steps below are done.** They
are kept as the procedure, not as a to-do list: this is how the site got
where it is, and how it would be stood up again on a fresh account. Each
step notes what actually happened where that is worth knowing.

Do these in order. The site kept serving from GitHub Pages the whole time
until the last step.

The domain was already on Cloudflare: `hajin-lee.com` was served by the
`nia`/`wilson` nameservers with no A or CNAME record, so nothing answered
on it until the Worker claimed it.

1. **Create the Worker** from this repo: Workers & Pages → Create
   application → Import a repository → `Jinontheclock/Portfolio`.

   | Setting | Value |
   |---|---|
   | Project name | `hajin-lee` |
   | Build command | `npm run build` |
   | Deploy command | `npx wrangler deploy` |
   | Path (root directory) | `site` |
   | Environment variables | `NODE_VERSION=22` |

   **Project name must equal `name` in `site/wrangler.jsonc`.** Cloudflare
   rejects the build otherwise, so the two move together or not at all.

   **Path is `site`, not `/`.** `package.json` lives in `site/`, and a build
   at the repo root fails with `ENOENT … package.json` before it compiles
   anything. Everything else in the config is relative to that path:
   `assets.directory` is `./dist`, meaning `site/dist`.

   `SITE_DOMAIN` is not needed: the build already knows the canonical
   domain. Set it only if this project should claim a different address.

2. **Check the `*.workers.dev` deploy** against the list below before
   pointing the domain at it. Its pages will already say `hajin-lee.com` in
   their canonical and og tags, which is correct — that is where they are
   headed.
3. **Add the custom domain.** In the Worker, Settings → Domains & Routes →
   add `hajin-lee.com`, then `www.hajin-lee.com`. Because the zone is
   already on this account, Cloudflare writes the DNS records itself; there
   is nothing to add by hand in the DNS tab.
4. **Redirect `www` to the apex.** The apex is canonical — every canonical,
   og:url and hreflang across the 24 built pages says `hajin-lee.com` with
   no `www`. Both hostnames answer, because step 3 attached both to the
   Worker, so without this rule the same 24 pages are reachable at an
   address none of their own tags admit to.

   Rules → Overview → the **Redirect from WWW to root** template, then:

   | Field | Value |
   |---|---|
   | Request URL | `https://www.*` |
   | Target URL | `https://${1}` |
   | Status | `301` |
   | Preserve query string | **on** |

   **Turn `Preserve query string` on.** The template hands it to you off.
   Left off, the redirect drops everything after the `?`, so a visitor
   arriving from a campaign or a tracked link — `?utm_source=…` — lands on
   the right page with the attribution stripped, and analytics records
   direct traffic that was not direct.

   **Cloudflare will warn that the rule may not apply, and deploying anyway
   is correct.** Choose `Ignore and deploy rule anyway`. The warning is a
   false negative: the pre-flight check looks for an `A`, `AAAA` or `CNAME`
   record on `www` and finds none, because step 3 attached `www` as a Worker
   custom domain and that writes a record of type `Worker`, which the check
   does not recognise.

   **Do not accept the offer to `Create a new proxied DNS record`.** `www`
   already has a record — the Worker custom domain — and a second one
   collides with it.

   The rule wins over the Worker because Redirect Rules run earlier in
   Cloudflare's request pipeline than Workers do: the 301 is answered before
   the Worker is ever reached. If that order ever changes and `www` starts
   serving the site instead of redirecting, the fallback is to stop
   attaching `www` to the Worker at all — remove it from the Worker's
   Domains & Routes, add a **proxied `AAAA` record on `www` pointing at
   `100::`** (the documented discard address for proxy-only records), and
   the same rule applies unchanged, now against a record type the check
   recognises too.

5. **Turn on Always Use HTTPS.** This also covers `http://www…`, which
   otherwise matches nothing: the rule in step 4 is written against
   `https://www.*`, and a plain-HTTP request never reaches it. Always Use
   HTTPS upgrades the scheme first, and the `www` rule matches the result.
   Two hops rather than one, which is fine — the second is a 301 as well.

6. **Retire the GitHub Pages workflow** once Cloudflare is serving:
   `.github/workflows/deploy.yml` → change `on:` to `workflow_dispatch` only,
   so two hosts are not publishing the same commit. Do not delete it; it is
   the way back, and it needs no edit to be one.

   Stopping the workflow stops new publishes. The last build it published
   stays up at `jinontheclock.github.io/Portfolio/` until GitHub Pages is
   unpublished in Settings → Pages; see *Leaving the old address up* below
   for why that was left as a separate decision.

Do not add a `_redirects` file, and do not change `not_found_handling` to
`single-page-application`. The build already writes a real page for every
route plus a `404.html`, which every host here serves for an unmatched path,
so deep links resolve without a rewrite rule. A catch-all would swallow the
demo paths under `public/`, hand every case study the site-wide head instead
of its own, and answer 200 to every typo.

## Verifying a move

Reproduce the Cloudflare build locally by setting the variable Cloudflare
would have set, then check the artifact:

```sh
WORKERS_CI=1 npm run build   # must print: base /   canonical https://hajin-lee.com/

# no stale prefix anywhere in the artifact
grep -rc "/Portfolio/" dist/ | grep -v ':0$'

# the four absolute URLs point at the new host
grep -iE "og:|canonical" dist/index.html
```

If the build prints `base /Portfolio/` in Cloudflare's own log, the variable
did not reach it and the deploy will 404 on every asset. Stop there.

In a browser, on the new host:

- Landing → Work → all five cards → each case study opens.
- **Open all three demos and watch the Network tab for 404s**: Compass
  (`Open the prototype`), ProLog (`Try app`), TinyPaws (`Visit the live
  site`). This is where a base mistake shows up first.
- Favicon in the tab, no `apple-touch-icon` 404.
- Hero videos and Work card videos play.
- A deep link pasted in cold, e.g. `/work/compass-card/`, and one bad path,
  e.g. `/work/nope`, which should land on Work rather than a host 404 page.
- All three languages.

Then the hostnames, which the browser will not show you honestly because it
follows redirects silently:

```sh
# a www deep link keeps its path AND its query string
curl -s -o /dev/null -w '%{num_redirects} %{url_effective}\n' -L \
  'https://www.hajin-lee.com/work/compass-card/?x=1'
# 1 https://hajin-lee.com/work/compass-card/?x=1

# plain http on www lands in the same place, in two hops
curl -s -o /dev/null -w '%{num_redirects} %{url_effective}\n' -L \
  'http://www.hajin-lee.com/work/prolog/'
# 2 https://hajin-lee.com/work/prolog/

# and the apex redirects nowhere at all
curl -s -o /dev/null -w '%{num_redirects} %{url_effective}\n' -L \
  'https://hajin-lee.com/'
# 0 https://hajin-lee.com/
```

The last one is the one to actually run. A `www` rule written a little too
broadly — matching `*hajin-lee.com` rather than `www.hajin-lee.com` —
matches the apex as well and sends it to itself, and the front page becomes
an infinite redirect. It fails on the home page, which is the last place
anyone thinks to check after a change that was about `www`.

The Compass demo's Adobe Fonts kit needs nothing on a host move. Adobe
dropped Typekit's per-kit domain allowlist when web projects replaced kits,
so `use.typekit.net/aqa6xjt.css` serves the same fonts from any host. What
the kit must keep is `ff-meta-web-pro` at 400, 500, 600 and 700 — a slimmer
kit missing 500 or 600 silently changes the demo's type scale.

## Leaving the old address up

`.github/workflows/deploy.yml` now has `workflow_dispatch` as its only
trigger, so nothing publishes to `jinontheclock.github.io/Portfolio/` on a
push any more. That was the part that mattered: while it ran on push, every
commit went to both hosts, and the GitHub copy declares *itself* canonical —
`vite.config.js` gives a GitHub Pages build the github.io canonical on
purpose, because pointing it at a domain it is not serving would be a lie.
Two addresses each claiming to be the original of the same 24 pages is
duplicate content, and on a portfolio that is being read by people hiring,
the cost is the wrong address surfacing in a search.

GitHub Pages itself was left switchable rather than switched off in repo
Settings. An old copy that nothing links to and nothing updates costs
nothing to leave sitting there, and it is the fastest way back: run the
workflow by hand and the old address is serving again in a couple of
minutes. Unpublishing it is a separate decision, and the thing to weigh is
whether `jinontheclock.github.io/Portfolio` was ever written on a résumé or
an application — those links 404 the moment it comes down, and links already
in other people's hands cannot be corrected.

Note that `jinontheclock.github.io/TinyPaws/` is a different repository's
Pages site, and the TinyPaws case study links to it in three places.
Unpublishing this one does not touch it.

## Rolling back

Cloudflare keeps every deployment of the Worker; roll back there first
(Deployments → the last good one → Rollback). To return to GitHub Pages,
restore the `on: push` trigger in `deploy.yml`. Nothing else has to change:
GitHub Actions sets neither `CF_PAGES` nor `WORKERS_CI`, so that build goes
back to `/Portfolio/` and its own canonical on its own.
