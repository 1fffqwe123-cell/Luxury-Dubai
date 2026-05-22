# Luxe Dubai — Luxury Real Estate Website

A premium Dubai luxury real estate website with bilingual support (EN/AR with full RTL), AED pricing, property listings, search & filter, and a polished UI.

## Run & Operate

- `pnpm --filter @workspace/dubai-realty run dev` — run the frontend (port assigned by env)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS v4, Framer Motion
- UI: shadcn/ui components, Radix UI primitives
- Routing: wouter
- Fonts: Playfair Display (EN headings), Inter (EN body), Noto Naskh Arabic (AR)
- No backend — all data is static

## Where things live

- `artifacts/dubai-realty/` — main frontend React app (preview path: `/`)
- `artifacts/dubai-realty/src/lib/properties.ts` — all 16 property objects + neighborhoods data
- `artifacts/dubai-realty/src/lib/translations.ts` — EN + AR translation strings
- `artifacts/dubai-realty/src/contexts/LanguageContext.tsx` — language context + RTL toggling
- `artifacts/dubai-realty/src/components/` — all UI components (layout, property, home sections)
- `artifacts/dubai-realty/src/pages/` — page components (Home, Properties, PropertyDetail, About, Contact)
- `artifacts/dubai-realty/src/index.css` — theme palette (deep navy + warm gold)

## Pages

- `/` — Homepage: hero, search widget, featured properties, neighborhoods, stats, testimonials, CTA
- `/properties` — Listings: filters (Buy/Rent, type, location, bedrooms, price range slider + input), property grid
- `/properties/:id` — Property detail: gallery, specs, features, agent card, similar properties
- `/about` — Company story, team, values
- `/contact` — Contact form, office locations

## Architecture decisions

- Frontend-only, no backend needed — all 16 properties are static in `properties.ts`
- RTL handled by setting `document.documentElement.dir` via `LanguageContext`
- Language switching toggles between EN (Playfair Display + Inter) and AR (Noto Naskh Arabic)
- Price range filter uses Radix UI Slider with dual handles + manual text inputs
- All images from Unsplash with specific photo IDs for consistent luxury real estate photography
- Framer Motion used for page transitions, stat counters, staggered card reveals

## Product

A premium Dubai luxury real estate brokerage website ("Luxe Dubai") serving high-net-worth buyers and renters. Features 16 realistic property listings across Downtown Dubai, Palm Jumeirah, Dubai Marina, Business Bay, DIFC, and Jumeirah — with AED pricing, property type filtering, bilingual content, and a polished gold-on-navy design identity.

## User preferences

- Deep navy (#1a2744) + warm gold (#C9A84C) color palette
- Playfair Display for headings, Inter for body text
- Bilingual EN/AR with full RTL support
- All prices in AED
- No login, no backend, no admin dashboard

## Gotchas

- Arabic mode applies `dir="rtl"` to the document root — all layouts use logical CSS properties or direction-aware conditional classes
- Google Fonts @import must be the VERY FIRST line in index.css (before @import "tailwindcss")
- Properties data is entirely static in `src/lib/properties.ts` — to add properties, edit that file
