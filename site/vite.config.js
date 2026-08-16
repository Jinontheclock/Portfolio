import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/* Where this site lives is decided by one file: public/CNAME.

   With no CNAME the build targets the project page at
   jinontheclock.github.io/Portfolio/, so every asset URL needs the
   /Portfolio/ prefix. Put a domain in public/CNAME and GitHub serves the
   same artifact from the domain root instead, where that prefix 404s
   everything. Rather than leave that as a flag someone has to remember to
   flip, both the base and the absolute URLs are read from the CNAME here.

   Local dev always runs at / regardless. */
const here = path.dirname(fileURLToPath(import.meta.url));
const cname = path.join(here, "public", "CNAME");
const domain = fs.existsSync(cname) ? fs.readFileSync(cname, "utf8").trim().split("\n")[0].trim() : "";

const BUILD_BASE = domain ? "/" : "/Portfolio/";
const SITE_URL = domain ? `https://${domain}/` : "https://jinontheclock.github.io/Portfolio/";

/* The old absolute URLs, as they appear inside the two prebuilt demos. */
const OLD_BASE = "/Portfolio/";
const OLD_SITE = "https://jinontheclock.github.io/Portfolio/";

/* tinypaws (Astro) and prolog (Expo web) are committed as finished builds
   with /Portfolio/ baked into thousands of asset URLs, and their sources are
   not in this repo, so they cannot simply be rebuilt when the domain
   changes. Vite copies public/ into dist/ untouched, so the prefix is
   rewritten on the way out instead. compass already emits relative paths and
   needs none of this. */
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
        const out = src.split(OLD_SITE).join(SITE_URL).split(OLD_BASE).join(BUILD_BASE);
        hits += (src.match(/\/Portfolio\//g) || []).length;
        fs.writeFileSync(p, out);
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

export default defineConfig(({ command }) => ({
  base: command === "build" ? BUILD_BASE : "/",
  plugins: [react(), injectSiteUrl(), rewritePrebuiltDemos()],
}));
