import { chromium } from "playwright";
const shots = "/tmp/claude-0/-home-claude/e8e33be9-63d1-5464-9b3d-0ab8b4f77179/scratchpad";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await b.newPage({ viewport:{width:390,height:844} });
const errs=[]; p.on("pageerror",e=>errs.push(String(e).slice(0,100)));

await p.goto("http://localhost:4173/Portfolio/prolog/",{waitUntil:"networkidle"});
await p.waitForTimeout(1500);
await p.locator("text=Start Demo").first().click(); await p.waitForTimeout(1800);
const g1=await p.evaluate(()=>document.body.textContent.match(/Hello [A-Za-z ]+?You/)?.[0]);
console.log("1) greeting:", g1);

async function tapTab(name){
  const els=await p.evaluate((n)=>{const out=[];for(const el of document.querySelectorAll("div,span")){const r=el.getBoundingClientRect();if(el.textContent.trim()===n&&r.top>700&&r.width>0)out.push({x:r.x+r.width/2,y:r.y+r.height/2});}return out;},name);
  if(els.length){ await p.mouse.click(els[0].x, els[0].y); await p.waitForTimeout(1400); return true; } return false;
}
// 2) Settings: chevrons only on Support rows; edit name flow
await tapTab("Settings");
const chevInfo = await p.evaluate(()=>{
  const rows=[...document.querySelectorAll("div")].filter(d=>["Appearance","Language","Text size"].includes(d.textContent) && d.children.length===0);
  return rows.length;
});
await p.screenshot({path:`${shots}/f-settings.png`});
// tap profile card (Edit name)
const card=await p.evaluate(()=>{const el=[...document.querySelectorAll("div")].find(d=>d.getAttribute("aria-label")==="Edit name");if(!el)return null;const r=el.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};});
console.log("2) edit-name card found:", !!card);
if(card){ await p.mouse.click(card.x,card.y); await p.waitForTimeout(800); }
await p.screenshot({path:`${shots}/f-editname.png`});
const inp=p.locator("input").first();
await inp.fill("Hajin"); await p.waitForTimeout(200);
await p.locator("text=Save").first().click(); await p.waitForTimeout(800);
const profName=await p.evaluate(()=>document.body.textContent.includes("Hajin"));
console.log("3) settings name updated:", profName);
// 4) dashboard greeting live-updates
await tapTab("Dashboard");
const g2=await p.evaluate(()=>document.body.textContent.match(/Hello [A-Za-z ]+?You/)?.[0]);
console.log("4) greeting after edit:", g2);
// 5) Work dates
await tapTab("Work");
const wk=await p.evaluate(()=>{const t=document.body.textContent;return {y2026:t.includes("2026"), y2027:t.includes("2027"), old2024:t.includes("2024"), old2025:t.includes("2025")};});
console.log("5) work dates:", JSON.stringify(wk));
await p.screenshot({path:`${shots}/f-work.png`});
console.log("pageerrors:", errs.length?errs:"none");
await b.close();
