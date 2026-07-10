# Rayna Tours — Dubai Tourism Website

A complete, production-ready Dubai tourism website for Rayna Tours with a classic luxury aesthetic.

## Run & Operate

- `pnpm --filter @workspace/rayna-tours run dev` — run the frontend (port auto-assigned)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Wouter + TanStack Query + Tailwind CSS v4 + Framer Motion
- API: Express 5
- DB: PostgreSQL + Drizzle ORM (enquiries table)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/rayna-tours/src/pages/` — all page components (home, dubai-holidays, activity-page, about, contact, gallery)
- `artifacts/rayna-tours/src/components/` — layout, animations, booking-form, header, footer, WhatsApp button
- `artifacts/api-server/src/data/packages.ts` — **central data file: all tour packages, activities, testimonials with prices**
- `artifacts/api-server/src/routes/packages.ts` — packages/activities/testimonials API routes
- `artifacts/api-server/src/routes/enquiries.ts` — booking enquiry submit/list routes
- `lib/api-spec/openapi.yaml` — API contract (source of truth)
- `attached_assets/generated_images/` — AI-generated hero/activity images

## Pages

- `/` — Home: hero slider, booking bar, activities grid, featured packages, testimonials carousel, newsletter, footer
- `/dubai-holidays` — Holiday packages listing
- `/desert-safari`, `/water-activities`, `/skydiving`, `/car-rental`, `/city-tour`, `/burj-khalifa`, `/dhow-cruise`, `/theme-parks` — Individual activity pages with booking form sidebar
- `/about` — About Us
- `/contact` — Contact + WhatsApp + office info
- `/gallery` — Filterable photo gallery

## Updating Content

**To update prices, packages, or activities:** Edit `artifacts/api-server/src/data/packages.ts` — this is the single source of truth for all content. No database changes needed for content.

**To add a new activity:** Add an entry to the `activities` array in `packages.ts`, add a new route in `App.tsx`, and add an image to `attached_assets/generated_images/`.

## Architecture decisions

- Content stored in a TypeScript data file (`packages.ts`) rather than database — easy to edit, no migrations needed for content changes
- Enquiries stored in PostgreSQL (for persistence and future admin access)
- Activity pages use a single dynamic component (`activity-page.tsx`) that fetches by slug
- Images imported as static assets in frontend components with a slug→image map as fallback for empty API imageUrls
- GET /enquiries restricted to development mode only (PII protection)

## Product

A premium Dubai tourism booking website with:
- Hero image slider with cinematic Dubai photography
- 8+ activity pages with pricing tiers, inclusions, FAQ accordions
- Holiday package listings with itinerary details
- Real-time booking enquiry form connected to PostgreSQL
- Classic luxury aesthetic: Playfair Display headings, Inter body, champagne gold accents
- Floating WhatsApp chat button, sticky header, mobile hamburger menu

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Run `pnpm --filter @workspace/api-spec run codegen` after any OpenAPI spec change, before using updated hooks
- Run `pnpm run typecheck:libs` after any `lib/*` changes to regenerate declarations
- Activity page hook `useGetActivity` requires `queryKey` in options — use `getGetActivityQueryKey(slug)`
- Images are empty strings in API response; frontend uses local `@assets/generated_images/` imports as fallback

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
