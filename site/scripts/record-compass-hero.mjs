/* Records the two device-screen clips for the Compass Card hero video.
 *
 *   node scripts/record-compass-hero.mjs
 *
 * Point BASE at a server exposing public/ under the /Portfolio/ prefix
 * (same serving setup as record-prolog-hero.mjs).
 *
 * Outputs:
 *   public/media/compass-card/raw/compass-screen-wallet.mp4  (iPhone, 402x874)
 *   public/media/compass-card/raw/compass-screen-watch.mp4   (watch, 444x648)
 *   public/media/compass-card/raw/trims.json
 *
 * Capture is deterministic, not realtime: after the page settles, CDP
 * virtual time steps the renderer exactly 1/30s per frame and each frame
 * is screenshotted. Every CSS transition and timer
 * lands on the virtual clock, so motion samples perfectly at 30fps no
 * matter how slow the headless renderer is — realtime recordVideo capped
 * out at an uneven 25fps and judddered through the screen transitions.
 * initialVirtualTime pins the demos' clocks to 9:41.
 *
 * The iPhone clip walks the demo's Apple Wallet link-up: the card detail,
 * Add to Apple Wallet, the pass among the other cards, and the opened
 * pass with its balance (the login steps run before capture starts). The
 * watch clip drives the playable watch demo (public/compass/watch/):
 * Wallet -> Reload -> +$20 Added, then home and through a reader tap.
 */
import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
import { mkdirSync, rmSync, writeFileSync } from 'fs';

const BASE = process.env.BASE || 'http://localhost:8199/Portfolio';
const OUT = 'public/media/compass-card/raw';
const FPS = 30;
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
});
const trims = {};

/* nine-forty-one today, in epoch seconds, for the virtual clock's base */
const NINE_41 = new Date(new Date().toDateString() + ' 09:41:00').getTime() / 1000;

async function record(name, viewport, prepare, frames, actions) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await prepare(page);

  const client = await context.newCDPSession(page);
  /* freeze the renderer clock (Date jumps to 9:41), then advance it by
     hand — one budget grant per output frame. The starvation count keeps
     a page with a live rAF loop from stalling virtual time forever, and
     the timeout+regrant covers the occasional budget event that never
     arrives; a rare regrant costs one extra 33ms of virtual time. */
  await client.send('Emulation.setVirtualTimePolicy', {
    policy: 'pause',
    initialVirtualTime: NINE_41,
  });
  const step = async () => {
    for (let attempt = 0; attempt < 3; attempt++) {
      const expired = new Promise((r) =>
        client.once('Emulation.virtualTimeBudgetExpired', () => r(true)));
      await client.send('Emulation.setVirtualTimePolicy', {
        policy: 'pauseIfNetworkFetchesPending',
        budget: 1000 / FPS,
        maxVirtualTimeTaskStarvationCount: 5000,
      });
      const ok = await Promise.race([
        expired,
        new Promise((r) => setTimeout(() => r(false), 4000)),
      ]);
      if (ok) return;
    }
    throw new Error('virtual time stalled');
  };

  const dir = `${OUT}/frames-${name}`;
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir);
  for (let i = 0; i < frames; i++) {
    const act = actions[i];
    if (act) await page.mouse.click(act[0], act[1]);
    await step();
    if (i % 60 === 0) console.log(`  ${name} ${i}/${frames}`);
    /* jpeg: the png encoder is what made this loop minutes-slow, and the
       x264 crf-12 intermediate swallows q92 artefacts anyway. Bare capture
       returns CSS resolution — a clip with scale would give 2x, but that
       combination deadlocks under paused virtual time. */
    const shot = await client.send('Page.captureScreenshot', {
      format: 'jpeg',
      quality: 92,
      fromSurface: true,
    });
    writeFileSync(`${dir}/${String(i).padStart(4, '0')}.jpg`, Buffer.from(shot.data, 'base64'));
  }
  await context.close();

  /* near-lossless intermediate; the hero build re-encodes it */
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS),
    '-i', `${dir}/%04d.jpg`, '-an', '-c:v', 'libx264', '-crf', '12',
    '-preset', 'fast', '-pix_fmt', 'yuv420p', `${OUT}/${name}.mp4`]);
  rmSync(dir, { recursive: true, force: true });
  trims[name] = { lead: 0 };
  console.log(`${name}: ${frames} frames`);
}

const sec = (s) => Math.round(s * FPS);

/* ── iPhone · the Apple Wallet link-up ── */
await record(
  'compass-screen-wallet',
  { width: 402, height: 874 },
  async (page) => {
    await page.goto(`${BASE}/compass/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    await page.getByText('Login', { exact: true }).first().click();
    await page.waitForTimeout(700);
    await page.getByRole('button', { name: 'Login' }).last().click();
    await page.waitForTimeout(1300);
    await page.getByText('My Compass Card').first().click();
    await page.getByText('Add to Apple Wallet').first().waitFor();
    await page.waitForTimeout(700); // detail settles; capture opens here
  },
  sec(10.5),
  {
    [sec(2.4)]: [297, 707],  // Add to Apple Wallet
    [sec(5.4)]: [201, 390],  // open the Compass pass; hold on the balance
  },
);

/* ── Watch · reload on the wrist, then a reader tap ── */
await record(
  'compass-screen-watch',
  { width: 444, height: 648 },
  async (page) => {
    await page.goto(`${BASE}/compass/watch/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
  },
  sec(10.5),
  {
    [sec(2.0)]: [221, 210],  // the card -> Reload
    [sec(3.7)]: [221, 383],  // +$20
    [sec(5.8)]: [221, 320],  // Added -> back home
    [sec(6.9)]: [221, 440],  // Express Mode -> reader (reads on its own)
  },
);

writeFileSync(`${OUT}/trims.json`, JSON.stringify(trims, null, 2));
await browser.close();
console.log('done');
