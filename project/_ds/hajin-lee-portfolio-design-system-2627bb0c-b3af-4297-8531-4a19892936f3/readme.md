# Hajin Lee — Portfolio Design System

Greyscale-only minimalist design system for the personal portfolio of **Hajin Lee** (HAJIN), a product designer based in Vancouver (originally from Seoul, with professional experience in the Japanese retail industry). The portfolio presents product design + front-end work (e.g. **ProLog**, a skilled-trades apprenticeship progress-tracking app).

**Primary inspiration:** [postarchivefaction.com](https://postarchivefaction.com/) (POST ARCHIVE FACTION) — stark greyscale, typography-as-interface, pill-shaped utility buttons, no decoration.

**Source:** Figma file `Portfolio.fig` (attached to this project) — pages: `Design-Guide` (colors, fonts, grids), `Wireframe` (landing responsive set, work, project detail), `Lo-Fi` (landing, about, project detail, PAF reference). The `trash-don-t-use` page and screenshot frames were deliberately excluded per the author.

## CONTENT FUNDAMENTALS

- **Voice:** first person ("I approach design with a focus on clarity…"), calm, factual, no hype, no exclamation except the type-specimen greeting.
- **Casing:** sentence case for prose; project tags are lowercase ("product design", "Front-end development" — mixed, keep as-authored); nav is Title Case single words ("Work", "About"); the wordmark is ALL CAPS ("HAJIN").
- **Multilingual:** EN / 한국어 / 日本語 are first-class. Copy exists per language; type styles carry per-language line-height/tracking (see `tokens/typography.css`).
- **No emoji. Ever.** Meta text uses plain separators: `Light | Dark`, `© HAJIN LEE 2026 All rights reserved | Designed & built by Hajin Lee`.
- **Brevity:** one-line project descriptors ("skilled trades apprenticeship app for progress tracking"); stacks listed as plain line-broken lists (Figma / After Effects / Photoshop…).

## VISUAL FOUNDATIONS

- **Color:** strictly greyscale. Light UI on `#FAFAFA`/`#F4F4F4`; ink `#0F0F0F`. 8-step ramps per theme + 9 semantic roles (bg / bg-subtle / bg-muted / border / border-strong / text-muted / text-secondary / text / text-primary). Dark theme mirrors the ramp. No accent hue anywhere; emphasis = darker grey or bigger type.
- **Type:** Spoqa Han Sans Neo is the ONLY typeface — every language, every role (hero, body, pills, nav, footer). Almost always weight 400 — hierarchy by size (112 hero / 56 / 40 / 28 / 20 / 18 / 16 / 14 / 12), not weight. Bold (700) is reserved for the hero and the name. `--font-ui` is an alias of `--font-sans` kept for compatibility.
- **Layout:** hard-edged, grid-flat. 20–24px page gutters at 1440; content pinned to edges/corners (nav top-right, utilities bottom-left, copyright bottom-right). Big whitespace fields between blocks.
- **Backgrounds:** flat solid greys only. No gradients, no textures, no patterns, no full-bleed photography backdrops. Project imagery sits in square-cornered blocks (625×328 placeholder grey `#D9D9D9`).
- **Corners:** 0 radius everywhere — except pill utility buttons (17/18px, fully rounded).
- **Shadows:** none. Depth is expressed by grey value, never elevation.
- **Borders:** rarely used; when needed, 1px `--border` (#D4D4D4 light / #333 dark).
- **Transparency/blur:** dropdown menus and hover-triggered surfaces use greyscale **glassmorphism**: `--glass-bg` rgba(244,244,244,.5) + `backdrop-filter: blur(var(--glass-blur))` (12px) + hairline `--glass-border`; denser rows use `--glass-bg-strong`. Square corners even on glass. Pills keep their translucent fill `rgba(228,228,233,0.35)` (add blur when floating over content).
- **Motion:** quiet and opacity-led; `--easing cubic-bezier(0.4,0,0.2,1)`, 150–250ms. No bounces.
- **Hover:** text links dim to 50% opacity or shift a grey step; pills darken their translucent fill slightly. Press: one grey step darker, no scaling.
- **Imagery:** work screenshots/product shots, desaturated/neutral palette; shown in flat square containers, never rounded, never bordered.
- **Themes:** Light is the default; the site follows the visitor's OS `prefers-color-scheme` unless they explicitly pick via the plain-text `Light | Dark` toggle (explicit choice persists and wins). Language switch is plain stacked text (English / 日本語 / 한국어).

## ICONOGRAPHY

Near-zero iconography — text is the interface. From Figma:
- `assets/arrow-down.png` — 36px hero arrow next to "Work"/"About" landing links.
- `assets/arrow-right.svg` — 27×8 thin long-tail arrow used beside nav links.
- `assets/footer-mark.svg` — 12×12 mark beside the copyright line.

Extended set (generated to match the hairline grammar — 1px strokes, 45° chevron heads, long tails, square caps, `currentColor`):
- `assets/arrow-left.svg` (27×8, back) · `assets/arrow-up.svg` (8×27, to-top) · `assets/arrow-up-right.svg` (16, external links) · `assets/icon-close.svg` (16, dismiss) · `assets/icon-plus.svg` (16, expand) · `assets/icon-download.svg` (16, resume).

No icon font, no icon library, no emoji, no unicode glyph icons. Any further icon must follow the same 1px-stroke grammar; do not import a library set.

## INDEX

- `styles.css` — global CSS entry (imports everything below)
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `fonts.css`, `base.css`, `fig/fig-tokens.css` (raw Figma variables)
- `assets/` — arrows, footer mark
- `guidelines/` — foundation specimen cards (Design System tab)
- `components/core/` — PillButton, ArrowLink, NavLink, ThemeToggle, LangSwitcher
- `components/site/` — SiteHeader, SiteFooter, WorkCard, MetaList
- `ui_kits/portfolio/` — interactive site recreation (Landing → Work → Project → About)
- `SKILL.md` — agent skill entry point

## CAVEATS

- Spoqa Han Sans Neo is the single project typeface (per the author) — self-hosted woff2 (400/500/700) in `assets/fonts/`. M PLUS 2 / Gothic A1 appear in some Figma wireframes but were removed from the system on request.
- The Figma "Spacing" collection's `Easing` variable value could not be extracted; `--easing` is a standard quiet curve pending confirmation.
- Landing wireframe has conflicting nav sizes ("Work" 100px vs "About" 28px) — treated 28px as intent, hero at 112px.
- PAF reference frames (recreations of postarchivefaction.com) were used for interaction patterns only; their product imagery and people-name content were not copied.
