import { createFileRoute, Link } from "@tanstack/react-router";

import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { ProductListing } from "@/components/shop/ProductListing";
import { CATEGORIES } from "@/lib/catalog";

const TITLE = "Shop 1,000+ Lines — Al-Haram Wholesale & Cash Carry";
const DESCRIPTION =
  "Browse over a thousand grocery lines at trade prices. Filter by department, brand and case size, with delivery inside a 5 km ring.";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main>
        <section className="surface-jade-wash relative overflow-hidden pt-[140px] pb-12 md:pt-[184px] md:pb-16">
          <div
            aria-hidden="true"
            className="hairline-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
          />
          <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6">
            <p className="eyebrow">The floor</p>
            <h1 className="display-lg mt-4 max-w-3xl">
              Every aisle, <span className="text-emerald-gradient">one search bar.</span>
            </h1>
            <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  className="glass-panel hover:gold-glow shrink-0 rounded-full px-4 py-2 text-[12px] font-bold transition-all duration-400"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
        <ProductListing />
      </main>
      <Footer />
    </>
  );
}
