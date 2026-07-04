import { chromium } from 'playwright';
const out = '/tmp/claude-0/-home-claude-repo/e8e33be9-63d1-5464-9b3d-0ab8b4f77179/scratchpad';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

// even simulate an OS dark preference — page must stay light
const p = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
await p.goto('http://localhost:4173/');
await p.waitForTimeout(400);
const bg = await p.evaluate(() => ({
  dataTheme: document.documentElement.getAttribute('data-theme'),
  bodyBg: getComputedStyle(document.body).backgroundColor,
  hasThemeToggle: !!document.querySelector('.lp-theme-toggle'),
  footChildren: [...document.querySelector('.lp-foot').children].map(c => c.className),
}));
console.log('landing:', JSON.stringify(bg));
await p.screenshot({ path: `${out}/no-theme-landing.png` });

await p.goto('http://localhost:4173/#/about');
await p.waitForTimeout(300);
const foot = await p.evaluate(() => {
  const toggles = [...document.querySelectorAll('.site-footer-toggle')].map(t => t.textContent);
  return { bodyBg: getComputedStyle(document.body).backgroundColor, toggles };
});
console.log('about footer toggles (expect just language):', JSON.stringify(foot));
const box = await p.locator('.site-footer').boundingBox();
await p.screenshot({ path: `${out}/no-theme-about-foot.png`, clip: { x: 0, y: box.y - 10, width: 500, height: box.height + 20 } });

await browser.close();
console.log('done');
