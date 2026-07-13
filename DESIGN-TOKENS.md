# Xai — Design Tokens & Figma Handoff

I can't generate an actual binary `.fig` file from this environment — Figma has no API surface for creating files from a headless tool. What's below is the full token + component system exactly as implemented in code, structured so it can be rebuilt in Figma in under an hour: create these as **Variables** (color, spacing, type), **Text Styles**, and **Components with variants**, then apply them across four Auto Layout frames matching the four page sections. Every value here maps 1:1 to `src/app/globals.css` and the component files, so the live build is the source of truth if anything is ambiguous.

## 1. Color

| Token | Hex | Use |
|---|---|---|
| `void` | `#08090D` | Page background |
| `base` | `#0B0C12` | Section background (Insight Flow, Dashboard, Footer) |
| `panel` | `#12141C` | Cards, sidebar, dashboard chrome |
| `panel-alt` | `#191C27` | Active/hover state fill inside panels |
| `border-soft` | `#262837` | Visible borders (cards, nav pill) |
| `border-hair` | `#1C1E2A` | Hairline dividers |
| `text-primary` | `#F2F3F8` | Headlines, primary text |
| `text-muted` | `#8B8EA3` | Body copy, secondary labels |
| `text-faint` | `#565A70` | Captions, timestamps, disabled |
| `indigo` (accent 1) | `#6C7CFF` | Primary accent — data, raw state, links |
| `indigo-dim` | `#4A52A8` | Secondary chart series |
| `cyan` (accent 2) | `#4FE8C8` | Structured/insight state, active nav, success |
| `amber` (accent 3) | `#FFB454` | Automation/action accent — used sparingly |

Palette logic: near-black navy (not pure black, not the generic AI-cliché near-black-with-vermilion) with a two-color accent system — **indigo = raw/incoming data**, **cyan = structured/resolved intelligence**. The gradient from indigo → cyan is the recurring visual metaphor for "data becoming intelligence" and appears in the hero headline, the insight-flow divider lines, and the dashboard chart. Amber is reserved for automation/action moments only, so it stays meaningful.

## 2. Typography

| Role | Family | Notes |
|---|---|---|
| Display | **Space Grotesk** (500/600/700) | Headlines only. Geometric, technical character — distinct from the generic serif/grotesk default. Set large (7–13vw on mobile scaling to 3–5.6vw desktop) with tight tracking. |
| Body | **Inter** (400/500/600) | Paragraph copy, UI labels, buttons. |
| Mono | **IBM Plex Mono** (400/500) | Eyebrows, timestamps, data values, nav links, badges — anything that reads as "system output" rather than editorial copy. Always uppercase + wide tracking (`0.1–0.2em`) when used as a label. |

Type scale (desktop): Hero H1 ~72–96px / Section H2 ~44–56px / Card H3 ~19px / Body ~14–16px / Caption/mono ~10.5–12px.

## 3. Spacing & layout

- Base unit: **4px**, most spacing on the 8px grid (8/12/16/24/32/40/64/96).
- Max content width: **1400px** (nav/footer), **1160px** (dashboard card).
- Section vertical rhythm: **112–160px** padding between major sections on desktop, collapsing to 64px on mobile.
- Radius scale: **8px** (inputs, badges) / **12px** (cards) / **16px** (dashboard window) — never fully round except icon chips and pills.
- Border weight: **1px hairline** everywhere; no heavy strokes.

## 4. Components (build these as Figma components w/ variants)

- **Nav pill button** — variants: default / hover
- **Badge / status pill** — variants: `ready` (cyan), `reviewing` (amber), `active` (cyan), `paused` (faint)
- **Stat card** — icon chip + big number + label + delta, variants: default / hover
- **Sidebar nav item** — variants: default / active (with the sliding active-pill treatment — in Figma, use one shared background component moved via smart-animate between variants)
- **Dashboard window chrome** — traffic-light dots + url bar, single component reused across all 3 tab states
- **Insight table row** — variants: `ready` / `reviewing`
- **Stage graphic frame** — the 3 SVG stage illustrations (Ingest / Analyze / Generate) as fixed 300–360px square frames, reusable as a component with a swappable icon slot

## 5. Signature element

The recurring visual signature across the whole page is **particles resolving into geometry**: scattered points → grid (hero), and scattered points → torus around a wireframe icosahedron (closing "Core" section). In Figma, represent this as a 3-frame flipbook (scattered → mid → resolved) inside each relevant section using the same dot component, so stakeholders can see the intended motion arc even in a static file.

## 6. Motion notes for handoff

- Standard ease: `cubic-bezier(0.16, 1, 0.3, 1)` ("expo-out") for nearly all entrance motion.
- Entrance durations: 0.4–0.8s; stagger children by ~0.06–0.09s.
- Respect `prefers-reduced-motion` — this is implemented globally in code and should be called out as a requirement to any designer/dev extending the file.
