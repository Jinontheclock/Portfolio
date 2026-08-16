import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES, PROJECT_IDS, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "./seo-routes.js";

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

const BUILD_BASE = rooted ? "/" : "/Portfolio/";
const SITE_URL = domain
  ? `https://${domain}/`
  : onCloudflare && process.env.CF_PAGES_URL
    ? `${process.env.CF_PAGES_URL.replace(/\/$/, "")}/`
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

/* One static page per route, plus a 404 that boots the app.

   The site is client-rendered, so a crawler that runs JavaScript would
   eventually see the right title — but the unfurlers behind LinkedIn, Slack
   and iMessage do not run any, and they read the first HTML they are given.
   Writing dist/work/prolog/index.html with ProLog's own title and
   description is what makes a shared case-study link preview as that case
   study. The SPA takes over from there.

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

    /* Swap the four head strings that differ per page. The values written
       at build already carry SITE_URL, so they are matched by content. */
    const swap = (html, route) => {
      const url = SITE_URL + route.path + (route.path ? "/" : "");
      let out = html
        .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
        .split(`content="${DEFAULT_DESCRIPTION}"`)
        .join(`content="${route.description}"`)
        .split(`content="${DEFAULT_TITLE}"`)
        .join(`content="${route.title}"`)
        .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
        .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
      if (route.noindex) {
        out = out.replace(/<\/title>/, `</title>\n    <meta name="robots" content="noindex" />`);
      }
      return out;
    };

    const written = [];
    for (const route of ROUTES) {
      const html = swap(shell, route);
      const dir = route.path ? path.join(dist, route.path) : dist;
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, "index.html"), html);
      written.push(route.path || "/");
    }

    /* the fallback keeps the site-wide head; it is not a real page */
    fs.writeFileSync(path.join(dist, "404.html"), shell);

    const indexable = ROUTES.filter((r) => !r.noindex);
    const urls = indexable
      .map((r) => `  <url><loc>${SITE_URL}${r.path}${r.path ? "/" : ""}</loc></url>`)
      .join("\n");
    fs.writeFileSync(
      path.join(dist, "sitemap.xml"),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    );

    /* robots.txt ships from public/ without knowing the host, so the
       Sitemap line is appended here where SITE_URL is known */
    const robots = path.join(dist, "robots.txt");
    if (fs.existsSync(robots)) {
      fs.appendFileSync(robots, `\nSitemap: ${SITE_URL}sitemap.xml\n`);
    }

    this.info(`prerendered ${written.length} routes + 404.html, sitemap has ${indexable.length} urls`);
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
