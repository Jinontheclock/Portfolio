import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

export default defineConfig(({ command }) => {
  if (command === "build") {
    // eslint-disable-next-line no-console
    console.log(`[site] base ${BUILD_BASE}   canonical ${SITE_URL}`);
  }
  return {
    base: command === "build" ? BUILD_BASE : "/",
    plugins: [react(), injectSiteUrl(), rewritePrebuiltDemos()],
  };
});
