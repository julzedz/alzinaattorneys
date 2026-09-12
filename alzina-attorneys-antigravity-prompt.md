# ALZINA ATTORNEYS — WEBSITE BUILD SPEC

**Two things to confirm before Antigravity starts (flagging, not blocking):**
1. The consultation-form destination email was given as `edoziechukwuma216@gmail` — this is missing the domain. Confirm it should be `edoziechukwuma216@gmail.com` before wiring Formspree.

## 1. PROJECT OVERVIEW

**Client:** Alzina Attorneys (referred to in places as "Alzina Chambers")
**Type:** Corporate/commercial law firm marketing website
**Tone:** Authoritative, prestigious, understated luxury — think white-shoe law firm, not a flashy startup. Reference sites for structural/tonal inspiration: aelex.com and aluko-oyebode.com (do not copy their content, layout code, or imagery — use only as a tone/structure reference).
**Core requirement:** Full light/dark mode, cinematic scroll-driven animation, buttery smooth scrolling, and a strong conversion path to WhatsApp and a consultation form.



## 2. TECH STACK

Confirm these are installed in the existing scaffold; install what's missing:

```
npm install motion gsap @studio-freight/lenis embla-carousel-react embla-carousel-autoplay react-router-dom @formspree/react clsx
npm install -D tailwindcss postcss autoprefixer @tailwindcss/typography sharp
```

- **Styling:** Tailwind CSS (utility-first, no separate CSS files except a minimal `globals.css` for CSS variables/fonts).
- **Micro-interactions & UI transitions:** Motion (Framer Motion's new package name — import from `"motion/react"`).
- **Complex sequenced/scroll animation:** GSAP + ScrollTrigger for hero sequencing, scroll-reveals, pinning, and text splitting/reveal effects.
- **Smooth scrolling:** Lenis, driven by GSAP's ticker (see Section 7.1 for the exact wiring — this is the most common integration mistake and must be done correctly).
- **Carousel:** Embla Carousel + the Autoplay plugin for the hero, enhanced with Motion/GSAP crossfade or Ken-Burns effects on slide transition.
- **Routing:** React Router v6+.
- **Forms:** Formspree via `@formspree/react` (`useForm` hook).
- **Image processing:** `sharp` (Node) run once as a build/prep script — not a runtime dependency in the bundle.

---

## 3. DESIGN SYSTEM

### 3.1 Colour palette (white + oxblood, both themes)

Define as CSS variables in `globals.css` and mirror in `tailwind.config` under `theme.extend.colors`, so both raw CSS and Tailwind utilities (`bg-oxblood-600`, `text-ink`, etc.) work.

```css
:root {
  /* Oxblood scale */
  --oxblood-50:  #FBF3F3;
  --oxblood-100: #F1DADA;
  --oxblood-300: #C77A7A;
  --oxblood-500: #8A2E2E;
  --oxblood-600: #6B1F1F;   /* primary brand oxblood */
  --oxblood-700: #4A0E0E;   /* deep oxblood — headings, dark surfaces */
  --oxblood-900: #2B0606;

  /* Light theme */
  --bg: #FFFFFF;
  --bg-subtle: #FAF7F6;
  --ink: #1A1414;
  --ink-muted: #5C4F4F;
  --border: #EAE0DE;
  --accent: var(--oxblood-600);
}

[data-theme="dark"] {
  --bg: #120707;
  --bg-subtle: #1C0D0D;
  --ink: #F5EDEC;
  --ink-muted: #C9B7B5;
  --border: #3A1C1C;
  --accent: var(--oxblood-300);
}
```

- Never use pure black (`#000`) in dark mode — always the oxblood-tinted near-black (`#120707`) so the theme feels intentional, not a generic dark-mode toggle.
- Accent/CTA buttons: oxblood fill with white text in light mode; oxblood-300 fill with near-black text (or oxblood-outline/ghost) in dark mode, for contrast.
- Typography colour: near-black ink on white; warm off-white ink on oxblood-black in dark mode. Never full white-on-white or grey-on-grey — keep contrast ratios ≥ 4.5:1 (WCAG AA) at all times, check both themes.

### 3.2 Typography

- Headings: a serif with legal/editorial gravitas (e.g. "Fraunces", "Canela"-alike, or "Playfair Display" from Google Fonts — pick one, self-host via `@fontsource` rather than a runtime Google Fonts request, for performance).
- Body: a clean grotesk/sans (e.g. "Inter" or "Neue Haas"-alike — "Inter" via `@fontsource/inter`).
- Set a fluid type scale with `clamp()` for headings so the hero headline scales smoothly across breakpoints instead of jumping at fixed breakpoints.

### 3.3 Theme toggle mechanics

- Implement via a `data-theme` attribute on `<html>`, a `ThemeContext`, and `localStorage` persistence, defaulting to the user's OS `prefers-color-scheme`.
- Toggle button: animate the icon swap (sun/moon) with Motion (`AnimatePresence` + rotate/fade), not a hard cut.
- **Logo swap:** the site header/footer logo component reads the current theme and swaps the `<img src>` between the light-mode logo asset and the dark-mode logo asset. No image should ever visually "fight" its background — see Section 4 for the asset prep that makes this possible.

---

## 4. ASSET PIPELINE (run before any component work)

The `src/assets` folder currently has JPG logos (light + dark variants) and other JPG photography. Do the following as a one-time prep pass, ideally as an npm script (`npm run optimize-assets`) using `sharp`, so it's repeatable if new assets are dropped in later.

### 4.1 Logos
1. Remove the background from both the light-mode and dark-mode logo JPGs so they composite cleanly onto either theme's background colour. Background removal needs an alpha-capable tool — `sharp` alone cannot do AI background removal, so use one of:
   - A local tool/CLI such as `rembg` (Python) or `@imgly/background-removal-node` (Node) run once during the prep script, or
   - If Antigravity has image-editing/AI tooling available in its own environment, do the cutout there and save the result.
2. Export the cutout as **PNG with alpha transparency** (logos need true transparency, not a format that fakes it), then also produce a **WebP with alpha** version for the actual `<img>` tag (smaller, still transparent), with the PNG kept only as a fallback/source-of-truth.
3. Naming convention: `logo-light.webp` (dark-coloured logo for use on light backgrounds), `logo-dark.webp` (light/white-coloured logo for use on dark backgrounds) — name by "which background it's designed to sit on," not by "which theme it appears in," and keep this convention consistent everywhere it's referenced in code.
4. Generate a favicon set (`favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`) from the cleaned-up mark/emblem portion of the logo if it has one, otherwise from a simplified monogram.

### 4.2 All other JPG photography in `src/assets`
1. Convert every JPG to **WebP** (with AVIF as a bonus/stretch if the pipeline supports `<picture>` with multiple `<source>`s — WebP alone is an acceptable minimum).
2. Resize to sensible max dimensions before compressing (no image should ship larger than its largest real render size — e.g. hero images capped around 2000px wide, headshots around 800px wide) — don't just recompress at original resolution.
3. Compress at a quality setting around 75–82 for WebP (visually lossless for photography at that setting, meaningfully smaller than JPG).
4. Generate at least two sizes per image that's used responsively (e.g. a mobile width and a desktop width) and serve via `srcset`/`sizes` or a `<picture>` element, so mobile doesn't download desktop-sized hero images.
5. Keep original JPGs untouched in a `src/assets/_originals` (or similar) folder rather than deleting them, in case a re-export at different settings is needed later.

### 4.3 Principal's photo specifically
- Treat as the most important image asset on the site (used in hero carousel AND About page). Export at higher quality than general photography, and if the source photo has a busy or inconsistent background, consider a subtle desaturated/oxblood-duotone treatment behind it for brand cohesion — optional but worth proposing.

---

## 5. SITE ARCHITECTURE

Primary navigation (sticky header, shrinks on scroll via Motion/GSAP):

1. **Home** (`/`)
2. **About Us** (`/about`)
3. **Practice Areas** (`/practice-areas`) — with individual anchor sections or sub-routes per area
4. **Insights** (`/insights`) — optional but recommended, see Section 9
5. **Contact** (`/contact`)

Footer (present on every page): logo (theme-aware), short firm blurb, nav links, practice-area links, address, phone/WhatsApp, email, social icons (LinkedIn at minimum for a law firm), copyright, and a discreet "Site by Jules Edozie(www.github.com/julzedz)" line.

Global persistent elements:
- Floating WhatsApp action button (bottom-right, all pages) — see Section 8.3.
- Theme toggle (header).
- Back-to-top button (appears after scrolling past hero).
- A tasteful preloader/intro animation on first load only (logo mark draws in or fades, ~800ms–1.2s max, skip on repeat visits via sessionStorage) — sets the "premium" tone immediately.

---

## 6. PAGE-BY-PAGE SPEC

### 6.1 Home (`/`)

**Hero — autoplay carousel (Embla + Autoplay plugin):**
- 3 slides, autoplay every ~6s, pausable on hover/focus and on manual interaction, with prev/next controls and dot indicators.
- Slide 1 & 2: firm/office/courtroom-adjacent imagery (from the optimized asset set).
- Slide 3 (or slide 1 — pick the strongest): the principal's photo, paired with a short pull-quote or their name/title overlay.
- Each slide: full-bleed image with an oxblood gradient scrim (darker at the bottom or side where text sits, for contrast in both themes) + headline + one-line supporting copy + primary CTA ("Book a Consultation" → `/contact#consultation`) + secondary CTA ("Our Practice Areas" → `/practice-areas`).
- Animation: crossfade between slides via Motion `AnimatePresence`, plus a slow Ken-Burns (subtle scale from 1.0 → 1.05) on the active slide's image driven by GSAP or Motion `animate()`, so slides feel alive even before autoplay advances. Text content should animate in (staggered fade/slide-up) each time the slide becomes active, not sit static.

**Below the fold, in order:**
1. **Firm intro strip** — one or two sentences of positioning statement + a stat row (e.g. years of practice, number of practice areas, number of partners) that count up into view (GSAP ScrollTrigger-triggered number animation).
2. **Practice areas grid** — cards for the full list below (Section 6.2 content), each revealing with a staggered scroll-triggered fade/slide (GSAP ScrollTrigger, `stagger`), linking through to `/practice-areas`.
3. **Principal/leadership teaser** — photo + name + title + a one-line bio snippet, "Meet the Team" CTA → `/about`.
4. **Why Alzina / values strip** — 3–4 short value props (e.g. "Commercial pragmatism", "Cross-border capability", "Client-first counsel") in an icon+text grid.
5. **CTA banner** — full-width oxblood band, white text, "Ready to discuss your matter?" + button to `/contact`.

### 6.2 Practice Areas (`/practice-areas`)

Use the firm's own description as the source list — present each as its own card/section with a short (2–3 sentence) description you compose in a professional legal-marketing tone (do not fabricate specific claims like "we've handled $X in deals" — keep descriptions generic-professional since no case data was supplied):

- Project Finance
- Litigation & Arbitration
- Agriculture
- Capital Market & Securities Law
- Power
- Tax Law
- International Trade Law
- Securities Law
- Banking & Finance Law
- Aviation Law
- Maritime Law
- Intellectual Property Law
- Technology Law
- Telecommunications Law
- Media & Entertainment
- Financial Technology (FinTech)

Layout: a filterable/searchable grid or an accordion list (accordion works well if descriptions run long); each item expands or links to an anchor with its full description. Each card entrance staggered on scroll (GSAP), hover state lifts the card slightly with a soft oxblood-tinted shadow (Motion `whileHover`).

### 6.3 About Us (`/about`)

- Firm history/positioning narrative (2–4 short paragraphs — write in a confident, understated tone; do not invent a founding year or specific historical claims that weren't provided — keep it generic ("Alzina Attorneys was established to provide...") unless the user supplies real firm history).
- **Principal profile section:** principal's photo (the optimized asset), name(Paschal Alzina, Esq.), title, a short bio paragraph, and optionally credentials/bar admissions as a bullet list (leave as clearly-marked placeholder bullets — `[Add bar admission]`, `[Add year called to bar]` — since none were supplied, so Antigravity doesn't fabricate credentials).
- Optional: supporting team/associates grid below the principal (photo, name, title) — build the component so it's easy to add more people later even if only the principal's data exists today.
- Values/approach section reusing or extending the homepage's value props with more depth.

### 6.4 Contact (`/contact`)

Two-column layout on desktop (stacked on mobile):

**Left column — details:**
- Address: **60 Old Market Road, Onitsha**
- Phone/WhatsApp button (see 8.3)
- Email address (use the same firm email as the form destination once confirmed)
- Office hours - 9 am to 5 pm. Monday to Fridays.
- Embedded Google Map, centered on **lat 6.1521833, lng 6.7826203** (see 8.2 for embed approach)

**Right column — consultation form** (`id="consultation"` so the homepage CTA can deep-link to it):
- Fields: Full Name, Email Address, Subject/Title of Legal Issue, Message (textarea — "Describe your legal issue").
- Placeholders use real-sounding Nigerian Igbo names/context instead of "John Doe", e.g.:
  - Name field placeholder: `"e.g. Chiamaka Okonkwo"`
  - Email field placeholder: `"e.g. chi.okonkwo@gmail.com"`
  - Subject field placeholder: `"e.g. Commercial lease dispute"`
  - Message field placeholder: `"e.g. I need advice on a breach of contract relating to a supply agreement..."`
- Submits via Formspree (`@formspree/react` `useForm`), destination email to be confirmed (Section 0).
- On success: inline confirmation state (not just an alert) — "Thank you, [name]. We'll be in touch within 1 business day." with a subtle Motion success animation (checkmark draw-in).
- Client-side validation (required fields, email format) before submit; disable the submit button and show a loading state during submission.

### 6.5 Insights / Articles (optional, recommended) (`/insights`)

Law firm sites in this tier (see aelex.com, aluko-oyebode.com) almost always have a thought-leadership section — it materially helps credibility and SEO. Recommend adding a simple static insights grid (title, date, practice-area tag, excerpt) even with 2–3 placeholder articles clearly marked as `[Sample article — replace with real content]`, wired to render from a local JSON/MDX collection so real content can be dropped in later without touching layout code.

### 6.6 404 page

On-brand 404 (oxblood, firm tone — "This page has left the jurisdiction" or similar light touch) with a link home.

---

## 7. ANIMATION PLAN

### 7.1 Lenis + GSAP wiring (do this exactly — the most common source of bugs)

```js
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({ duration: 1.1, smoothWheel: true })

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)
```

- Do **not** run Lenis's own `requestAnimationFrame` loop alongside GSAP's ticker — pick GSAP's ticker as the single driver (as above) so ScrollTrigger and Lenis stay in sync; running both independently causes jitter.
- Respect `prefers-reduced-motion`: if set, skip Lenis entirely (fall back to native scroll) and shorten/disable non-essential GSAP/Motion animations (keep only opacity fades, drop parallax/scale/pin effects).

### 7.2 Where GSAP (ScrollTrigger) does the heavy lifting
- Hero text sequencing on load (split headline into lines/words, stagger reveal).
- Section-by-section scroll reveals (fade + slight y-translate on entry, `once: true` so it doesn't feel repetitive on scroll-back).
- Practice-area card stagger grids.
- Stat counters (trigger count-up on enter).
- Optional: a pinned section on the About page where the principal's photo stays fixed while bio text scrolls past it.

### 7.3 Where Motion does the lifting
- All discrete UI state transitions: theme toggle icon, mobile nav open/close, form success state, button hover/tap micro-interactions, modal/drawer transitions, page-route transitions (`AnimatePresence` wrapping the router outlet for a subtle cross-fade between pages).
- Hero carousel slide crossfades (paired with Embla's index state).

### 7.4 Where Embla does the lifting
- The hero carousel mechanics (drag, autoplay, indices) — let it own slide state; Motion/GSAP only handle the *visual* transition layered on top, not the slide logic itself.

---

## 8. INTEGRATIONS

### 8.1 Formspree
- Create/confirm a Formspree form endpoint tied to the (confirmed) destination email.
- Use `@formspree/react`'s `useForm(formId)` hook; do not roll a custom fetch unless Formspree's hook proves insufficient.
- Include a honeypot or Formspree's built-in spam filtering to cut down on junk submissions to a public-facing legal inquiry form.

### 8.2 Google Map embed
- Simplest robust approach requiring no API key: an `<iframe>` Google Maps embed URL centered on the coordinates, e.g.:
```html
<iframe
  src="https://www.google.com/maps?q=6.1521833,6.7826203&z=16&output=embed"
  width="100%" height="100%" style="border:0" loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="Alzina Attorneys Onitsha">
</iframe>
```
- Wrap in a responsive aspect-ratio container (`aspect-[16/10]` or similar via Tailwind) so it scales cleanly.
- If a richer, styleable map is preferred later (custom oxblood-tinted map skin), that requires the Google Maps JavaScript API + a billing-enabled API key — flag this as a possible v2 upgrade rather than building it now, since it adds a paid dependency.

### 8.3 WhatsApp button
- Persistent floating action button, all pages, using the standard WhatsApp deep link:
```
https://wa.me/2348032283805?text=<url-encoded message>
```
- default message: `"Hello Alzina Attorneys, I would like to schedule a consultation."` .
- Icon-only circular button in oxblood with the WhatsApp glyph, subtle pulse/breathing animation (Motion, looping scale 1→1.05→1, respecting reduced-motion).

---

## 9. ADDITIONAL FEATURES WORTH ADDING (recommended, not mandatory)

- **SEO fundamentals:** per-page `<title>`/meta description via `react-helmet-async` (or the router's built-in meta support if using a meta-framework), Open Graph tags with a firm image, a `sitemap.xml` and `robots.txt`.
- **Structured data:** `LegalService`/`Attorney` JSON-LD schema on the homepage and About page for better search presentation.
- **Cookie/consent notice:** a minimal, dismissible banner if any analytics are added later.
- **Analytics:** placeholder hook-up point for a privacy-respecting analytics tool (Plausible/Fathom) rather than wiring anything without the client's say-so.
- **Accessibility pass:** keyboard-navigable carousel and mobile nav, visible focus states in both themes, `alt` text on every image (especially the principal's photo and practice-area icons), form labels properly associated (not placeholder-only).
- **Performance budget:** lazy-load below-the-fold images (`loading="lazy"`), code-split routes (`React.lazy` + `Suspense`), and defer non-critical GSAP plugin registration until needed.
- **Careers page** (`/careers`) — common on firm sites of this caliber, even if just "email your CV to..." for now.
- **Newsletter/updates signup** — could reuse the Formspree pattern with a second form ID, placed in the footer.
- Do not use glassmorphism.

---

## 10. BUILD ORDER (suggested execution sequence for Antigravity)

1. Tailwind config + CSS variables + font setup (Section 3).
2. Asset optimization script and run it once (Section 4) — do this early so every component built afterward references final filenames.
3. Theme context/provider + toggle component + logo-swap component.
4. Global layout: header/nav, footer, WhatsApp FAB, back-to-top, preloader.
5. Lenis + GSAP ticker wiring at the app root (Section 7.1) before building any scroll-triggered component, so every subsequent animation is testable against real smooth scroll.
6. Router setup with route-level transition wrapper (Motion `AnimatePresence`).
7. Home page: hero carousel first (highest-risk/most complex component), then the below-fold sections in order.
8. Practice Areas page.
9. About page.
10. Contact page: layout + map embed first, then wire Formspree last (once the destination email is confirmed).
11. Insights, Careers, 404 (if included).
12. Accessibility + performance + reduced-motion pass across the whole site.
13. Final cross-browser/theme/device QA pass: toggle dark/light on every page, resize through breakpoints, test carousel touch/swipe, test WhatsApp link on mobile, test form submission end-to-end.

---

## 11. OPEN QUESTIONS FOR THE CLIENT (surface these, don't silently guess)

- Real firm history/founding details for the About page (currently generic placeholder copy).
- Principal's full name, title, credentials/bar admissions for the About page and hero overlay.
- Whether a real logo mark/monogram exists for favicon generation, or whether one should be derived from the wordmark.


