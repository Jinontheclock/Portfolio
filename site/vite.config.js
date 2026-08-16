import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES, PROJECT_IDS, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "./seo-routes.js";
import { LANGS, DEFAULT_LANG, HTML_LANG, OG_LOCALE, withLang } from "./src/lib/lang-routes.js";

/* Where this site lives, and therefore what every asset URL has to start
   with, is decided here rather than in a build flag someone has to remember.

   Two hosts, read in this order:

     SITE_DOMAIN=example.com   a build environment variable. This is the one
                               to set on Cloudflare Pages, which serves from
                               the root and has no CNAME file.
     public/CNAME              GitHub Pages' own custom-domain mechanism.
     neither                   the project page at /Portfolio/, where every
                               asset URL needs that prefix or it 404s.

   Local dev always runs at /. */
const here = path.dirname(fileURLToPath(import.meta.url));

const fromEnv = (process.env.SITE_DOMAIN || "").trim();
const cnameFile = path.join(here, "public", "CNAME");
const fromCname = fs.existsSync(cnameFile)
  ? fs.readFileSync(cnameFile, "utf8").trim().split("\n")[0].trim()
  : "";

const domain = (fromEnv || fromCname).replace(/^https?:\/\//, "").replace(/\/$/, "");

/* Cloudflare Pages always serves from the root, so a build there is rooted
   even before a custom domain is attached — otherwise the first deploy on
   the *.pages.dev preview URL would come up blank. */
const onCloudflare = Boolean(process.env.CF_PAGES);
const rooted = Boolean(domain) || onCloudflare;

/* The site's canonical home, now that there is one. A Cloudflare build
   defaults to it rather than to the *.pages.dev URL it happens to be
   deployed at: forgetting SITE_DOMAIN would otherwise publish 24 pages of
   canonical, og:url and hreflang pointing at a preview host. SITE_DOMAIN
   still overrides, which is what a staging project would set.

   GitHub Pages is deliberately not included. While that workflow is the one
   serving the site, its pages have to claim github.io — pointing them at a
   domain that is not live yet would be a false canonical. */
const CANONICAL_DOMAIN = "hajin-lee.com";

const BUILD_BASE = rooted ? "/" : "/Portfolio/";
const SITE_URL = domain
  ? `https://${domain}/`
  : onCloudflare
    ? `https://${CANONICAL_DOMAIN}/`
    : "https://jinontheclock.github.io/Portfolio/";

/* The old absolute URLs, as they appear inside the two prebuilt demos. */
const OLD_BASE = "/Portfolio/";
const OLD_SITE = "https://jinontheclock.github.io/Portfolio/";

/* tinypaws (Astro) and prolog (Expo web) are committed as finished builds
   with /Portfolio/ baked into thousands of asset URLs, and their sources
   live in their own repos. Vite copies public/ into dist/ untouched, so the
   prefix is rewritten on the way out. That keeps the two in step with
   whatever base this build is using, including a fresh export dropped in
   later that still carries the old prefix. compass already emits relative
   paths and needs none of this. */
const REWRITE_DIRS = ["tinypaws", "prolog"];
const TEXTUAL = /\.(html|js|mjs|css|json|map|xml|txt|webmanifest)$/i;

const rewritePrebuiltDemos = () => ({
  name: "rewrite-prebuilt-demo-base",
  apply: "build",
  closeBundle() {
    if (BUILD_BASE === OLD_BASE && SITE_URL === OLD_SITE) return;

    const dist = path.join(here, "dist");
    let files = 0;
    let hits = 0;

    const walk = (dir) => {
      if (!fs.existsSync(dir)) return;
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) {
          walk(p);
          continue;
        }
        if (!TEXTUAL.test(e.name)) continue;
        const src = fs.readFileSync(p, "utf8");
        if (!src.includes(OLD_BASE) && !src.includes(OLD_SITE)) continue;
        hits += (src.match(/\/Portfolio\//g) || []).length;
        fs.writeFileSync(p, src.split(OLD_SITE).join(SITE_URL).split(OLD_BASE).join(BUILD_BASE));
        files++;
      }
    };

    REWRITE_DIRS.forEach((d) => walk(path.join(dist, d)));
    this.info(`rewrote ${hits} absolute URLs across ${files} prebuilt demo files → ${BUILD_BASE}`);
  },
});

/* index.html carries four absolute URLs (canonical, og:url, og:image,
   twitter:image). OG crawlers do not resolve relative paths, so they have to
   stay absolute — they are written as %SITE_URL% and filled in here. */
const injectSiteUrl = () => ({
  name: "inject-site-url",
  transformIndexHtml: (html) => html.split("%SITE_URL%").join(SITE_URL),
});

/* One static page per route AND language, plus a 404 that boots the app.

   The site is client-rendered, so a crawler that runs JavaScript would
   eventually see the right title — but the unfurlers behind LinkedIn, Slack
   and iMessage do not run any, and they read the first HTML they are given.
   Writing dist/ko/work/prolog/index.html with ProLog's Korean description,
   lang="ko" and its own canonical is what makes a Korean link preview and
   index as Korean. The SPA takes over from there.

   Each page also carries the full hreflang set, which is the only way to
   tell a search engine that these are three translations of one page rather
   than three competing documents. English is x-default and sits at the root.

   404.html is the fallback both GitHub Pages and Cloudflare Pages serve for
   an unmatched path, which is how a deep link survives a cold load. */
const prerenderRoutes = () => ({
  name: "prerender-routes",
  apply: "build",
  closeBundle() {
    const dist = path.join(here, "dist");
    const shell = fs.readFileSync(path.join(dist, "index.html"), "utf8");

    const missing = PROJECT_IDS.filter((id) => !ROUTES.some((r) => r.path === `work/${id}`));
    if (missing.length) {
      this.error(`seo-routes.js has no entry for: ${missing.join(", ")}`);
    }

    /* absolute URL of a route in a language, always with a trailing slash */
    const urlFor = (lang, routePath) => {
      const rel = withLang(lang, routePath ? `/${routePath}` : "/").replace(/^\//, "");
      return SITE_URL + (rel ? `${rel}/` : "");
    };

    const hreflangFor = (routePath) =>
      [
        ...LANGS.map(
          (l) => `    <link rel="alternate" hreflang="${HTML_LANG[l]}" href="${urlFor(l, routePath)}" />`,
        ),
        `    <link rel="alternate" hreflang="x-default" href="${urlFor(DEFAULT_LANG, routePath)}" />`,
      ].join("\n");

    const swap = (html, route, lang) => {
      const url = urlFor(lang, route.path);
      const description = route.description[lang] || route.description[DEFAULT_LANG];
      let out = html
        .replace(/<html lang="[^"]*"/, `<html lang="${HTML_LANG[lang]}"`)
        .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
        /* The <meta name="description"> is what a search result actually
           prints, and it carries different copy from og:description, so it
           is matched by tag rather than by content. It is also written
           across several lines in index.html. */
        .replace(
          /<meta\s+name="description"\s+content="[^"]*"\s*\/>/s,
          `<meta name="description" content="${description}" />`,
        )
        .split(`content="${DEFAULT_DESCRIPTION}"`)
        .join(`content="${description}"`)
        .split(`content="${DEFAULT_TITLE}"`)
        .join(`content="${route.title}"`)
        .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
        .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
        /* this page's own locale leads; the other two stay as alternates */
        .replace(/(<meta property="og:locale" content=")[^"]*(")/, `$1${OG_LOCALE[lang]}$2`)
        /* the alternates are the other two languages, whichever this is */
        .replace(
          /[ \t]*<meta property="og:locale:alternate"[^>]*>\n/g,
          "",
        );

      const alternates = LANGS.filter((l) => l !== lang)
        .map((l) => `    <meta property="og:locale:alternate" content="${OG_LOCALE[l]}" />\n`)
        .join("");
      out = out.replace(
        /(<meta property="og:locale" content="[^"]*" \/>\n)/,
        `$1${alternates}${hreflangFor(route.path)}\n`,
      );

      if (route.noindex) {
        out = out.replace(/<\/title>/, `</title>\n    <meta name="robots" content="noindex" />`);
      }
      return out;
    };

    let written = 0;
    for (const lang of LANGS) {
      for (const route of ROUTES) {
        const rel = withLang(lang, route.path ? `/${route.path}` : "/").replace(/^\//, "");
        const dir = rel ? path.join(dist, rel) : dist;
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, "index.html"), swap(shell, route, lang));
        written++;
      }
    }

    /* the fallback keeps the site-wide head; it is not a real page */
    fs.writeFileSync(path.join(dist, "404.html"), shell);

    const urls = LANGS.flatMap((lang) =>
      ROUTES.filter((r) => !r.noindex).map((r) => {
        const alts = LANGS.map(
          (l) => `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[l]}" href="${urlFor(l, r.path)}"/>`,
        ).join("\n");
        return `  <url>\n    <loc>${urlFor(lang, r.path)}</loc>\n${alts}\n  </url>`;
      }),
    ).join("\n");
    fs.writeFileSync(
      path.join(dist, "sitemap.xml"),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
    );

    const robots = path.join(dist, "robots.txt");
    if (fs.existsSync(robots)) {
      fs.appendFileSync(robots, `\nSitemap: ${SITE_URL}sitemap.xml\n`);
    }

    const indexable = ROUTES.filter((r) => !r.noindex).length * LANGS.length;
    this.info(`prerendered ${written} pages (${ROUTES.length} routes x ${LANGS.length} languages) + 404.html, sitemap has ${indexable} urls`);
  },
});

export default defineConfig(({ command }) => {
  if (command === "build") {
    // eslint-disable-next-line no-console
    console.log(`[site] base ${BUILD_BASE}   canonical ${SITE_URL}`);
  }
  return {
    base: command === "build" ? BUILD_BASE : "/",
    plugins: [react(), injectSiteUrl(), rewritePrebuiltDemos(), prerenderRoutes()],
  };
});
