import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import TryAppModal from "../components/TryAppModal.jsx";
import CaseGateModal, { isUnlocked } from "../components/CaseGateModal.jsx";
import ProLogJourney from "../components/ProLogJourney.jsx";
import TinyPawsMonitor from "../components/TinyPawsMonitor.jsx";
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
import { WLAuditFigure } from "../components/WeLabFigures.jsx";

/* hero scenes: live in-page animations a project can use instead of a
   video or the placeholder (see each project's heroScene field) */
const HERO_SCENES = { journey: ProLogJourney, monitor: TinyPawsMonitor };

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
  "welab-fig-audit": WLAuditFigure,
  "tinypaws-fig-sitemap": TPSitemapFigure,
  "tinypaws-fig-lofi-grid": TPLofiGridFigure,
  "tinypaws-ba-nav": TPBANavFigure,
  "tinypaws-ba-structure": TPBAStructureFigure,
  "tinypaws-ba-cta": TPBACtaFigure,
};

/* solution-row app/site screens, keyed per project (keys are unique
   across projects, so one lookup serves them all) */
const SHOTS = { ...PROLOG_SHOTS, ...TINYPAWS_SHOTS };
import { getProject } from "../data/projects.js";
import { noOrphan, noOrphanSegments } from "../lib/no-orphan.js";

// ProLog is exported to the Portfolio under /prolog/ (see site/public/prolog)
const PROLOG_SRC = `${import.meta.env.BASE_URL}prolog/`;

function MetaGroup({ rows }) {
  return (
    <div className="cs-meta-group">
      {rows.map((r) => (
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
            Try app
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
                {block.media.map((m) => (
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
    case "figure": {
      const names = block.graphics ?? [block.graphic];
      const Figures = names.map((n) => FIGURES[n]).filter(Boolean);
      if (!Figures.length) return null;
      return (
        <figure className="cs-figure">
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
export default function CaseStudyPage({ lang, setLang }) {
  const { id } = useParams();
  const project = getProject(id);
  const [demoOpen, setDemoOpen] = useState(false);
  // section currently in view (null = the intro block above the sections)
  const [activeId, setActiveId] = useState(null);
  // password gate: an unlock lasts for the browsing session
  const [unlocked, setUnlocked] = useState(() => isUnlocked(id));
  const navigate = useNavigate();

  useEffect(() => {
    if (project) document.title = `${project.title} — HAJIN`;
  }, [project]);

  // scroll-spy: the TOC highlights the chapter the reader is inside —
  // the last section whose top has passed the reading line
  useEffect(() => {
    if (!project) return;
    const ids = project.sections.map((s) => s.id);
    const onScroll = () => {
      let current = null;
      for (const sid of ids) {
        const el = document.getElementById(`cs-${sid}`);
        if (el && el.getBoundingClientRect().top <= 140) current = sid;
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

  if (!project) return <Navigate to="/work" replace />;

  const HeroScene = project.heroScene ? HERO_SCENES[project.heroScene] : null;

  // where a cta with demo:true points until its real URL lands
  const demoHref = project.demo?.src ? `${import.meta.env.BASE_URL}${project.demo.src}` : null;

  const gateActive = !!project.locked && !unlocked;

  const scrollTo = (sectionId) => {
    if (!sectionId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(`cs-${sectionId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="ab-root">
      <SiteHeader current="work" />

      <main className="cs-main">
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

          <div className="cs-content">
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

            <div className="cs-sections">
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

      {gateActive && (
        <CaseGateModal
          project={project}
          lang={lang}
          onDismiss={() => navigate("/work")}
          onUnlocked={() => setUnlocked(true)}
        />
      )}

      {project.demo && (
        <TryAppModal
          open={demoOpen}
          onClose={() => setDemoOpen(false)}
          src={
            project.demo.src ? `${import.meta.env.BASE_URL}${project.demo.src}` : PROLOG_SRC
          }
          variant={project.demo.variant ?? "phone"}
          title={project.title}
        />
      )}
    </div>
  );
}
