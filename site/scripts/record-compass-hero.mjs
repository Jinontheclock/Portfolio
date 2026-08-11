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
 * virtual time steps the renderer exactly 1/60s per frame and each frame
 * is screenshotted. Every CSS transition and timer
 * lands on the virtual clock, so motion samples perfectly at 60fps no
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
const FPS = 60;
mkdirSync(OUT, { recursive: true });

/* Virtual time only drives the renderer's main thread. The demos' screen
   pushes are transform transitions, which normally animate on the
   compositor thread with the real clock — under stepped capture they sat
   at their first frame for the whole grant and snapped to the end (the
   "judder"). These flags force every animation onto the main thread and
   make the compositor draw whatever the step produced, so the pushes
   sample perfectly along the virtual clock. */
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: [
    '--disable-threaded-animation',
    '--disable-threaded-scrolling',
    '--run-all-compositor-stages-before-draw',
    '--disable-checker-imaging',
    '--disable-image-animation-resync',
    '--disable-new-content-rendering-timeout',
  ],
});
const trims = {};

/* The virtual clock opens just before 9:41; the pre-roll below advances
   it past the minute boundary so the demos' already-mounted clocks tick
   over to 9:41 before the first frame is taken. */
const NINE_41 = new Date(new Date().toDateString() + ' 09:41:00').getTime() / 1000;
const CLOCK_BASE = NINE_41 - 30;
const PREROLL_MS = 65_000;

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
    initialVirtualTime: CLOCK_BASE,
  });
  const step = async (budget = 1000 / FPS) => {
    for (let attempt = 0; attempt < 3; attempt++) {
      const expired = new Promise((r) =>
        client.once('Emulation.virtualTimeBudgetExpired', () => r(true)));
      await client.send('Emulation.setVirtualTimePolicy', {
        policy: 'pauseIfNetworkFetchesPending',
        budget,
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

  await step(PREROLL_MS); // roll the clocks over the 9:41 boundary

  const dir = `${OUT}/frames-${name}`;
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir);
  for (let i = 0; i < frames; i++) {
    const act = actions[i];
    if (act) await page.mouse.click(act[0], act[1]);
    await step();
    /* keyframe animations advance on the virtual clock but nothing forces
       the main thread to restyle between grants, so a pure capture loop
       screenshots the last committed frame — every screen push froze at
       its first pose and snapped at the end. A forced synchronous style
       recalc each step makes the current animation pose get committed;
       with it, the pushes sample perfectly (A/B verified). */
    await page.evaluate(() => getComputedStyle(document.body).transform);
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
    await page.getByText('My Compass Card').first().waitFor();
    await page.waitForTimeout(700); // the card list settles; capture opens here
  },
  sec(10.5),
  {
    [sec(1.8)]: [201, 233],  // the card tile -> its detail
    [sec(4.2)]: [297, 707],  // Add to Apple Wallet
    [sec(7.0)]: [201, 390],  // open the Compass pass; hold on the balance
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
