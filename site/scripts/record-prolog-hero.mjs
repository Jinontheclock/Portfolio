/* Records the two phone-screen clips for the ProLog hero video.
 *
 *   node scripts/record-prolog-hero.mjs
 *
 * Serves nothing itself — point BASE at a server that exposes the embed
 * under the /Portfolio/ prefix (the bundle paths are absolute):
 *
 *   mkdir -p /tmp/prolog-serve && ln -sfn "$(pwd)/public" /tmp/prolog-serve/Portfolio
 *   python3 -m http.server 8199 --directory /tmp/prolog-serve
 *
 * Outputs:
 *   public/media/prolog/raw/prolog-screen-dashboard.webm   (iPhone, 402x874 @2x)
 *   public/media/prolog/raw/prolog-screen-quiz.webm        (Galaxy, 412x872 @2x)
 *   public/media/prolog/raw/trims.json                     (per-clip lead time to cut)
 *
 * The app draws its own status bar and home indicator; both stay in frame.
 * The clock is pinned to 9:41 like the case-study stills.
 */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync, renameSync } from 'fs';

const BASE = process.env.BASE || 'http://localhost:8199/Portfolio/prolog';
const OUT = 'public/media/prolog/raw';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
});
const trims = {};

/* Animate the app's scroll container by hand — CSS smooth scrolling is a
   fixed ~400ms lurch, this gives a finger-paced glide. */
async function glideScroll(page, to, ms) {
  await page.evaluate(
    ({ to, ms }) =>
      new Promise((done) => {
        const els = [...document.querySelectorAll('div')].filter(
          (el) =>
            el.scrollHeight > el.clientHeight + 60 &&
            /auto|scroll/.test(getComputedStyle(el).overflowY)
        );
        const sc = els.sort((a, b) => b.scrollHeight - a.scrollHeight)[0];
        if (!sc) return done();
        const from = sc.scrollTop;
        const t0 = performance.now();
        const ease = (t) => 1 - Math.pow(1 - t, 3);
        const step = (now) => {
          const t = Math.min(1, (now - t0) / ms);
          sc.scrollTop = from + (to - from) * ease(t);
          t < 1 ? requestAnimationFrame(step) : done();
        };
        requestAnimationFrame(step);
      }),
    { to, ms }
  );
}

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
  await page.clock.setFixedTime(new Date(new Date().toDateString() + ' 09:41:00'));
  const recStart = Date.now();
  const marks = await flow(page);
  /* keep a beat of lead so the cut lands just before first paint settles */
  const rel = (t) => Math.max(0, (t - recStart) / 1000);
  trims[name] = { lead: Math.max(0, rel(marks.contentAt) - 0.2) };
  if (marks.cut) trims[name].cut = marks.cut.map(rel);
  const video = page.video();
  await context.close();
  await video.saveAs(`${OUT}/${name}.webm`);
  console.log(`${name}:`, JSON.stringify(trims[name]));
}

/* ── iPhone · Dashboard: count-up, unlock, then a glide down the page.
   The demo's "Updating Progress" dialog sits between the tap and the
   animation — its span is marked here and spliced out in the build, so
   the cut reads as tap → the orange line moving. ── */
await record('prolog-screen-dashboard', { width: 402, height: 874 }, async (page) => {
  await page.goto(`${BASE}/Dashboard`, { waitUntil: 'networkidle' });
  await page.getByText('Overall Progress').first().waitFor();
  const contentAt = Date.now();
  await page.waitForTimeout(1600);          // boot beat on the journey
  const tapAt = Date.now();                 // marked before the press — the
  await page.mouse.click(352, 130);         // dialog is up within the click
  const dialog = page.getByText('Updating Progress').first();
  await dialog.waitFor();
  await dialog.waitFor({ state: 'hidden', timeout: 8000 });
  const dialogGoneAt = Date.now();
  await page.waitForTimeout(2800);          // journey unlock + counters
  await glideScroll(page, 560, 1900);       // down to Overall Progress
  await page.waitForTimeout(2600);
  await glideScroll(page, 0, 1500);         // settle back on the journey
  await page.waitForTimeout(2300);
  return { contentAt, cut: [tapAt + 30, dialogGoneAt + 250] };
});

/* ── Galaxy · Skills: into the level exam, three questions at a human pace ── */
await record('prolog-screen-quiz', { width: 412, height: 872 }, async (page) => {
  await page.goto(`${BASE}/My_Skills`, { waitUntil: 'networkidle' });
  await page.getByText('Exam Prep').first().waitFor();
  const contentAt = Date.now();
  await page.waitForTimeout(1500);          // a beat on the Skills tab
  await page.getByText('New Exam').first().click();
  /* "Generating Quiz…" plays its 2.6s, then the exam mounts */
  await page.getByText('Check Answer').first().waitFor({ timeout: 15000 });
  await page.waitForTimeout(400);

  /* the answer rows are plain touchables — pick them by geometry: the
     full-width pointer rows between the question and the button bar */
  const answer = async (nth, last = false) => {
    await page.waitForTimeout(900);         // read the question
    const boxes = await page.evaluate(() => {
      const els = [...document.querySelectorAll('div')].filter((el) => {
        const s = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return s.cursor === 'pointer' && r.height > 40 && r.height < 110 && r.width > 350;
      });
      return els
        .map((el) => {
          const r = el.getBoundingClientRect();
          return { x: r.x + r.width / 2, y: r.y + r.height / 2, t: (el.textContent || '').slice(0, 30) };
        })
        .filter((b) => b.y > 250 && b.y < 740 && !b.t.includes('Check Answer'))
        .sort((a, b) => a.y - b.y)
        .filter((b, i, arr) => i === 0 || b.y - arr[i - 1].y > 20);
    });
    const pick = boxes[Math.min(nth, boxes.length - 1)] || boxes[0];
    await page.mouse.click(pick.x, pick.y);
    await page.waitForTimeout(700);
    await page.getByText('Check Answer').first().click();
    await page.waitForTimeout(1200);        // result state reads
    if (!last) {
      await page.getByText('Next Question').first().click();
      await page.waitForTimeout(300);
    }
  };

  await answer(1);
  await answer(2);
  await answer(0, true);
  await page.waitForTimeout(1800);          // hold on the answered state
  return { contentAt };
});

writeFileSync(`${OUT}/trims.json`, JSON.stringify(trims, null, 2));
await browser.close();
console.log('done');
