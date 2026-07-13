# Xai — Intelligence Workspace

A single-page product concept site built around the narrative **raw data → structured intelligence → actionable insight → AI automations**, expressed through motion, geometry, and an interactive product-workspace mockup.

Live structure: **Hero → Insight Flow → Intelligence Dashboard → Signature Moment ("The Core") → Footer.**

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** — design tokens defined once in `src/app/globals.css` (`@theme`)
- **Framer Motion** — page-load choreography, tab transitions, hover/entrance micro-interactions
- **GSAP + ScrollTrigger** — the pinned, horizontally-scrolling 3-stage Insight Flow section
- **React Three Fiber / Three.js** — two real WebGL scenes:
  - `hero/ParticleField.tsx` — ~2,600 particles that morph from a scattered cloud into a structured grid as you scroll the hero, with cursor-based rotation
  - `signature/CoreField.tsx` — the "wow moment": ~1,800 particles that self-organize from noise into a torus around a wireframe icosahedron core, with mouse-driven parallax
- **Recharts** — the area chart and signal-mix bars inside the dashboard mock
- **lucide-react** — iconography

No backend. All data in `src/components/dashboard/data.ts` is mock/static, as specified.

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run start     # serve the production build
npm run lint
```

Requires network access to Google Fonts at runtime (`Space Grotesk`, `Inter`, `IBM Plex Mono` are loaded via a `<link>` tag in `src/app/layout.tsx` rather than `next/font/google`, so the build itself never needs to reach the internet — only the browser does, same as any normal Google Fonts embed).

## Structure

```
src/
  app/
    layout.tsx        Root layout, fonts, metadata
    page.tsx           Assembles the single page
    globals.css         Design tokens, keyframes, base styles
  components/
    layout/            Nav, Footer
    hero/               Hero copy + ParticleField (R3F)
    insight-flow/       GSAP ScrollTrigger pinned 3-stage section + 3 SVG stage graphics
    dashboard/          Sidebar, Overview/Signals/Automations panels, mock data
    signature/          "The Core" — signature R3F moment
  lib/utils.ts          cn() className helper
```

Every animated section reads its scroll progress off a `ref` (not React state) and drives Three.js/GSAP imperatively, so the particle systems run at 60fps without triggering React re-renders per frame.

## Design system (in place of a Figma file)

This delivery is code-first: an AI assistant doesn't have write access to Figma, so instead of a `.fig` file, `DESIGN-TOKENS.md` documents the full token system (color, type, spacing, components with variants) exactly as it's implemented in code, so it can be rebuilt in Figma using Auto Layout, Variables, and Components/Variants in under an hour by pointing a designer at that doc + the live build. Every value in it maps 1:1 to `globals.css` and the component files.

## Notes / next steps

- Reduced-motion is respected globally (`prefers-reduced-motion`) — animation durations collapse to ~0.
- Desktop-first, responsive down to mobile (single-column stacking on Hero, Dashboard, and Footer; Insight Flow keeps its horizontal scroll but with a narrower panel width on small screens).
- The dashboard is a static mock, per the brief — no real auth, data, or backend.
