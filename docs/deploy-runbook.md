# Deploying this site

Where the site lives is read by `site/vite.config.js` at build time, in this
order. Nothing else in the repo hardcodes a host.

| Source | Base | Canonical / og:url |
|---|---|---|
| `SITE_DOMAIN=example.com` (build env var) | `/` | `https://example.com/` |
| `CF_PAGES` set, no `SITE_DOMAIN` | `/` | `$CF_PAGES_URL` |
| `site/public/CNAME` | `/` | the domain in that file |
| none of the above | `/Portfolio/` | `https://jinontheclock.github.io/Portfolio/` |

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

## Moving to Cloudflare Pages

Do these in order. The site keeps serving from GitHub Pages the whole time
until the last step.

1. **Buy the domain and put it on Cloudflare** (Registrar or nameservers).
2. **Create the Pages project** against this repo:

   | Setting | Value |
   |---|---|
   | Framework preset | None |
   | Root directory | `site` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Environment variables | `NODE_VERSION=22`, `SITE_DOMAIN=<the canonical domain>` |

   Build output is `dist`, not `site/dist`: the root directory already puts
   the build inside `site/`, so `site/dist` would resolve to
   `site/site/dist` and the deploy would find nothing.

   Leave `SITE_DOMAIN` unset for the first deploy if you want to check the
   `*.pages.dev` URL first — `CF_PAGES` alone roots the build correctly.

3. **Check the `*.pages.dev` deploy** against the list below before pointing
   the domain at it.
4. **Add both apex and `www`** under Custom domains, and redirect one to the
   other. Decide which is canonical first and set `SITE_DOMAIN` to exactly
   that, or `canonical` will disagree with where visitors land.
5. **Turn on Always Use HTTPS.**
6. **Retire the GitHub Pages workflow** once Cloudflare is serving:
   `.github/workflows/deploy.yml` → change `on:` to `workflow_dispatch` only,
   so two hosts are not publishing the same commit. Do not delete it; it is
   the way back.

Do not add a `_redirects` file. The build already writes a real page for
every route plus a `404.html`, which both hosts serve for an unmatched path,
so deep links resolve without a rewrite rule. A catch-all `/* /index.html`
would swallow the demo paths under `public/` and hand every case study the
site-wide head instead of its own.

## Verifying a move

```sh
# no stale prefix anywhere in the artifact
grep -rc "/Portfolio/" dist/ | grep -v ':0$'

# the four absolute URLs point at the new host
grep -iE "og:|canonical" dist/index.html
```

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

The Compass demo's Adobe Fonts kit needs nothing on a host move. Adobe
dropped Typekit's per-kit domain allowlist when web projects replaced kits,
so `use.typekit.net/aqa6xjt.css` serves the same fonts from any host. What
the kit must keep is `ff-meta-web-pro` at 400, 500, 600 and 700 — a slimmer
kit missing 500 or 600 silently changes the demo's type scale.

## Leaving the old address up

`jinontheclock.github.io/Portfolio/` keeps working while the workflow is
enabled, and the canonical it emits points at itself. Once `SITE_DOMAIN` is
live on Cloudflare, both hosts serving the same content is duplicate
content, and the GitHub copy still claims to be canonical. Retire the
workflow rather than leaving both up.

## Rolling back

Cloudflare Pages keeps every deploy; roll back there first. To return to
GitHub Pages, restore the `on: push` trigger in `deploy.yml` and remove
`SITE_DOMAIN`; the next build goes back to `/Portfolio/` on its own.
