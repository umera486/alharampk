import { createFileRoute } from "@tanstack/react-router";

import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Categories } from "@/components/site/Categories";
import { ProductCarousel } from "@/components/site/ProductCarousel";
import { Features } from "@/components/site/Features";
import { DeliveryRadius } from "@/components/site/DeliveryRadius";
import { Testimonials } from "@/components/site/Testimonials";
import { DeliveryCTA } from "@/components/site/DeliveryCTA";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";

const TITLE = "Meridian Cash & Carry — 1,000+ Lines, 5 km Delivery";
const DESCRIPTION =
  "A flagship cash & carry with 1,000+ curated grocery lines at trade prices, delivered to any address within 5 km in 90-minute windows.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Categories />
        <ProductCarousel />
        <Features />
        <DeliveryRadius />
        <Testimonials />
        <DeliveryCTA />
      </main>
      <Footer />
    </>
  );
}
