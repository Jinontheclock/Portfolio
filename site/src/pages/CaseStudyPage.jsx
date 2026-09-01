import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import TryAppModal from "../components/TryAppModal.jsx";
import CaseGateModal, { isUnlocked } from "../components/CaseGateModal.jsx";
import ImageLightbox from "../components/ImageLightbox.jsx";
import useScrollFade from "../lib/scroll-fade.js";
import useIsPhone from "../hooks/useIsPhone.js";
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
  WLLangToggleFigure,
  WLLandingBAFigure,
  WLFigmaFeaturedFigure,
  WLWorkflowFigure,
  WLOldShowcaseFigure,
  WLOldLandingFigure,
  WLOldStudiosFigure,
} from "../components/WeLabFigures.jsx";
import {
  COMPASS_FIGURES,
  COMPASS_SHOTS,
} from "../components/CompassPlaceholders.jsx";
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
const SCROLL_FADE = [
  [".cs-content > *:not(.cs-sections)"],
  ".cs-section",
];

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

/* Where a section's heading sits in the document, with the scroll fade's own
   offset taken back out. A faded section is parked 40px from where the layout
   puts it, and a scroll aimed at the box you can see lands 40px wrong the
   moment the fade settles it back. */
const documentTopOf = (el) => {
  const shift = new DOMMatrixReadOnly(getComputedStyle(el).transform).m42;
  return el.getBoundingClientRect().top + window.scrollY - shift;
};

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
import useLangPath from "../hooks/useLangPath.js";
import withViewTransition, { crossing } from "../lib/viewTransition.js";

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

function Block({ block, onDemo, demoHref }) {
  switch (block.type) {
    case "h":
      return (
        <h3 className="cs-block-h">
          {block.text}
          {block.tag && <span className="cs-block-tag">{block.tag}</span>}
        </h3>
      );
    case "p":
      return <p className="cs-paragraph">{noOrphan(block.text)}</p>;
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
            <li key={i}>{noOrphan(item)}</li>
          ))}
        </ul>
      );
    case "demo":
      return (
        <div className="cs-tryapp">
          <button type="button" className="cs-tryapp-btn" onClick={onDemo}>
            {block.label ?? "Try app"}
          </button>
          <span className="cs-tryapp-note">
            {block.note ?? "Runs the real app right here — no install needed."}
          </span>
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
          <h3 className="cs-block-h">
            {block.title}
            {block.tag && <span className="cs-block-tag">{block.tag}</span>}
          </h3>
          <div className="cs-solution-row">
            <div className="cs-solution-text">
              {block.paras.map((t, i) => (
                <p key={i} className="cs-paragraph">
                  {noOrphan(t)}
                </p>
              ))}
            </div>
            <figure className="cs-solution-media">
              {/* wide: landscape desktop screenshots stack vertically instead
                  of sharing one row like the portrait phone shots */}
              <div className={"cs-shots" + (block.wide ? " cs-shots--wide" : "")}>
                {/* an unregistered key renders nothing rather than throwing
                    mid-render and blanking the whole page (same defence as
                    the figure branch below) */}
                {block.media
                  .filter((m) => SHOTS[m])
                  .map((m) => (
                    <img key={m} src={SHOTS[m].src} alt={SHOTS[m].alt} loading="lazy" />
                  ))}
              </div>
              {block.caption && (
                <figcaption className="cs-figure-caption">{block.caption}</figcaption>
              )}
            </figure>
          </div>
        </div>
      );
    case "ba": {
      /* a side-by-side row: body copy on the left, a figure on the right —
         the solution rows' shape. Born for the usability-fix pairs, and
         the same seat serves any figure whose story reads beside it */
      const Figure = FIGURES[block.graphic];
      if (!Figure) return null;
      return (
        <div className="cs-ba-set">
          <div className="cs-ba-set-text">
            <p className="cs-paragraph">{noOrphan(block.text)}</p>
          </div>
          <figure className="cs-ba-set-media">
            {block.title && (
              <span className="cs-figure-title">{noOrphan(block.title)}</span>
            )}
            <Figure />
            {block.caption && (
              <figcaption className="cs-figure-caption">
                {noOrphan(block.caption)}
              </figcaption>
            )}
          </figure>
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
          {block.title && (
            <span className="cs-figure-title">{noOrphan(block.title)}</span>
          )}
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

/** One shared case-study layout for every project: title + table of contents
 *  on the left, the content (headline, intro, meta, image, sections) on the
 *  right, built from each section's block list. */
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
  // last scroll position seen while re-aiming a chapter jump (see scrollTo)
  const lastY = useRef(-1);
  useScrollFade(contentRef, SCROLL_FADE, [id, lang]);
  /* Figures do not open on a phone. There, the column is already the width
     of the screen, so the fitted figure comes out the same size it went in
     — 350px in the page against 358px on the backdrop, measured on the
     widest board in the studies at 390. All the modal would add is a step
     between the reader and the page. */
  const isPhone = useIsPhone();
  // section currently in view (null = the intro block above the sections)
  const [activeId, setActiveId] = useState(null);
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
    if (img.closest("img-comparison-slider, a, button")) return;
    const src = img.currentSrc || img.src;
    if (!src) return;
    setZoomed({ src, alt: img.alt });
  };

  /* scroll-spy: the TOC highlights the chapter the reader is inside — the
     last section whose heading has passed the reading line. Measured off the
     layout rather than the painted box, so a chapter parked 40px away by the
     scroll fade does not light up early or late. */
  useEffect(() => {
    if (!project) return;
    const ids = project.sections.map((s) => s.id);
    const onScroll = () => {
      let current = null;
      for (const sid of ids) {
        const el = document.getElementById(`cs-${sid}`);
        if (el && documentTopOf(el) - window.scrollY <= READING_LINE + READING_SLACK) current = sid;
        else break;
      }
      // fully scrolled: the last chapter is what's being read even if its
      // top never crosses the reading line (only once actually scrolled, so
      // short pages don't jump straight to the last chapter)
      const doc = document.documentElement;
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        current = ids[ids.length - 1];
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [project]);

  if (!project) return <Navigate to={langPath("/work")} replace />;

  const HeroScene = project.heroScene ? HERO_SCENES[project.heroScene] : null;

  // where a cta with demo:true points until its real URL lands
  const demoHref = project.demo?.src ? `${import.meta.env.BASE_URL}${project.demo.src}` : null;

  const gateActive = !!project.locked && !unlocked;

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
            const move = crossing(pathname, "/work");
            if (move) withViewTransition(go, move);
            else go();
          }}
          onUnlocked={() => setUnlocked(true)}
        />
      </div>
    );
  }

  /* Jump to a chapter, and stay jumped.
   *
   * scrollIntoView aims at where the element is now and is then left behind
   * by the page: the figures below the fold are lazy, and each one that
   * arrives mid-flight grows the document and cancels the browser's smooth
   * scroll where it stands. Measured on Compass, chapter 03: the scroll dies
   * about a thousand pixels short, with the fade on and equally with it off.
   *
   * So the target is recomputed as the page settles and the scroll re-aimed
   * until it holds still — and abandoned the moment the reader touches the
   * wheel, because from then on the position is theirs, not ours. */
  const scrollTo = (sectionId) => {
    const el = sectionId ? document.getElementById(`cs-${sectionId}`) : null;
    if (sectionId && !el) return;
    const targetOf = () => (el ? Math.max(0, documentTopOf(el) - READING_LINE) : 0);

    window.scrollTo({ top: targetOf(), behavior: "smooth" });
    if (!el) return;

    let frame = 0;
    const until = performance.now() + 2500;
    const stop = () => cancelAnimationFrame(frame);
    const settle = () => {
      const want = targetOf();
      if (Math.abs(window.scrollY - want) < 2 || performance.now() > until) return stop();
      /* only re-aim once the browser's own scroll has come to rest, or every
         frame would restart it and nothing would ever move */
      if (window.scrollY === lastY.current) window.scrollTo({ top: want, behavior: "smooth" });
      lastY.current = window.scrollY;
      frame = requestAnimationFrame(settle);
    };
    window.addEventListener("wheel", stop, { passive: true, once: true });
    window.addEventListener("touchstart", stop, { passive: true, once: true });
    frame = requestAnimationFrame(settle);
  };

  return (
    <div className="ab-root">
      <SiteHeader current="work" />

      {/* cross-fades on language switches, matching the other pages */}
      <main className={"cs-main " + fadeClass}>
        <div className="ab-grid cs-grid">
          {/* title + chapters stick together; the title doubles as the
              "back to intro" control */}
          <div className="cs-left">
            <h1 className="cs-title" onClick={() => scrollTo(null)}>
              {project.title}
            </h1>
            {/* on mobile the phone mockup rides beside the chapter list
                instead of inside the hero (hidden on desktop via CSS) */}
            <div className="cs-toc-row">
              <nav className="cs-toc">
                {project.sections.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={"cs-toc-item" + (activeId === s.id ? " is-current" : "")}
                    onClick={() => scrollTo(s.id)}
                  >
                    {s.label}
                  </button>
                ))}
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

            {project.headline && <p className="cs-headline">{project.headline}</p>}

            <div className="cs-intro">
              {project.intro.map((para, i) => (
                <p key={i} className="cs-paragraph">
                  {typeof para === "string"
                    ? noOrphan(para)
                    : noOrphanSegments(para).map((seg, j) =>
                        typeof seg === "string" ? (
                          seg
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

            {HeroScene ? null : project.heroVideo ? (
              /* hero media: silent autoplay loop, like a GIF. heroVideoRatio
                 (e.g. "1000 / 976") shows the file uncropped at its own
                 shape; without it the video cover-fills the 5:2 band.
                 Projects with no hero media render nothing here. */
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
            ) : null}

            <div className="cs-sections" onClick={openFigure}>
              {project.sections.map((s) => (
                <section key={s.id} id={`cs-${s.id}`} className="cs-section">
                  <h2 className="cs-section-no">{s.label}</h2>
                  {s.blocks.map((b, i) => (
                    <Block
                      key={i}
                      block={b}
                      onDemo={() => setDemoOpen(true)}
                      demoHref={demoHref}
                    />
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter lang={lang} setLang={setLang} />

      {zoomed && !isPhone && (
        <ImageLightbox src={zoomed.src} alt={zoomed.alt} onClose={() => setZoomed(null)} />
      )}

      {project.demo && (
        <TryAppModal
          open={demoOpen}
          onClose={() => setDemoOpen(false)}
          src={
            project.demo.src ? `${import.meta.env.BASE_URL}${project.demo.src}` : PROLOG_SRC
          }
          variant={project.demo.variant ?? "phone"}
          frame={project.demo.frame ?? "orange"}
          title={project.title}
        />
      )}
    </div>
  );
}
