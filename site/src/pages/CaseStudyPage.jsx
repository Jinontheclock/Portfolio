import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import TryAppModal, {
  FRAME_H,
  FRAME_W,
  TryAppPhone,
  TryAppWeb,
} from "../components/TryAppModal.jsx";
import CaseGateModal, { isUnlocked } from "../components/CaseGateModal.jsx";
import ImageLightbox from "../components/ImageLightbox.jsx";
import useScrollFade from "../lib/scroll-fade.js";
import { settleAt, useColumnStage, useScreenScroll, viewTopOf } from "../lib/screen-column.js";
import useIsPhone from "../hooks/useIsPhone.js";
import useStage, { SWAP } from "../lib/stage.js";
import gsap from "gsap";
import { reducedMotion } from "../lib/media.js";
import ProLogJourney from "../components/ProLogJourney.jsx";
import TinyPawsMonitor from "../components/TinyPawsMonitor.jsx";
import WeLabHero from "../components/WeLabHero.jsx";
import prologMockupUrl from "../assets/prolog/prolog-mockup.webp";
import {
  AudienceFigure,
  CertStatsFigure,
  DiscrepancyFigure,
  ParticipantsFigure,
  PersonaIzzyFigure,
  PersonaJordanFigure,
  FragmentsFigure,
  TimelineFigure,
  LogoLockupFigure,
  PaletteFigure,
  TypeFigure,
  BAProgressFigure,
  BANavigationFigure,
  BAVisualCuesFigure,
  CampaignVideoFigure,
  CampaignBillboardsFigure,
  CampaignInstagramFigure,
  MidfiGridFigure,
  ShowcaseStageFigure,
  ShowcaseCrowdFigure,
  ShowcaseBoothFigure,
} from "../components/ProLogContextFigures.jsx";
import { PROLOG_SHOTS } from "../components/ProLogContextFigures.jsx";
import {
  TPPersonaEmilyFigure,
  TPPersonaAlexFigure,
  TPVideoFigure,
  TPStyleTileFigure,
  TPTokensFigure,
  TPContentModelFigure,
  TPSitemapFigure,
  TPLofiGridFigure,
  TPBANavFigure,
  TPBAStructureFigure,
  TPBACtaFigure,
  TINYPAWS_SHOTS,
} from "../components/TinyPawsFigures.jsx";
import { WLVfxSliderFigure } from "../components/WeLabSlider.jsx";
import {
  WLAuditResponsiveFigure,
  WLAuditSectionsFigure,
  WLLayoutSystemFigure,
  WLLayoutSystemRestFigure,
  WLLangToggleFigure,
  WLLandingBAFigure,
  WLFigmaFeaturedFigure,
  WLWorkflowFigure,
  WLOldShowcaseFigure,
  WLOldLandingFigure,
  WLOldStudiosFigure,
} from "../components/WeLabFigures.jsx";
import { COMPASS_FIGURES, COMPASS_SHOTS } from "../components/CompassPlaceholders.jsx";
import CompassHero from "../components/CompassHero.jsx";
import { COMPASS_ARTWORK } from "../components/CompassFigures.jsx";
import { COMPASS_CAPTURES } from "../components/CompassCaptures.jsx";

/* What fades as the reader passes it, and what it fades with.

   The opening is one thing: the hero scene, the headline, the sentences
   under it and the meta table are a single arrival, not four. Selecting
   them by position rather than by name is what makes that true of every
   project — each hero component brings its own root class (.cs-hero,
   .cs-monitor, the Compass stage), and a project with no hero scene puts a
   video there instead. Everything the column holds before the chapters
   start is the opening, whatever it turns out to be.

   Then a chapter at a time: 01, 02, 03, heading and all. */
const SCROLL_FADE = [[".cs-content > *:not(.cs-sections)"], ".cs-section"];
/* on a screen the column is a stage (see below), and the fade has no say */
const NO_FADE = [];

/* The line a chapter is read at. The scroll spy calls a chapter current once
   its heading has passed this, and the chapter list scrolls a chapter to
   exactly here — one number, so the chapter you land on is the chapter that
   lights up. */
const READING_LINE = 140;
/* A chapter scrolled to the reading line lands ON it, and a fraction of a
   pixel either side of the comparison decides whether it counts as reached.
   Landing at 140.3 and asking for "at or above 140" marks the chapter before
   it instead — measured across three case studies, seven of Compass's eight
   chapters highlighted one short. A pixel of slack is smaller than anything
   a reader can see and settles it. */
const READING_SLACK = 1;

/* A project flagged `screen` is set as one screen — the header at the top,
   the copyright at the foot, and the column scrolling between them in a
   box of its own, with the chapter list standing still beside it and
   opening the subheadings of the chapter being read. The scroll, the
   column as a stage and a jump that stays jumped are lib/screen-column.js,
   shared with About; the list and its spy are this page's own. A phone
   keeps the page a page. */

/* hero scenes: live in-page animations a project can use instead of a
   video or the placeholder (see each project's heroScene field) */
const HERO_SCENES = {
  journey: ProLogJourney,
  monitor: TinyPawsMonitor,
  welab: WeLabHero,
  compass: CompassHero,
};

/* in-page figures a "figure" block can reference by name */
const FIGURES = {
  "prolog-timeline": TimelineFigure,
  "prolog-fragments": FragmentsFigure,
  "prolog-audience": AudienceFigure,
  "prolog-certstats": CertStatsFigure,
  "prolog-discrepancy": DiscrepancyFigure,
  "prolog-participants": ParticipantsFigure,
  "prolog-persona-izzy": PersonaIzzyFigure,
  "prolog-persona-jordan": PersonaJordanFigure,
  "prolog-logo": LogoLockupFigure,
  "prolog-palette": PaletteFigure,
  "prolog-type": TypeFigure,
  "prolog-ba-progress": BAProgressFigure,
  "prolog-ba-navigation": BANavigationFigure,
  "prolog-ba-visual-cues": BAVisualCuesFigure,
  "prolog-campaign-video": CampaignVideoFigure,
  "prolog-campaign-billboards": CampaignBillboardsFigure,
  "prolog-campaign-instagram": CampaignInstagramFigure,
  "prolog-fig-midfi-grid": MidfiGridFigure,
  "prolog-showcase-stage": ShowcaseStageFigure,
  "prolog-showcase-crowd": ShowcaseCrowdFigure,
  "prolog-showcase-booth": ShowcaseBoothFigure,
  "tinypaws-persona-emily": TPPersonaEmilyFigure,
  "tinypaws-persona-alex": TPPersonaAlexFigure,
  "tinypaws-fig-styletile": TPStyleTileFigure,
  "tinypaws-fig-tokens": TPTokensFigure,
  "tinypaws-fig-content-model": TPContentModelFigure,
  "tinypaws-campaign-video": TPVideoFigure,
  "welab-fig-audit-responsive": WLAuditResponsiveFigure,
  "welab-fig-audit-sections": WLAuditSectionsFigure,
  "welab-fig-old-showcase": WLOldShowcaseFigure,
  "welab-fig-old-landing": WLOldLandingFigure,
  "welab-fig-old-studios": WLOldStudiosFigure,
  "welab-ba-vfx": WLVfxSliderFigure,
  "welab-fig-layout-system": WLLayoutSystemFigure,
  "welab-fig-layout-system-rest": WLLayoutSystemRestFigure,
  "welab-fig-lang-toggle": WLLangToggleFigure,
  "welab-ba-landing": WLLandingBAFigure,
  "welab-fig-figma-featured": WLFigmaFeaturedFigure,
  "welab-fig-workflow": WLWorkflowFigure,
  "tinypaws-fig-sitemap": TPSitemapFigure,
  "tinypaws-fig-lofi-grid": TPLofiGridFigure,
  "tinypaws-ba-nav": TPBANavFigure,
  "tinypaws-ba-structure": TPBAStructureFigure,
  "tinypaws-ba-cta": TPBACtaFigure,
  ...COMPASS_FIGURES,
  /* finished artwork wins over the placeholder of the same name */
  ...COMPASS_ARTWORK,
};

/* solution-row app/site screens, keyed per project (keys are unique
   across projects, so one lookup serves them all) */
/* the real captures win over the placeholder of the same name, the way
   the finished figures do above */
const SHOTS = { ...PROLOG_SHOTS, ...TINYPAWS_SHOTS, ...COMPASS_SHOTS, ...COMPASS_CAPTURES };
import { getProject } from "../data/projects/index.js";
import { resolve } from "../data/projects/resolve.js";
import { noOrphan, noOrphanSegments, useOrphanControl } from "../lib/no-orphan.js";

/* ── Highlights ──
   `==so==` in the copy marks the words the reader's eye should land on:
   they come out as mark.cs-hl, a stroke of the project's colour under
   the words (see .cs-hl in casestudy.css). The orphan glue runs on the
   whole string first, so the marks never change where a line turns.
   Only English carries marks for now; the other two read as they are. */
function marked(text) {
  if (typeof text !== "string" || !text.includes("==")) return text;
  return text.split(/==(.+?)==/).map((part, i) =>
    i % 2 ? (
      <mark key={i} className="cs-hl">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

/* On the stage the strokes are drawn as a row arrives: left to right, one
   mark after the next in reading order, once the row's fade has landed —
   or, at the page's first load, once the boot loader has lifted. The
   strokes of every other row are taken up again behind the fade, so a
   row that comes back is drawn afresh. With motion reduced the strokes
   simply stand. --cs-hl is the drawn share, 0 to 1 (see casestudy.css). */
const HL = { duration: 0.7, stagger: 0.22, settle: 0.3, ease: "power2.inOut" };
function drawHighlights(row, instant) {
  const marks = row.querySelectorAll("mark.cs-hl");
  const others = [...row.parentElement.querySelectorAll("mark.cs-hl")].filter(
    (m) => !row.contains(m),
  );
  gsap.killTweensOf([...marks, ...others]);
  if (others.length) gsap.set(others, { "--cs-hl": 0, delay: instant ? 0 : SWAP.duration });
  if (!marks.length) return;
  if (reducedMotion()) {
    gsap.set(marks, { "--cs-hl": 1 });
    return;
  }
  const draw = () =>
    gsap.fromTo(
      marks,
      { "--cs-hl": 0 },
      {
        "--cs-hl": 1,
        duration: HL.duration,
        ease: HL.ease,
        stagger: HL.stagger,
        delay: (instant ? 0 : SWAP.duration) + HL.settle,
        overwrite: true,
      },
    );
  gsap.set(marks, { "--cs-hl": 0 });
  if (!document.querySelector(".lp-loader")) {
    draw();
    return;
  }
  const mo = new MutationObserver(() => {
    if (document.querySelector(".lp-loader")) return;
    mo.disconnect();
    draw();
  });
  mo.observe(document.body, { childList: true, subtree: true });
}
import useLangPath from "../hooks/useLangPath.js";
import withPageTransition, { crossing, leaving } from "../lib/page-transition.js";

// ProLog is exported to the Portfolio under /prolog/ (see site/public/prolog)
const PROLOG_SRC = `${import.meta.env.BASE_URL}prolog/`;

function MetaGroup({ rows }) {
  /* a row whose every value is still a «TBD:…» token stays off the page —
     it returns on its own the moment the data gains its real value */
  const ready = rows.filter(
    (r) => !r.values.every((v) => typeof v === "string" && v.includes("«TBD")),
  );
  return (
    <div className="cs-meta-group">
      {ready.map((r) => (
        <div key={r.label} className="cs-meta-row">
          <span className="cs-meta-label">{r.label}</span>
          <span className="cs-meta-values">
            {r.values.map((v) =>
              typeof v === "object" ? (
                // a link whose URL is still a «TBD:…» token renders inert
                v.href.includes("«TBD") ? (
                  <span key={v.label}>{v.label}</span>
                ) : (
                  <a key={v.label} href={v.href} target="_blank" rel="noreferrer">
                    {v.label}
                  </a>
                )
              ) : (
                <span key={v}>{v}</span>
              ),
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

/* a solution's heading with its problem tag, and its screens: the two
   halves of the row, so the split column can seat them apart */
function SolutionTitle({ block }) {
  return (
    <h3 className="cs-block-h">
      {block.title}
      {block.tag && <span className="cs-block-tag">{block.tag}</span>}
    </h3>
  );
}
function SolutionMedia({ block }) {
  return (
    <figure className="cs-solution-media">
      {/* wide: landscape desktop screenshots stack vertically instead
          of sharing one row like the portrait phone shots */}
      <div className={"cs-shots" + (block.wide ? " cs-shots--wide" : "")}>
        {/* an unregistered key renders nothing rather than throwing
            mid-render and blanking the whole page (same defence as
            the figure branch of Block) */}
        {block.media
          .filter((m) => SHOTS[m])
          .map((m) => (
            <img key={m} src={SHOTS[m].src} alt={SHOTS[m].alt} loading="lazy" />
          ))}
      </div>
      {block.caption && <figcaption className="cs-figure-caption">{block.caption}</figcaption>}
    </figure>
  );
}
/* a before/after pair's figure, with its title and caption */
function BAMedia({ block }) {
  const Figure = FIGURES[block.graphic];
  if (!Figure) return null;
  return (
    <figure className="cs-ba-set-media">
      {block.title && <span className="cs-figure-title">{noOrphan(block.title)}</span>}
      <Figure />
      {block.caption && (
        <figcaption className="cs-figure-caption">{noOrphan(block.caption)}</figcaption>
      )}
    </figure>
  );
}

/* what a demo says of itself when its block does not */
const DEMO_NOTE = "Runs the real app right here — no install needed.";

function Block({ block, onDemo, demoHref, id }) {
  switch (block.type) {
    case "h":
      return (
        <h3 id={id} className="cs-block-h">
          {block.text}
          {block.tag && <span className="cs-block-tag">{block.tag}</span>}
        </h3>
      );
    case "p":
      /* a paragraph one language leaves empty — Compass folds two of its
         English paragraphs into one where the others keep both — is not
         a paragraph */
      if (!block.text?.trim()) return null;
      return <p className="cs-paragraph">{marked(noOrphan(block.text))}</p>;
    case "stats":
      /* research stats strip: big figure + one-line finding per cell */
      return (
        <ul className="cs-stats">
          {block.items.map((s, i) => (
            <li key={i} className="cs-stat">
              <span className="cs-stat-value">{s.value}</span> {noOrphan(s.label)}
            </li>
          ))}
        </ul>
      );
    case "list":
      return (
        <ul className="cs-list">
          {block.items.map((item, i) => (
            <li key={i}>{marked(noOrphan(item))}</li>
          ))}
        </ul>
      );
    case "demo":
      return (
        <div className="cs-tryapp">
          <button type="button" className="cs-tryapp-btn" onClick={onDemo}>
            {block.label ?? "Try app"}
          </button>
          <span className="cs-tryapp-note">{block.note ?? DEMO_NOTE}</span>
        </div>
      );
    case "cta": {
      /* call to action styled like the demo button, opening in a new tab.
         The destination is each button's href, or — while that's still a
         «TBD:…» token — the project's embedded demo build (demo:true +
         demoHref). With neither, the button renders disabled. A block can
         carry several buttons (block.buttons) that share one row. */
      const buttons = block.buttons ?? [block];
      return (
        <div className="cs-tryapp">
          {buttons.map((btn, i) => {
            const external = btn.href && !btn.href.includes("«TBD") ? btn.href : null;
            const target = external ?? (btn.demo ? demoHref : null);
            return target ? (
              <a key={i} className="cs-tryapp-btn" href={target} target="_blank" rel="noreferrer">
                {btn.label}
              </a>
            ) : (
              <button key={i} type="button" className="cs-tryapp-btn" disabled>
                {btn.label}
              </button>
            );
          })}
          {block.note && <span className="cs-tryapp-note">{block.note}</span>}
        </div>
      );
    }
    case "tagline":
      return <p className="cs-tagline">{block.text}</p>;
    case "quote":
      return (
        <blockquote className="cs-quote">
          <p>{noOrphan(block.text)}</p>
          {block.cite && <cite className="cs-quote-cite">{block.cite}</cite>}
        </blockquote>
      );
    case "solution":
      /* a Solution row: heading with its problem tag, then text on the
         left and the app screens on the right */
      return (
        <div className="cs-solution">
          <SolutionTitle block={block} />
          <div className="cs-solution-row">
            <div className="cs-solution-text">
              {block.paras.map((t, i) => (
                <p key={i} className="cs-paragraph">
                  {marked(noOrphan(t))}
                </p>
              ))}
            </div>
            <SolutionMedia block={block} />
          </div>
        </div>
      );
    case "ba": {
      /* a side-by-side row: body copy on the left, a figure on the right —
         the solution rows' shape. Born for the usability-fix pairs, and
         the same seat serves any figure whose story reads beside it */
      if (!FIGURES[block.graphic]) return null;
      return (
        <div className="cs-ba-set">
          <div className="cs-ba-set-text">
            <p className="cs-paragraph">{marked(noOrphan(block.text))}</p>
          </div>
          <BAMedia block={block} />
        </div>
      );
    }
    case "figure": {
      const names = block.graphics ?? [block.graphic];
      const Figures = names.map((n) => FIGURES[n]).filter(Boolean);
      if (!Figures.length) return null;
      return (
        <figure className="cs-figure">
          {/* what a figure IS goes above it, in the before/after labels'
              voice; the caption below keeps only what it shows */}
          {block.title && <span className="cs-figure-title">{noOrphan(block.title)}</span>}
          <div className={Figures.length > 1 ? "cs-figure-row" : undefined}>
            {Figures.map((Figure, i) => (
              <Figure key={i} />
            ))}
          </div>
          {block.caption && (
            <figcaption className="cs-figure-caption">
              {typeof block.caption === "string"
                ? noOrphan(block.caption)
                : noOrphanSegments(block.caption).map((seg, j) =>
                    typeof seg === "string" ? (
                      seg
                    ) : (
                      <a key={j} href={seg.href} target="_blank" rel="noreferrer">
                        {seg.text}
                      </a>
                    ),
                  )}
            </figcaption>
          )}
        </figure>
      );
    }
    default:
      return null;
  }
}

/* ── The split column ──
   A chapter's blocks dealt into rows of two cells, a row being what one
   screen shows. First by subheading: an h opens a group, and the blocks
   before the first form one of their own. Then, inside a group, by
   picture: every figure, solution, before/after pair and the demo anchors
   a row and takes its left cell; the words from the previous anchor up to
   it — its lead-in — take the right, and the anchor's own words (a
   solution's title and paragraphs, a pair's explanation) follow them
   there. Words after a group's last anchor stay with it. A subheading
   with no picture is a row of words alone; the chapter's opening words,
   if they have no picture of their own, join the first subheading's row
   when that one has a picture, and stand as a row of their own when it
   has none — so a chapter's opening and its first bet are two screens,
   not one. A subheading flagged `join` in the data opens no screen of
   its own: it and its words stay in the group before them, on the same
   screen as its last words (or as the next picture's lead-in), so three
   short closing notes can share one. Each item keeps its index in the
   chapter, which is what the subheadings' ids are built from. */
const ANCHORS = new Set(["figure", "solution", "ba", "demo"]);
function splitRows(blocks) {
  const groups = [];
  blocks.forEach((block, index) => {
    if ((block.type === "h" && !block.join) || !groups.length) groups.push([]);
    groups[groups.length - 1].push({ block, index });
  });
  const rows = [];
  let lead = [];
  groups.forEach((group, g) => {
    let pending = [];
    if (lead.length) {
      if (group.some((item) => ANCHORS.has(item.block.type))) pending = lead;
      else rows.push({ media: [], text: lead });
      lead = [];
    }
    const start = rows.length;
    let anchored = false;
    group.forEach((item) => {
      if (ANCHORS.has(item.block.type)) {
        /* a picture flagged `join` in the data stands on the screen of
           the picture before it, under it, with any words between the
           two — unless it opens its group, where it has its own */
        if (item.block.join && rows.length > start) {
          const last = rows[rows.length - 1];
          last.media.push(item);
          last.text.push(...pending, item);
        } else rows.push({ media: [item], text: [...pending, item] });
        pending = [];
        anchored = true;
      } else pending.push(item);
    });
    if (!pending.length) return;
    if (anchored) rows[rows.length - 1].text.push(...pending);
    else if (g === 0) lead = pending;
    else rows.push({ media: [], text: pending });
  });
  if (lead.length) {
    if (rows.length) rows[rows.length - 1].text.push(...lead);
    else rows.push({ media: [], text: lead });
  }
  return rows;
}

/* a row of a title and a figure alone, with no words to read beside it:
   the figure takes the whole row and the title stands over it (see
   .cs-split-row--titled in casestudy.css) */
const figuresOnly = (row) =>
  row.media.length > 0 && row.media.every((item) => item.block.type === "figure");
const titledRow = (row) =>
  figuresOnly(row) &&
  row.text.some((item) => item.block.type === "h") &&
  row.text.every((item) => row.media.includes(item) || item.block.type === "h");

/* a row of figures and nothing else, not even a title: they take the
   whole row (see .cs-split-row--bare) */
const bareRow = (row) => figuresOnly(row) && row.text.every((item) => row.media.includes(item));

/* The stage's steps: the opening, then every chapter's rows, each knowing
   its chapter and the subheading it is read under — the first one on the
   row, or else the last one in the chapter before it — and whether it
   opens the chapter. */
function splitSteps(project) {
  const steps = [{ section: null, sub: null, row: null, first: false }];
  project.sections.forEach((section) => {
    const heads = section.blocks
      .map((b, i) =>
        b.type === "h" ? { id: `cs-${section.id}-h${i}`, text: b.text, index: i } : null,
      )
      .filter(Boolean);
    splitRows(section.blocks).forEach((row, r) => {
      const own = row.text.filter((t) => t.block.type === "h").map((t) => t.index);
      const last = Math.max(-1, ...row.media.map((m) => m.index), ...row.text.map((t) => t.index));
      const sub = own.length
        ? heads.find((h) => h.index === Math.min(...own))
        : (heads.filter((h) => h.index <= last).pop() ?? null);
      steps.push({ section, sub, row, first: r === 0 });
    });
  });
  return steps;
}

/* an item's words, for the right cell */
function SplitText({ item, sectionId, onDemo, demoHref }) {
  const { block, index } = item;
  switch (block.type) {
    case "solution":
      return (
        <>
          <SolutionTitle block={block} />
          {block.paras.map((t, i) => (
            <p key={i} className="cs-paragraph">
              {marked(noOrphan(t))}
            </p>
          ))}
        </>
      );
    case "ba":
      return <p className="cs-paragraph">{marked(noOrphan(block.text))}</p>;
    case "figure":
    case "demo":
      return null;
    default:
      return (
        <Block
          block={block}
          id={block.type === "h" ? `cs-${sectionId}-h${index}` : undefined}
          onDemo={onDemo}
          demoHref={demoHref}
        />
      );
  }
}

/* The demo in the page: the modal's phone — or, for a site, its window —
   seated in its cell, the app running in it with nothing to open. The
   phone is as wide as the cell allows and no taller than the stage can
   show; the window is the cell's width, and as tall as the stage can
   show up to two thirds of that width. The note sits under either. The
   app is loaded the first time its row takes the stage and kept from
   then on, so a reader who steps away and back finds it where they left
   it, and a reader who never reaches it never loads it. */
function TryAppInline({ src, title, variant = "phone", frame, note, live }) {
  const ref = useRef(null);
  const [fit, setFit] = useState({ scale: 0.5, w: 640, h: 420 });
  const [seen, setSeen] = useState(live);
  useEffect(() => {
    if (live) setSeen(true);
  }, [live]);
  useLayoutEffect(() => {
    const el = ref.current;
    const cell = el?.parentElement;
    const stage = el?.closest(".cs-split-stage");
    if (!el || !cell || !stage) return undefined;
    const measure = () => {
      const cs = getComputedStyle(stage);
      const room =
        stage.clientHeight - (parseFloat(cs.paddingTop) || 0) - (parseFloat(cs.paddingBottom) || 0);
      const under = (el.querySelector(".cs-tryapp-note")?.offsetHeight ?? 0) + 12;
      const w = cell.clientWidth;
      setFit({
        scale: Math.min(w / FRAME_W, (room - under) / FRAME_H, 1),
        w,
        h: Math.round(Math.min(room - under, w * 0.66)),
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    ro.observe(cell);
    return () => ro.disconnect();
  }, []);
  return (
    <div className="cs-split-demo" ref={ref}>
      {variant === "web" ? (
        <TryAppWeb src={seen ? src : null} title={title} w={fit.w} h={fit.h} />
      ) : (
        <TryAppPhone src={seen ? src : null} title={title} frame={frame} scale={fit.scale} />
      )}
      {note && <span className="cs-tryapp-note">{note}</span>}
    </div>
  );
}

/* an anchor's picture, for the left cell. The demo is the app itself,
   running in its phone or its window (TryAppInline) — the chapters'
   figure listener leaves it be. */
function SplitMedia({ item, project, onDemo, demoHref, live }) {
  const { block } = item;
  switch (block.type) {
    case "figure":
      return <Block block={block} />;
    case "solution":
      return <SolutionMedia block={block} />;
    case "ba":
      return <BAMedia block={block} />;
    case "demo":
      return (
        <TryAppInline
          src={demoHref ?? PROLOG_SRC}
          title={project.title}
          variant={project.demo?.variant ?? "phone"}
          frame={project.demo?.frame ?? "orange"}
          note={block.note ?? DEMO_NOTE}
          live={live}
        />
      );
    default:
      return null;
  }
}

/** One shared case-study layout for every project: title + table of contents
 *  on the left, the content (headline, intro, meta, image, sections) on the
 *  right, built from each section's block list. A project flagged
 *  `layout: "split"` is set the other way: see splitRows above and
 *  .cs-split in casestudy.css. */
export default function CaseStudyPage({ lang, setLang, fadeClass = "" }) {
  const { id } = useParams();
  /* re-set the copy when the viewport crosses the phone breakpoint — the
     orphan glue is off on a phone and on above it */
  useOrphanControl();
  const langPath = useLangPath();
  const raw = getProject(id);
  /* One pass folds every { en, ja, ko } node in the project down to the
     language on screen, so nothing below this line knows translations
     exist. Memoised because resolve() returns a fresh object every call,
     and the scroll spy below keys its effect on `project`. */
  const project = useMemo(() => (raw ? resolve(raw, lang) : null), [raw, lang]);
  const [demoOpen, setDemoOpen] = useState(false);
  // the figure a reader has opened out of the page, or null
  const [zoomed, setZoomed] = useState(null);
  /* The chapter list beside this is deliberately outside it: the list is
     stuck to the viewport, so it is never the thing being scrolled past. */
  const contentRef = useRef(null);
  /* Figures do not open on a phone. There, the column is already the width
     of the screen, so the fitted figure comes out the same size it went in
     — 350px in the page against 358px on the backdrop, measured on the
     widest board in the studies at 390. All the modal would add is a step
     between the reader and the page. */
  const isPhone = useIsPhone();
  /* one screen, or a page: see lib/screen-column.js. A phone is a page
     whatever the project says. */
  const screen = !!project?.screen && !isPhone;
  /* a project flagged `layout: "split"` is set with its chapters across
     the top and the column as two — what is looked at on the left, what
     is read on the right — and the column is a stage rather than a
     scroll (see useStage below). Only as one screen: a phone keeps the
     stacked page whatever the project says. */
  const split = project?.layout === "split" && screen;
  /* the box the column scrolls in when the page is one screen, and what
     Lenis scrolls inside it */
  const regionRef = useRef(null);
  const gridRef = useRef(null);
  const leftRef = useRef(null);
  /* Where a chapter is read at. On a page, READING_LINE from the top of
     the window; on a screen, the chapter list's own top edge, so a chapter
     brought up stands level with the list that named it, the way a
     project on the Work stage stands level with its title. */
  const readingLine = () =>
    screen ? (leftRef.current?.getBoundingClientRect().top ?? READING_LINE) : READING_LINE;
  /* Where the list is taking the reader, while it is: the chapter and
     subheading it will light once the scroll arrives. Set at the click and
     cleared on arrival, or the moment the reader takes the wheel. Without
     it a jump of three chapters lit each one in passing, opening and
     closing its subheadings on the way. */
  const travel = useRef(null);
  useScrollFade(
    contentRef,
    screen ? NO_FADE : SCROLL_FADE,
    [id, lang, screen],
    screen ? regionRef : null,
  );
  /* the scroll, through whichever box has it, and the keys — unless a
     modal is up, whose own keys they are */
  const { lenis, scrollY, scrollMax, goTo } = useScreenScroll(
    screen && !split,
    regionRef,
    gridRef,
    {
      blocked: () => !!document.querySelector(".cs-zoom, .tryapp-backdrop, .cs-gate-overlay"),
      onTake: () => {
        travel.current = null;
      },
    },
    [project],
  );
  /* A figure held open while the window narrows past the phone breakpoint
     has nowhere to be: the modal is not rendered at that width. Left in
     state it is not gone, only hidden, and widening the window again opens
     a figure the reader never asked for — measured, a figure opened at 1440
     came back on its own after a trip down to 500 and back. Closing it with
     the modal is what "figures do not open on a phone" already meant. */
  useEffect(() => {
    if (isPhone) setZoomed(null);
  }, [isPhone]);
  // section currently in view (null = the intro block above the sections)
  const [activeId, setActiveId] = useState(null);
  // and the subheading within it that the reader has reached, if any
  const [activeSub, setActiveSub] = useState(null);
  // password gate: an unlock lasts for the browsing session
  const [unlocked, setUnlocked] = useState(() => isUnlocked(id));
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (project) document.title = `${project.title} — HAJIN`;
  }, [project]);

  /* Every figure in the chapters opens, and there are some forty-five of
     them spread over a dozen components — so the chapters listen once
     instead of each image carrying its own handler, and a figure added
     later opens without being wired up.

     Two things below here are images that are not figures: the halves of a
     comparison slider, which are dragged over each other rather than
     looked at one at a time, and anything inside a link or a button, whose
     own job the click belongs to. */
  const openFigure = (e) => {
    if (isPhone) return;
    const img = e.target.closest?.("img");
    if (!img) return;
    if (img.closest("img-comparison-slider, a, button, .cs-split-opening, .cs-split-demo")) return;
    const src = img.currentSrc || img.src;
    if (!src) return;
    setZoomed({ src, alt: img.alt });
  };

  /* scroll-spy: the TOC highlights the chapter the reader is inside — the
     last section whose heading has passed the reading line — and, under
     it, the last subheading that has. Measured off the layout rather than
     the painted box, so a chapter parked 40px away by the scroll fade does
     not light up early or late. Listens to whichever box is scrolling. */
  useEffect(() => {
    if (!project || split) return undefined;
    const onScroll = () => {
      if (travel.current) {
        setActiveId(travel.current.chapter);
        setActiveSub(travel.current.sub);
        return;
      }
      const line = readingLine() + READING_SLACK;
      let current = null;
      for (const s of project.sections) {
        const el = document.getElementById(`cs-${s.id}`);
        if (el && viewTopOf(el) <= line) current = s.id;
        else break;
      }
      // fully scrolled: the last chapter is what's being read even if its
      // top never crosses the reading line (only once actually scrolled, so
      // short pages don't jump straight to the last chapter)
      if (scrollY() > 0 && scrollY() >= scrollMax() - 2) {
        current = project.sections[project.sections.length - 1].id;
      }
      setActiveId(current);
      let sub = null;
      if (current) {
        const section = project.sections.find((s) => s.id === current);
        section.blocks.forEach((b, i) => {
          if (b.type !== "h") return;
          const el = document.getElementById(`cs-${current}-h${i}`);
          if (el && viewTopOf(el) <= line) sub = el.id;
        });
      }
      setActiveSub(sub);
    };
    const box = screen ? regionRef.current : window;
    /* a locked project's gate has no column, and nothing to watch */
    if (!box) return undefined;
    onScroll();
    box.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      box.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, screen]);

  /* a figure held open, or the demo: the box holds still under it */
  useEffect(() => {
    const smooth = split ? stage.lenis.current : lenis.current;
    if (!smooth) return;
    if (zoomed || demoOpen) smooth.stop();
    else smooth.start();
  }, [zoomed, demoOpen]);

  /* the column is a stage: only the chapter being read is on it, and the
     opening until the first chapter is reached — see lib/screen-column.js */
  useColumnStage(
    screen && !split,
    contentRef,
    ".cs-section",
    project && activeId ? project.sections.findIndex((s) => s.id === activeId) : -1,
    [project],
  );

  /* ── The split column is a stage ──
     The Work page's (lib/stage.js): every row in one cell, only the one
     being read shown, the wheel turning the stage a row at a time, and a
     row taller than the stage scrolled through by its extra steps before
     the next takes it. The steps are the opening and every chapter's rows
     (splitSteps); the bar reads its chapter and subheading off the step
     on the stage. On the stacked column there are no rows, and none of
     this runs. */
  const steps = useMemo(() => (split ? splitSteps(project) : []), [project, split]);
  /* a locked study's gate stands where its column would: the stage is
     built once the gate has come down (see gateActive below) */
  const gateActive = !!project?.locked && !unlocked;
  const stageRef = useRef(null);
  const scrollRef = useRef(null);
  const trackRef = useRef(null);
  const stage = useStage({
    count: Math.max(1, steps.length),
    boxRef: scrollRef,
    trackRef,
    blocks: () => [...(stageRef.current?.querySelectorAll(".cs-split-row") ?? [])],
    /* how far a row stands past what can be read: the stage's content
       box, its padding being the air a row keeps from the list and the
       footer — with a few pixels' grace, so a row whose foot only just
       dips into that air does not get a step that moves it by that much
       and no more */
    overflowOf: (row) => {
      const box = stageRef.current;
      if (!box) return 0;
      const cs = getComputedStyle(box);
      const pad = (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);
      const over = row.offsetHeight - (box.clientHeight - pad);
      return over <= 20 ? 0 : over;
    },
    blocked: () => !!document.querySelector(".cs-zoom, .tryapp-backdrop"),
    /* the row's highlights are drawn as it takes the stage */
    onSwap: drawHighlights,
    deps: [project, gateActive],
  });
  /* Several figures in one cell — a figure flagged `join` under another —
     share the room: the cell's pictures are capped at the tallest height
     at which the cell still fits the stage, found by halving, and set on
     the cell as --cs-fig-cap (read by the .cs-split-media rule in
     casestudy.css). Found again as the pictures load and the window
     changes; the stage re-measures the row on its own. */
  useLayoutEffect(() => {
    const box = stageRef.current;
    if (!split || !box) return undefined;
    const cells = [...box.querySelectorAll(".cs-split-media")].filter(
      (cell) => cell.querySelectorAll(":scope > .cs-figure").length > 1,
    );
    if (!cells.length) return undefined;
    const fit = () => {
      const cs = getComputedStyle(box);
      const room =
        box.clientHeight - (parseFloat(cs.paddingTop) || 0) - (parseFloat(cs.paddingBottom) || 0);
      cells.forEach((cell) => {
        let lo = 0;
        let hi = room;
        cell.style.setProperty("--cs-fig-cap", `${hi}px`);
        if (cell.offsetHeight <= room) return;
        for (let k = 0; k < 8; k += 1) {
          const mid = (lo + hi) / 2;
          cell.style.setProperty("--cs-fig-cap", `${mid}px`);
          if (cell.offsetHeight <= room) lo = mid;
          else hi = mid;
        }
        cell.style.setProperty("--cs-fig-cap", `${Math.floor(lo)}px`);
      });
    };
    fit();
    let queued = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(queued);
      queued = requestAnimationFrame(fit);
    });
    ro.observe(box);
    cells.forEach((cell) => ro.observe(cell));
    return () => {
      cancelAnimationFrame(queued);
      ro.disconnect();
    };
  }, [split, steps, gateActive]);
  /* the step on the stage, and the chapter and subheading it is read under */
  const onStage = split ? steps[Math.min(stage.current ?? 0, steps.length - 1)] : null;
  const barChapter = split ? (onStage?.section?.id ?? null) : activeId;

  /* ── The line under the bar ──
     In the project's own colour, from the bar's left edge: under the
     wordmark at the opening, and out along the chapter being read as the
     reader goes on — as far along its name as the reader is through its
     rows, the second of four rows taking the line halfway, the last to
     the end — drawn on by GSAP as the row changes. The bar moves under it
     (a name opening or closing shifts what follows), so the line is
     re-aimed whenever a chapter's box changes size, and eases to wherever
     the end now is. */
  const barRef = useRef(null);
  const lineRef = useRef(null);
  const lineTo = useRef(null);
  const lineAt = useRef({ k: -1, through: 1 });
  {
    const k = barChapter ? project.sections.findIndex((s) => s.id === barChapter) : -1;
    const rows = k >= 0 ? steps.filter((st) => st.section?.id === barChapter) : [];
    lineAt.current = { k, through: rows.length ? (rows.indexOf(onStage) + 1) / rows.length : 1 };
  }
  useEffect(() => {
    if (!split) return undefined;
    const bar = barRef.current;
    const line = lineRef.current;
    if (!bar || !line) return undefined;
    const end = () => {
      const { k, through } = lineAt.current;
      const el =
        k >= 0
          ? bar.querySelectorAll(".cs-split-chapter")[k]
          : bar.querySelector(".cs-split-brand");
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return r.left - bar.getBoundingClientRect().left + r.width * through;
    };
    const draw = gsap.quickTo(line, "width", {
      duration: reducedMotion() ? 0 : 0.6,
      ease: "power2.out",
    });
    lineTo.current = () => draw(end());
    /* drawn on from nothing on arrival */
    gsap.set(line, { width: 0 });
    lineTo.current();
    const ro = new ResizeObserver(() => lineTo.current?.());
    bar.querySelectorAll(".cs-split-chapter, .cs-split-brand").forEach((el) => ro.observe(el));
    ro.observe(bar);
    return () => {
      ro.disconnect();
      lineTo.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [split, project]);
  useEffect(() => {
    lineTo.current?.();
  }, [onStage]);
  const barSub = split ? onStage?.sub : null;
  const firstStepOf = (sectionId) =>
    Math.max(
      0,
      steps.findIndex((st) => st.section?.id === sectionId),
    );

  if (!project) return <Navigate to={langPath("/work")} replace />;

  const HeroScene = project.heroScene ? HERO_SCENES[project.heroScene] : null;

  /* the split bar keeps one line's room under itself for the subheading
     being read, if any chapter has one, so the stage holds still as they
     come and go (see --cs-bar-subs in casestudy.css) */
  const barSubs =
    split && project.sections.some((s) => s.blocks.some((b) => b.type === "h")) ? 1 : 0;
  /* the split column's stage is also the column the fade would read */
  const stageBodyRef = (el) => {
    stageRef.current = el;
    contentRef.current = el;
  };

  // where a cta with demo:true points until its real URL lands
  const demoHref = project.demo?.src ? `${import.meta.env.BASE_URL}${project.demo.src}` : null;

  /* A locked case study is not rendered and then covered — it is not
     rendered. Layering the gate over a finished page leaves the whole study
     in the DOM, one deleted node away from anyone who opens devtools, which
     is not what "covered by a company confidentiality policy" should mean.
     Only the title stands behind the gate, and it is already on the Work
     card. */
  if (gateActive) {
    return (
      <div className="ab-root">
        <SiteHeader current="work" />
        <main className="cs-main">
          <div className="ab-grid cs-grid">
            <div className="cs-left">
              <h1 className="cs-title">{project.title}</h1>
            </div>
          </div>
        </main>
        <SiteFooter lang={lang} setLang={setLang} />
        <CaseGateModal
          project={project}
          lang={lang}
          onDismiss={() => {
            const go = () => navigate(langPath("/work"));
            if (crossing(pathname, "/work")) withPageTransition(go);
            else go();
          }}
          onUnlocked={() => setUnlocked(true)}
        />
      </div>
    );
  }

  /* Jump to a chapter or a subheading, and stay jumped.
   *
   * scrollIntoView aims at where the element is now and is then left behind
   * by the page: the figures below the fold are lazy, and each one that
   * arrives mid-flight grows the document and cancels the browser's smooth
   * scroll where it stands. Measured on Compass, chapter 03: the scroll dies
   * about a thousand pixels short, with the fade on and equally with it off.
   *
   * So the target is recomputed as the page settles and the scroll re-aimed
   * until it holds still — and abandoned the moment the reader touches the
   * wheel, because from then on the position is theirs, not ours. Through
   * whichever box is scrolling: the window, or the screen's own. */
  const scrollTo = (targetId) => {
    const el = targetId ? document.getElementById(targetId) : null;
    if (targetId && !el) return;
    const targetOf = () => (el ? Math.max(0, scrollY() + viewTopOf(el) - readingLine()) : 0);

    /* what the list will show from here to arrival: the target's chapter
       and, if the target is a subheading, that */
    const chapter = targetId
      ? project.sections.find((s) => targetId.startsWith(`cs-${s.id}`))
      : null;
    travel.current = {
      chapter: chapter?.id ?? null,
      sub: targetId && targetId !== `cs-${chapter?.id}` ? targetId : null,
    };
    setActiveId(travel.current.chapter);
    setActiveSub(travel.current.sub);

    /* and stays lit until the jump is over: see settleAt */
    settleAt({
      targetOf,
      scrollY,
      goTo,
      onStop: () => {
        travel.current = null;
      },
    });
  };

  /* hero media for a project with no hero scene: a silent autoplay loop,
     like a GIF. heroVideoRatio (e.g. "1000 / 976") shows the file
     uncropped at its own shape; without it the video cover-fills the 5:2
     band. A project with neither renders nothing here. */
  const heroVideo = project.heroVideo ? (
    <video
      className="cs-video"
      src={`${import.meta.env.BASE_URL}${project.heroVideo}`}
      style={project.heroVideoRatio ? { aspectRatio: project.heroVideoRatio } : undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  ) : null;

  /* the opening's words: the headline, the sentences under it and the
     meta table — the same in both settings of the column */
  const opening = (
    <>
      {project.headline && <p className="cs-headline">{project.headline}</p>}

      <div className="cs-intro">
        {/* a paragraph one language leaves empty — Compass says its opening
            in one where the others take two — is not a paragraph */}
        {project.intro
          .filter((para) => (typeof para === "string" ? para.trim() : para.length))
          .map((para, i) => (
            <p key={i} className="cs-paragraph">
              {typeof para === "string"
                ? marked(noOrphan(para))
                : noOrphanSegments(para).map((seg, j) =>
                    typeof seg === "string" ? (
                      marked(seg)
                    ) : (
                      <a
                        key={j}
                        className="cs-inline-link"
                        href={seg.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {seg.text}
                      </a>
                    ),
                  )}
            </p>
          ))}
      </div>

      <div className="cs-meta">
        <MetaGroup rows={project.metaLeft} />
        <MetaGroup rows={project.metaRight} />
      </div>
    </>
  );

  return (
    <div
      className={"ab-root" + (screen ? " page-screen" : "") + (split ? " cs-split" : "")}
      style={{ "--cs-card": project.card, ...(split ? { "--cs-bar-subs": barSubs } : {}) }}
    >
      <SiteHeader current="work" />

      {/* the split bar: the wordmark, then the chapters by number, the one
          being read opened to its name with the subheading being read
          under it. Outside the box, over the veil, the way the header is. */}
      {split && (
        <nav className="cs-split-bar" aria-label="Chapters" ref={barRef}>
          <span className="cs-split-line" aria-hidden="true" ref={lineRef} />
          <h1 className="cs-split-brand">
            <button type="button" onClick={() => stage.jumpTo(0)}>
              <img src={project.logo.color} alt={project.title} />
            </button>
          </h1>
          <ol className="cs-split-chapters">
            {project.sections.map((s) => {
              /* "02 Three Products, No Phone": the number, and the name */
              const [no, ...name] = s.label.split(" ");
              const current = barChapter === s.id;
              return (
                <li key={s.id} className={"cs-split-chapter" + (current ? " is-current" : "")}>
                  <button
                    type="button"
                    className="cs-split-item"
                    aria-label={s.label}
                    aria-current={current ? "true" : undefined}
                    onClick={() => stage.jumpTo(firstStepOf(s.id))}
                  >
                    <span className="cs-split-no">{no}</span>
                    <span className="cs-split-name">
                      <span>{name.join(" ")}</span>
                    </span>
                  </button>
                  {/* the subheading being read, under its chapter; keyed so
                      the next one arrives through its own fade */}
                  {current && barSub && (
                    <div className="cs-split-subs">
                      <span key={barSub.id} className="cs-split-sub">
                        {barSub.text}
                      </span>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}

      {/* cross-fades on language switches, matching the other pages. When
          the page is one screen this is the box the column scrolls in. */}
      <main className={"cs-main " + fadeClass} ref={regionRef}>
        {split ? (
          /* the stage: the opening as one row — the hero scene on the
             left, the words on the right — then each chapter's rows, all
             in one cell, the one on the stage shown (see useStage) */
          <div className="cs-split-stage" ref={stageBodyRef} onClick={openFigure}>
            {steps.map((st, i) => (
              <div
                key={i}
                className={
                  "cs-split-row" +
                  (st.row ? "" : " cs-split-opening") +
                  (st.row && titledRow(st.row) ? " cs-split-row--titled" : "") +
                  (st.row && bareRow(st.row) ? " cs-split-row--bare" : "")
                }
              >
                <div className="cs-split-media">
                  {st.row ? (
                    st.row.media.map((item) => (
                      <SplitMedia
                        key={item.index}
                        item={item}
                        project={project}
                        onDemo={() => setDemoOpen(true)}
                        demoHref={demoHref}
                        live={stage.current === i}
                      />
                    ))
                  ) : HeroScene ? (
                    <HeroScene />
                  ) : (
                    heroVideo
                  )}
                </div>
                <div className="cs-split-text">
                  {st.row ? (
                    <>
                      {/* the chapter's label is the bar's to show; the
                          outline keeps it, at the chapter's first row */}
                      {st.first && <h2 className="cs-section-no">{st.section.label}</h2>}
                      {st.row.text.map((item) => (
                        <SplitText
                          key={item.index}
                          item={item}
                          sectionId={st.section.id}
                          onDemo={() => setDemoOpen(true)}
                          demoHref={demoHref}
                        />
                      ))}
                    </>
                  ) : (
                    opening
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="ab-grid cs-grid" ref={gridRef}>
            {/* title + chapters stick together; the title doubles as the
              "back to intro" control */}
            <div className="cs-left" ref={leftRef}>
              <h1 className="cs-title" onClick={() => scrollTo(null)}>
                {project.title}
              </h1>
              {/* on mobile the phone mockup rides beside the chapter list
                instead of inside the hero (hidden on desktop via CSS) */}
              <div className="cs-toc-row">
                <nav className={"cs-toc" + (project.screen ? " cs-toc--nested" : "")}>
                  {project.sections.map((s) => {
                    /* the chapter's subheadings, by the same ids the blocks
                     below carry */
                    const subs = project.screen
                      ? s.blocks
                          .map((b, i) =>
                            b.type === "h" ? { id: `cs-${s.id}-h${i}`, text: b.text } : null,
                          )
                          .filter(Boolean)
                      : [];
                    return (
                      <div
                        key={s.id}
                        className={"cs-toc-chapter" + (activeId === s.id ? " is-current" : "")}
                      >
                        <button
                          type="button"
                          className={"cs-toc-item" + (activeId === s.id ? " is-current" : "")}
                          onClick={() => scrollTo(`cs-${s.id}`)}
                        >
                          {s.label}
                        </button>
                        {subs.length > 0 && (
                          /* opened under the chapter being read, closed under
                           the rest — a grid row that grows from nothing */
                          <div className="cs-toc-sub">
                            <div className="cs-toc-sub-inner">
                              {subs.map((h) => (
                                <button
                                  key={h.id}
                                  type="button"
                                  className={
                                    "cs-toc-subitem" + (activeSub === h.id ? " is-current" : "")
                                  }
                                  onClick={() => scrollTo(h.id)}
                                >
                                  {h.text}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
                {HeroScene && project.id === "prolog" && (
                  <img
                    className="cs-toc-mockup"
                    src={prologMockupUrl}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                  />
                )}
              </div>
            </div>

            <div className="cs-content" ref={contentRef}>
              {/* a project's hero scene (logo + live animation + mockup) leads
                the page, above the headline */}
              {HeroScene && <HeroScene />}

              {opening}

              {HeroScene ? null : heroVideo}

              <div className="cs-sections" onClick={openFigure}>
                {project.sections.map((s) => (
                  <section key={s.id} id={`cs-${s.id}`} className="cs-section">
                    <h2 className="cs-section-no">{s.label}</h2>
                    {s.blocks.map((b, i) => (
                      <Block
                        key={i}
                        block={b}
                        id={b.type === "h" ? `cs-${s.id}-h${i}` : undefined}
                        onDemo={() => setDemoOpen(true)}
                        demoHref={demoHref}
                      />
                    ))}
                  </section>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter lang={lang} setLang={setLang} />

      {/* the scroll box the wheel turns, never seen: see .stage-scroll */}
      {split && (
        <div className="stage-scroll" ref={scrollRef} aria-hidden="true">
          <div className="stage-track" ref={trackRef} style={{ "--stage-steps": stage.steps }} />
        </div>
      )}

      {zoomed && !isPhone && (
        <ImageLightbox src={zoomed.src} alt={zoomed.alt} onClose={() => setZoomed(null)} />
      )}

      {project.demo && (
        <TryAppModal
          open={demoOpen}
          onClose={() => setDemoOpen(false)}
          src={project.demo.src ? `${import.meta.env.BASE_URL}${project.demo.src}` : PROLOG_SRC}
          variant={project.demo.variant ?? "phone"}
          frame={project.demo.frame ?? "orange"}
          title={project.title}
        />
      )}
    </div>
  );
}
