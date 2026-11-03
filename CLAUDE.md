# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site for Azka Miftah Muhammad. Next.js 14 (App Router), React 18, TypeScript (strict), Tailwind CSS 3, `motion` (Framer Motion) for scroll-driven animation, and `lenis` for smooth scrolling. Single-page layout; there is no backend, API, or database.

## Commands

```bash
npm run dev     # dev server at http://localhost:3000
npm run build   # production build (this is what CI runs; use it to type-check)
npm run lint    # next lint (extends next/core-web-vitals)
```

There is no test suite. Stop the dev server before running `npm run build`: both write to `.next/`, and on Windows the build fails with `EPERM ... .next\trace` while dev is running.

## Deployment

`.github/workflows/deploy.yml` builds and deploys to Vercel (`vercel --prod`) on **every push to `master`**. Pushing to master is a production release. `@vercel/analytics` is mounted in `src/app/page.tsx`.

## Architecture

- `src/app/layout.tsx` loads the Archivo variable font (with the `wdth` axis, exposed as `--font-archivo`) and wraps the page in `SmoothScroll` (Lenis), `Navbar`, and `Footer`.
- `src/app/page.tsx` composes the home sections from `src/components/home/` in order: `Hero` (`#home`) → `About` → `Stack` → `Projects` → `Experiences` (`#experience`) → `Contact`.
- `src/app/dashboard` and `src/app/test-color` are leftover scratch routes, not part of the real site.
- Path alias `@/*` → `src/*`.

### Content

- `src/data/services.json` (shown in the Stack section), `projects.json`, and `experiences.json` are imported directly into components. Edit these files to change site content, not the components.
- `src/data/contact.ts` is the single source for the phone number and social links, which are used by both `Contact` and `Footer`.
- In `projects.json`, an empty `desc` hides the description. An empty `image` renders a typographic cover instead of a picture, and a non-empty `url` adds a "Visit" link.
- Images live in `public/img/` and `public/logo/`.

### Navbar ↔ section ids

`SECTIONS` in `src/components/layouts/navbar.tsx` lists the section ids. It drives both the menu links and the active-section highlight (via IntersectionObserver). Adding, renaming, or removing a section means updating `SECTIONS` too. Links are plain `href="#id"` anchors, and Lenis (`anchors` option) turns them into smooth scrolls.

### Scroll animation pattern

Every animated section uses the same pattern:

1. A tall outer `<section>` (for example `h-[250svh]`) contains a `sticky top-0 h-svh` inner panel.
2. `useScroll({ target, offset: ["start start", "end end"] })` gives a 0→1 progress value for the pinned stretch.
3. That progress is mapped to styles with `useTransform`.

Section-specific details:

- **Hero:** passes progress into CSS as the `--open` variable. `.hero-photo` in `globals.css` interpolates the photo's size, position, and radius from that variable. The `.hero-photo` element owns the CSS `transform`, so any motion transforms must go on inner wrappers.
- **Projects:** measures the track width with a ResizeObserver and sets the section height to `100svh + overflow`, which turns vertical scroll into horizontal movement.
- **Experiences:** each role reports itself through `useInView` (middle of the viewport) to swap the sticky left panel.

**Gotcha:** for `opacity` driven by scroll, use `useRange` from `src/components/hooks/useRange.ts`, not the array form of `useTransform`. motion hands array-form opacity to a native ScrollTimeline, which mis-measures these sticky sections and leaves the value stuck near 0.

**Reduced motion:** each section checks `useReducedMotion()` and falls back to a static, non-pinned layout. `SmoothScroll` disables Lenis in that case. Keep these fallbacks when adding sections.

### Styling

- Color tokens are defined in `tailwind.config.ts`:
  - `ink` (#0B1215): text and dark sections
  - `paper` (#F6F6F6): light background
  - `signal` (#FFD23F): brand yellow, used for fills and accents and never as text on paper, because the contrast is too low
  - `graphite`: secondary text on paper
  - `mist`: secondary text on ink
- Large headings use the `.display` class (weight 800, tight leading), with width set through `[font-variation-settings:'wdth'_N]`.
- Icons come from `lucide-react`. Social icons in the footer are inline SVGs.

### Shared UI (`src/components/utility/`)

- **`MainButton`**: a link-button with the owner's "loading bar" hover, where a fill slides in from the left. It depends on the `.hover-animate` / `.custom-ease-in` classes in `globals.css`.
  - Variants: `solid` and `outline` for light or yellow backgrounds, `signal` for dark ones.
  - Use it for CTAs instead of hand-styled `<a>` tags.
- **`TiltCard` + `Depth`**: a 3D card that tilts toward the mouse with spring physics and lifts on hover. It also renders a glare highlight and a layered `boxShadow` that shifts opposite the tilt.
  - Props: `shadow="light" | "dark"` matches the section background, and `glow="r g b"` adds a coloured halo.
  - Wrap children in `<Depth z={n}>` to float them above the surface. Intermediate wrappers need `[transform-style:preserve-3d]`.
  - Don't put `overflow-hidden` on the `TiltCard` itself, because it flattens the 3D. Clip an inner absolute layer instead, as the Projects cover does.
  - Touch input and reduced-motion users get a static card.
