/* Records the two device-screen clips for the Compass Card hero video.
 *
 *   node scripts/record-compass-hero.mjs
 *
 * Point BASE at a server exposing public/ under the /Portfolio/ prefix
 * (same serving setup as record-prolog-hero.mjs).
 *
 * Outputs:
 *   public/media/compass-card/raw/compass-screen-wallet.webm  (iPhone, 402x874)
 *   public/media/compass-card/raw/compass-screen-watch.webm   (watch, 443x648)
 *   public/media/compass-card/raw/trims.json
 *
 * The iPhone clip walks the demo's Apple Wallet link-up: the card detail,
 * Add to Apple Wallet, the pass among the other cards, and the opened pass
 * with its balance. The login steps run before the content mark, so the
 * trim cuts them. The watch clip drives the interactive watch demo
 * (public/compass/watch/): Wallet -> Reload -> +$20 Added, then home and
 * through a reader tap. The clock is pinned to 9:41 with time RUNNING —
 * a fixed Date freezes JS-driven animations (see the ProLog recorder).
 */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'fs';

const BASE = process.env.BASE || 'http://localhost:8199/Portfolio';
const OUT = 'public/media/compass-card/raw';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
});
const trims = {};

async function record(name, viewport, flow) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 2,
    recordVideo: {
      dir: OUT,
      size: { width: viewport.width * 2, height: viewport.height * 2 },
    },
  });
  const page = await context.newPage();
  await page.clock.setSystemTime(new Date(new Date().toDateString() + ' 09:41:00'));
  const recStart = Date.now();
  const marks = await flow(page);
  const rel = (t) => Math.max(0, (t - recStart) / 1000);
  trims[name] = { lead: Math.max(0, rel(marks.contentAt) - 0.2) };
  const video = page.video();
  await context.close();
  await video.saveAs(`${OUT}/${name}.webm`);
  console.log(`${name}:`, JSON.stringify(trims[name]));
}

/* ── iPhone · the Apple Wallet link-up ── */
await record('compass-screen-wallet', { width: 402, height: 874 }, async (page) => {
  await page.goto(`${BASE}/compass/`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2200);
  await page.getByText('Login', { exact: true }).first().click();
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: 'Login' }).last().click();
  await page.waitForTimeout(1400);
  await page.getByText('My Compass Card').first().click();
  await page.getByText('Add to Apple Wallet').first().waitFor();
  await page.waitForTimeout(600);              // detail settles
  const contentAt = Date.now();                // the clip opens here
  await page.waitForTimeout(2400);             // read the card and history
  await page.getByText('Add to Apple Wallet').first().click();
  await page.waitForTimeout(2600);             // the pass among the cards
  await page.mouse.click(201, 390);            // open the Compass pass
  await page.waitForTimeout(4800);             // balance + Add Money hold
  return { contentAt };
});

/* ── Watch · reload on the wrist, then a reader tap ── */
await record('compass-screen-watch', { width: 443, height: 648 }, async (page) => {
  await page.goto(`${BASE}/compass/watch/`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(900);
  const contentAt = Date.now();
  await page.waitForTimeout(2000);             // Wallet: the card, $15.00
  await page.mouse.click(221, 210);            // the card -> Reload
  await page.waitForTimeout(1600);
  await page.mouse.click(221, 383);            // +$20
  await page.waitForTimeout(2000);             // Added, Balance $35.00
  await page.mouse.click(221, 320);            // back home
  await page.waitForTimeout(1000);
  await page.mouse.click(221, 440);            // Express Mode -> reader
  await page.waitForTimeout(1700);             // reads on its own
  await page.waitForTimeout(3200);             // Deducted / Remaining hold
  return { contentAt };
});

writeFileSync(`${OUT}/trims.json`, JSON.stringify(trims, null, 2));
await browser.close();
console.log('done');
