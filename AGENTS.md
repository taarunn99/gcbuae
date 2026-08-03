<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# GCB-OE — project conventions

Marketing site for Global Classic Building Materials (GCB), a UAE building
materials trading company.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 ·
GSAP (animation) · Motion (React animation) · Lenis (smooth scroll).

## Animation rules

- **Import GSAP from `@/lib/gsap`, never from `"gsap"` directly.** That module
  registers the plugins and the custom eases; a direct import gets an
  unregistered instance and ScrollTrigger will silently do nothing.
- GSAP handles timelines, pinning, scroll-driven sequences and text splitting.
  Motion handles component-level state transitions, enter/exit, and layout
  animation. Don't animate the same property with both.
- Easings and durations live in `@/lib/gsap` (`ease`, `duration`) and
  `@/lib/motion` (`EASE`, `DURATION`) and are kept numerically identical, so a
  GSAP timeline and a Motion component on the same screen match.
- Lenis is driven by the GSAP ticker in `SmoothScrollProvider` — do not add a
  second `requestAnimationFrame` loop, and do not enable Lenis's `autoRaf`.
- Every animated component needs `"use client"`. `next/dynamic` with
  `ssr: false` only works from inside a file that is already a Client
  Component.
- Respect `prefers-reduced-motion`; `useReducedMotion` in `@/hooks` is the hook,
  and `globals.css` already neutralises CSS transitions.

## Styling

- Design tokens are CSS custom properties in `src/app/globals.css`, exposed to
  Tailwind through the `@theme inline` block. Change colour, type and spacing
  there — not with hard-coded hex values in components.
- The tokens currently in the file are **placeholders** pending design
  direction.
- Use the `.container-gcb` utility (or the `Container` component) for page
  gutters rather than re-declaring max-widths.

## Conventions

- Path alias `@/*` maps to `src/*`.
- Files are kebab-case; React components are PascalCase named exports.
- Company details (name, contact, address, nav) come from `@/config/site` so
  metadata, structured data and the footer never drift apart.

## Checks before committing

```bash
npm run typecheck && npm run lint && npm run build
```
