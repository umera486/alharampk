"use client";

import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ArrowRight, Building2, FileText, Percent, Truck } from "lucide-react";
import { IMAGES } from "@/lib/catalog";
import { useGsap } from "./useGsap";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const TIERS = [
  { qty: "1 – 4 cases", price: "List price", save: "—" },
  { qty: "5 – 19 cases", price: "−8%", save: "Trade tier" },
  { qty: "20 – 49 cases", price: "−15%", save: "Kitchen tier" },
  { qty: "Half pallet +", price: "−22%", save: "Pallet tier" },
];

const PERKS = [
  { icon: FileText, title: "30-day invoicing", body: "Approved trade accounts settle monthly." },
  { icon: Percent, title: "Volume tiers", body: "Automatic breaks — no haggling at the till." },
  { icon: Truck, title: "Scheduled drops", body: "Standing weekly orders, fixed morning slots." },
  { icon: Building2, title: "Named buyer", body: "One contact who knows your prep sheet." },
];

export function BulkBuying() {
  const ref = useGsap<HTMLElement>((el) => {
    const q = gsap.utils.selector(el);
    gsap.to(q("[data-parallax='slab']"), {
      yPercent: -12,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.7 },
    });
  }, []);

  return (
    <section ref={ref} className="surface-jade-wash relative overflow-hidden py-20 md:py-28">
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <Reveal className="min-w-0">
            <p className="eyebrow">B2B · Bulk buying</p>
            <h2 className="display-lg mt-4">
              Built for kitchens that <span className="text-emerald-gradient">buy by the pallet.</span>
            </h2>
            <p className="text-muted-foreground mt-5 max-w-lg text-[15px] leading-relaxed sm:text-[16px]">
              Restaurants, caterers and corner shops trade on the same floor as retail — but on
              their own price sheet. Register once and every case break applies automatically at
              the till and online.
            </p>

            <div className="glass-panel shadow-elevated mt-9 overflow-hidden rounded-2xl">
              {TIERS.map((t, i) => (
                <div
                  key={t.qty}
                  className={`grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 px-5 py-4 sm:gap-6 sm:px-6 ${
                    i ? "border-border border-t" : ""
                  }`}
                >
                  <span className="min-w-0 truncate text-[13px] font-bold">{t.qty}</span>
                  <span className="text-muted-foreground hidden text-[11px] tracking-[0.2em] uppercase sm:block">
                    {t.save}
                  </span>
                  <span
                    className={`font-display shrink-0 text-lg font-extrabold ${
                      i ? "text-emerald" : "text-muted-foreground"
                    }`}
                  >
                    {t.price}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/shop"
              className="group surface-emerald hover:shadow-emerald-lg mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold tracking-wide transition-all duration-500 hover:-translate-y-1"
            >
              Register a trade account
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div data-parallax="slab" className="min-w-0">
            <div className="shadow-emerald-lg grain glass-card relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[4/3] lg:aspect-[4/5]">
              <img
                src={IMAGES.wholesale}
                alt="Pallet racking on the Al-Haram wholesale floor"
                className="size-full object-cover"
              />
              <span aria-hidden="true" className="gold-rule absolute inset-x-0 bottom-0 h-[3px]" />
            </div>

            <RevealGroup className="mt-4 grid grid-cols-2 gap-3">
              {PERKS.map((p) => (
                <RevealItem
                  key={p.title}
                  className="glass-card rounded-2xl p-4 sm:p-5"
                >
                  <p.icon className="text-emerald size-4" aria-hidden="true" />
                  <p className="mt-3 text-[13px] font-bold">{p.title}</p>
                  <p className="text-muted-foreground mt-1 text-[11px] leading-snug">{p.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
