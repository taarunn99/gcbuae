# GCB-OE

Website for **Global Classic Building Materials** — a building materials
trading company operating in the UAE.

## Stack

| Concern        | Choice                                  |
| -------------- | --------------------------------------- |
| Framework      | Next.js 16 (App Router, Turbopack)      |
| Language       | TypeScript, React 19                    |
| Styling        | Tailwind CSS v4 (CSS-first `@theme`)    |
| Animation      | GSAP 3 + `@gsap/react`                  |
| UI transitions | Motion (`motion/react`)                 |
| Smooth scroll  | Lenis, driven by the GSAP ticker        |

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

The site runs at http://localhost:3000.

## Scripts

| Script                 | Does                                  |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | Dev server (Turbopack)                |
| `npm run build`        | Production build                      |
| `npm run start`        | Serve the production build            |
| `npm run typecheck`    | `tsc --noEmit`                        |
| `npm run lint`         | ESLint                                |
| `npm run format`       | Prettier, with Tailwind class sorting |

> `next lint` was removed in Next.js 16 — ESLint is invoked directly, and
> `next build` no longer lints. Run `npm run lint` yourself in CI.

## Layout

```
src/
├── app/            Routes, layouts, global CSS
├── components/
│   ├── motion/     Reusable GSAP + Motion animation primitives
│   ├── seo/        Structured data
│   └── ui/         Presentational building blocks
├── config/         site.ts — company details, single source of truth
├── hooks/          Shared React hooks
├── lib/            gsap.ts (plugin registration), motion.ts (variants), utils.ts
└── providers/      SmoothScrollProvider (Lenis ↔ GSAP ticker)
```

## Animation architecture

GSAP and Motion split by responsibility rather than overlapping:

- **GSAP** — scroll-driven sequences, pinning, timelines, `SplitText` reveals.
  All plugins (`ScrollTrigger`, `SplitText`, `Flip`, `DrawSVG`, …) are free as
  of GSAP 3.13 and registered centrally in `src/lib/gsap.ts`. **Always import
  `gsap` from `@/lib/gsap`** — importing from `"gsap"` gives you an instance
  without the plugins.
- **Motion** — component enter/exit, hover and layout transitions, via the
  shared variants in `src/lib/motion.ts`.
- **Lenis** — smooth scrolling, stepped by the GSAP ticker inside
  `SmoothScrollProvider` so scroll position and ScrollTrigger stay on one
  frame. It disables itself when the visitor prefers reduced motion.

Easing curves and durations are defined once in each library's module and kept
numerically identical across the two.

## Design status

The current home page is a **placeholder** that exercises the animation stack
end to end. Colour, typography and spacing tokens in `src/app/globals.css` are
neutral stand-ins pending the design direction.
