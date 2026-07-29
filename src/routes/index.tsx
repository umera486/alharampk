import { createFileRoute } from "@tanstack/react-router";

import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Manifesto } from "@/components/site/Manifesto";
import { CategoryGrid } from "@/components/site/CategoryGrid";
import { DealOfTheDay } from "@/components/site/DealOfTheDay";
import { BulkBuying } from "@/components/site/BulkBuying";
import { Features } from "@/components/site/Features";
import { DeliveryRadius } from "@/components/site/DeliveryRadius";
import { Testimonials } from "@/components/site/Testimonials";
import { DeliveryCTA } from "@/components/site/DeliveryCTA";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";

const TITLE = "Al-Haram Wholesale & Cash Carry — Trade Prices, 5 km Delivery";
const DESCRIPTION =
  "A hybrid B2B and B2C cash & carry: 1,000+ grocery lines at trade prices, pallet tiers for kitchens, and 90-minute delivery inside a 5 km ring.";

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
        <CategoryGrid />
        <DealOfTheDay />
        <Manifesto />
        <BulkBuying />
        <Features />
        <DeliveryRadius />
        <Testimonials />
        <DeliveryCTA />
      </main>
      <Footer />
    </>
  );
}
