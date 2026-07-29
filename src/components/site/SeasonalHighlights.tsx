import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const SEASONS = [
  {
    tag: "Summer Essentials",
    title: "BBQ & Grilling Season",
    body: "Premium Halal cuts, marinades, charcoal and catering pack condiments — everything your kitchen or restaurant needs for the summer rush.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    cta: "Shop BBQ range",
    accent: "bg-amber-50 border-amber-200",
    tag_color: "bg-amber-100 text-amber-800",
  },
  {
    tag: "Trade Special",
    title: "Restaurant Breakfast Prep",
    body: "Full English components by the case: free-range eggs (360-count flats), back bacon (5 kg packs), mushrooms and pre-sliced bread at catering rates.",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80",
    cta: "See breakfast range",
    accent: "bg-rose-50 border-rose-200",
    tag_color: "bg-rose-100 text-rose-800",
  },
  {
    tag: "New Arrival",
    title: "Premium Basmati Collection",
    body: "Aged extra-long grain basmati, imported directly from Punjab. Available in 5 kg, 10 kg and 20 kg sacks. Limited first-shipment stock.",
    image: "https://images.unsplash.com/photo-1536304993881-ff86e0c9ef13?auto=format&fit=crop&w=800&q=80",
    cta: "Shop grains",
    accent: "bg-stone-50 border-stone-200",
    tag_color: "bg-stone-100 text-stone-800",
  },
];

export function SeasonalHighlights() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow !text-crimson">Right now</p>
              <h2 className="display-lg mt-3 text-foreground">
                Seasonal <span className="text-crimson-gradient">highlights</span>
              </h2>
            </div>
            <Link
              to="/shop"
              className="group flex items-center gap-1.5 text-[13px] font-bold text-crimson transition-all hover:gap-2.5"
            >
              View all offers
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
          {SEASONS.map((s) => (
            <RevealItem key={s.title}>
              <article className={`group flex flex-col overflow-hidden rounded-2xl border ${s.accent} transition-all duration-500 hover:shadow-lg hover:-translate-y-1`}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className={`inline-self-start rounded-full px-3 py-1 text-[10px] font-bold tracking-wide uppercase ${s.tag_color} w-fit`}>
                    {s.tag}
                  </span>
                  <h3 className="font-display mt-3 text-[18px] font-bold leading-snug text-foreground">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 flex-1 text-[13px] leading-relaxed">
                    {s.body}
                  </p>
                  <Link
                    to="/shop"
                    className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-crimson transition-all hover:gap-2.5"
                  >
                    {s.cta} <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
