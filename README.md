# HAJIN — portfolio

The personal portfolio of Hajin Lee, a product designer in Vancouver, BC.
Five case studies in English, 日本語 and 한국어, with three of the projects
running as live demos inside the site.

Live: <https://hajin-lee.com>

## Running it

```sh
cd site
npm install
npm run dev       # http://localhost:5173
npm run build     # writes site/dist
npm run preview   # serves the built site
```

Node 22.

## Layout

```
site/            the site itself — React 18 + Vite 6
  src/data/      case-study copy, one file per project, three languages each
  src/pages/     Landing, Work, About, and the case-study template
  public/        static files copied verbatim, including three demos:
                   compass/    a prototype of the Compass Card app
                   prolog/     an Expo web export of ProLog
                   tinypaws/   an Astro build of the TinyPaws site
  seo-routes.js  per-page title and description, read at build time
  vite.config.js decides the host, rewrites the demos, prerenders the pages
docs/            deploy runbook and asset notes
project/         the original design-system spec and HTML prototype
```

The two larger demos are finished builds from their own repositories
(`Jinontheclock/ProLog`, `Jinontheclock/TinyPaws`) rather than sources, so
the absolute asset URLs inside them are rewritten at build time to match
whatever host the site is being deployed to.

## Building and deploying

Every route exists as a real HTML file: the build writes one page per route
and language — twenty-four in all — each with its own title, description,
canonical and hreflang set, because link unfurlers do not run JavaScript.
The app takes over from there.

`site/vite.config.js` decides the host at build time and prints what it
picked. See [docs/deploy-runbook.md](docs/deploy-runbook.md) for the rest,
including how to move hosts and how to verify a move.
