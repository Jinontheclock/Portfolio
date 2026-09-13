/* The smoke test: every page, at every tier, has to come up clean.
 *
 *     npm run test:smoke
 *
 * It builds nothing — run it against a build:
 *
 *     npm run build:deploy && npm run test:smoke
 *
 * What it asserts, per route and width: no uncaught error and no console
 * error, no request that failed or answered 4xx/5xx, no image that came
 * back broken, and no horizontal scroll. That last one is the reason this
 * file exists — the landing page scrolled sideways at every tablet width
 * for as long as the footer had been written, and nothing said so.
 *
 * It also turns the Work stage through all five projects and opens the
 * locked one's gate, because the two bugs found by hand this week were
 * both there: an overlay's stop un-scrolling the stage, and a veil drawn
 * inside a scrolling box riding up the screen with it.
 *
 * Exits non-zero on the first failure it can report, and prints every
 * failure it found.
 */
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const PORT = Number(process.env.PORT || 4430);
const BASE = `http://127.0.0.1:${PORT}`;

const ROUTES = ["/", "/work/", "/about/", "/work/compass-card/", "/work/welab/", "/work/prolog/", "/work/tinypaws/"];
/* a monitor, the 14", an iPad upright, a phone, and the narrow end of the
   phone tier that breakpoints.css names as its floor */
const SIZES = [[1920, 1080], [1512, 982], [834, 1194], [390, 844], [320, 720]];

const failures = [];
const fail = (where, what) => failures.push(`${where}: ${what}`);

async function serve() {
  const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort", "--base=/"], {
    stdio: "ignore",
    detached: false,
  });
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(BASE + "/");
      if (r.ok) return server;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  server.kill();
  throw new Error(`no preview server on ${BASE} after 20s — is there a dist/ to serve?`);
}

const watch = (page, where) => {
  page.on("pageerror", (e) => fail(where, "uncaught " + e.message.split("\n")[0].slice(0, 120)));
  page.on("console", (m) => {
    if (m.type() === "error") fail(where, "console " + m.text().slice(0, 120));
  });
  page.on("requestfailed", (r) => {
    /* a video the page stopped fetching when it was taken off screen is
       not a failure; the browser reports the abort either way */
    if (r.resourceType() === "media") return;
    fail(where, `request failed ${r.url().split("/").pop()} (${r.failure()?.errorText || "?"})`);
  });
  page.on("response", (r) => {
    if (r.status() >= 400) fail(where, `HTTP ${r.status()} ${r.url().split("/").pop()}`);
  });
};

const settle = async (page) => {
  await page.waitForSelector(".lp-loader", { state: "detached", timeout: 30000 });
  await page.waitForTimeout(1200);
};

const server = await serve();
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
try {
  for (const [w, h] of SIZES) {
    for (const route of ROUTES) {
      const where = `${w}x${h} ${route}`;
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: w <= 390, hasTouch: w <= 390 });
      const page = await ctx.newPage();
      watch(page, where);
      try {
        await page.goto(BASE + route, { waitUntil: "load", timeout: 30000 });
        await settle(page);
        const probe = await page.evaluate(() => ({
          over: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          broken: [...document.images]
            .filter((i) => i.complete && i.naturalWidth === 0)
            .map((i) => (i.currentSrc || i.src).split("/").pop())
            .slice(0, 3),
          title: document.title,
        }));
        if (probe.over > 1) fail(where, `scrolls sideways by ${probe.over}px`);
        if (probe.broken.length) fail(where, "broken image " + probe.broken.join(", "));
        if (!probe.title) fail(where, "no document title");

        /* the Work stage: every project takes it, and the locked one's
           gate goes up without the stage losing its place */
        if (route === "/work/" && w > 390) {
          const marks = await page.locator(".wk-index-item").count();
          if (marks !== 5) fail(where, `index has ${marks} entries, expected 5`);
          for (let i = 0; i < marks; i++) {
            await page.locator(".wk-index-item").nth(i).click();
            await page.waitForTimeout(700);
            const on = await page.evaluate(
              () => [...document.querySelectorAll(".wk-section")].findIndex((el) => getComputedStyle(el).visibility === "visible"),
            );
            if (on !== i) fail(where, `turned to ${i}, stage shows ${on}`);
          }
          /* MUJI is the locked one and is last. The stage is still
             easing to it when the last click returns, so the box is let
             come to rest before it is read — otherwise the reading is
             the glide, not the place. */
          const rest = async () => {
            let last = -1;
            for (let t = 0; t < 40; t++) {
              const now = await page.evaluate(() => Math.round(document.querySelector(".stage-scroll").scrollTop));
              if (now === last) return now;
              last = now;
              await page.waitForTimeout(100);
            }
            return last;
          };
          const before = await rest();
          await page.locator("#wk-muji").click();
          await page.waitForTimeout(800);
          const gate = await page.locator(".cs-gate-overlay").count();
          if (!gate) fail(where, "the locked project's gate did not open");
          const after = await rest();
          if (Math.abs(after - before) > 2) fail(where, `the gate moved the stage (${before} → ${after})`);
        }
      } catch (e) {
        fail(where, "threw " + e.message.split("\n")[0].slice(0, 120));
      }
      await ctx.close();
    }
  }
} finally {
  await browser.close();
  server.kill();
}

if (failures.length) {
  console.error(`\n✗ ${failures.length} failure${failures.length > 1 ? "s" : ""}:\n`);
  failures.forEach((f) => console.error("  " + f));
  process.exit(1);
}
console.log(`✓ ${ROUTES.length * SIZES.length} page loads clean across ${SIZES.length} widths`);
