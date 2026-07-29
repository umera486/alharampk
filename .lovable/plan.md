## Note on the stack

This project runs on TanStack Start (React + Vite), not Next.js — that's fixed for Lovable projects and it's the same App-Router-style file routing, React 19, Tailwind v4, GSAP and Framer Motion. One consequence: links use `<Link to="/shop">`, not `href`. Everything else in your brief maps over 1:1.

Satoshi isn't on Google Fonts; I'll load it from Fontshare's CDN (the official free source) and fall back to a close geometric grotesque.

## 1. Design system rebrand (`src/styles.css`)

- Background `#EBEBEB` as `--background`, near-black ink foreground, white elevated cards for contrast.
- Emerald brand ramp (`--emerald`, `--emerald-deep`, `--emerald-glow`) replacing the crimson/gold system; gold retained only as a thin luxury hairline accent.
- New tokens: `--gradient-emerald`, `--gradient-jade-wash`, `--shadow-emerald`, glassmorphism token pair for the AI widget.
- Satoshi as `--font-display` and `--font-sans`, loaded via `<link>` in `__root.tsx`.
- Utilities updated: `display-xl/lg`, `eyebrow`, `lift`, `grain`, `hairline-grid`, plus new `glass-panel` and `emerald-rule`.

## 2. Homepage (`/`)

Rebuilt around the new brand, sections in order:

```text
Navbar (sticky glass, cart + B2B link)
Hero            – GSAP pinned parallax, layered depth, split display type
Marquee         – infinite Framer Motion department ticker
CategoryGrid    – dynamic bento grid, hover reveal
DealOfTheDay    – horizontal scroll carousel, countdown, drag/scroll snap
BulkBuying      – B2B highlight: tier pricing table, pallet imagery slots, CTA
DeliveryRadius  – 5 km ring visual (kept, re-skinned)
Testimonials + CTA + Footer
```

Hero gets the heaviest treatment: GSAP ScrollTrigger scrub on background wash, image scale, and card counter-parallax; Framer Motion masked line-by-line headline reveal; Lenis stays wired into the GSAP ticker.

## 3. Shop and category pages

- `src/routes/shop.tsx` — layout shell (`<Outlet />`) with shared filter state.
- `src/routes/shop.index.tsx` — full listing.
- `src/routes/category.$slug.tsx` — same listing bound to one department.

Shared, reusable pieces in `src/components/shop/`:
- `FilterSidebar` — category, price range, brand, availability, B2B-bulk-only toggle; Sheet drawer on mobile.
- `ViewToggle` — grid/list, Framer Motion `layout` transition between modes.
- `ProductCard` / `ProductRow` — one data shape, two presentations.
- `ProductSkeleton` — shimmer loaders shown during a simulated fetch delay.
- `SortBar`, `ActiveFilterChips`, `Pagination`.
- Mock catalog in `src/lib/catalog.ts` (~40 items across departments) so pages are fully interactive before your POS integration; typed so swapping in real data is a one-file change.

## 4. AI Grocery Assistant widget

`src/components/assistant/` mounted once in `__root.tsx`, so it persists across routes.

- Idle: floating 👨‍🍳 button, continuous Framer Motion breathing/pulse loop plus an emerald halo ring.
- Click: `AnimatePresence` + `layoutId` morph into a glassmorphism chat panel (backdrop blur, emerald hairline border), bottom-right on desktop, near-full-sheet on mobile.
- Content: pre-filled onboarding message from the assistant suggesting recipes and mapping them to store aisles/ingredients, plus 3 suggestion chips and a composer.
- UI shell only, as you chose — the composer echoes a canned "connect me to your catalog" response; no backend, no AI calls. Easy to wire later.

## 5. Quality bar

- Every section responsive-audited at 375 / 768 / 1440 using the grid + `min-w-0` + `shrink-0` header pattern.
- `prefers-reduced-motion` respected across all GSAP and Framer Motion work.
- Per-route `head()` metadata: unique title, description, og tags for `/`, `/shop`, and category pages.
- Image slots left as empty `src=""` for your own assets, as before.

## Technical details

- GSAP contexts stay scoped via the existing `useGsap` hook so triggers revert on unmount.
- Filter/sort/view state lives in URL search params via TanStack Router so listing state is shareable and back-button-safe.
- All new components are prop-driven and DRY — the product card, filter group, and section header are each written once and reused.
