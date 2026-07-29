import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { ProductListing } from "@/components/shop/ProductListing";
import { CATEGORY_BY_SLUG, type CategorySlug } from "@/lib/catalog";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = CATEGORY_BY_SLUG[params.slug as CategorySlug];
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Department not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.category.name} — Al-Haram Wholesale & Cash Carry`;
    const description = `${loaderData.category.blurb} ${loaderData.category.lines} lines at trade prices, delivered inside 5 km.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();

  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main>
        <section className="surface-ink relative overflow-hidden pt-[140px] pb-14 md:pt-[184px] md:pb-20">
          <img
            src={category.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover opacity-25"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, oklch(0.14 0.02 165) 70%, transparent), oklch(0.12 0.015 165))",
            }}
          />
          <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase transition-colors hover:text-white"
            >
              <ArrowLeft className="size-3.5" /> All departments
            </Link>
            <h1 className="display-lg mt-6 max-w-3xl text-white">{category.name}</h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
              {category.blurb}
            </p>
            <p className="text-gold mt-6 text-[11px] font-bold tracking-[0.24em] uppercase">
              {category.lines} lines stocked
            </p>
          </div>
          <span aria-hidden="true" className="gold-rule absolute inset-x-0 bottom-0 h-[3px]" />
        </section>
        <div className="pt-10">
          <ProductListing fixedCategory={category.slug} />
        </div>
      </main>
      <Footer />
    </>
  );
}
