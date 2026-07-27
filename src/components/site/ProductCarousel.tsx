"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";

type Product = {
  name: string;
  unit: string;
  price: string;
  was?: string;
  tag?: string;
};

const PRODUCTS: Product[] = [
  { name: "Cold-Pressed Olive Oil", unit: "5 L tin", price: "₹3,240", was: "₹3,900", tag: "Gold" },
  { name: "Basmati Rice, Aged 2yr", unit: "25 kg sack", price: "₹2,180" },
  { name: "Belgian Couverture", unit: "2.5 kg block", price: "₹1,940", tag: "Imported" },
  { name: "Free-Range Eggs", unit: "Tray of 30", price: "₹289", was: "₹340" },
  { name: "Himalayan Rock Salt", unit: "10 kg", price: "₹640" },
  { name: "Arabica Beans, Estate", unit: "1 kg", price: "₹1,120", tag: "Gold" },
  { name: "San Marzano Tomatoes", unit: "Case of 12", price: "₹1,760", tag: "Imported" },
  { name: "Cultured Butter Blocks", unit: "5 × 500 g", price: "₹1,450" },
];

export function ProductCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 720), behavior: "smooth" });
  };

  return (
    <section
      className="border-border border-y py-24 md:py-28"
      aria-labelledby="deals-title"
      data-lenis-prevent
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">This week on the floor</p>
            <h2
              id="deals-title"
              className="mt-4 display-lg"
            >
              Trade prices, <span className="text-gold-gradient">flagship quality</span>
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={atStart}
              aria-label="Previous products"
              className="border-border hover:border-foreground/40 grid size-12 place-items-center rounded-full border transition-all duration-400 disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={atEnd}
              aria-label="Next products"
              className="border-border hover:border-foreground/40 grid size-12 place-items-center rounded-full border transition-all duration-400 disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:px-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))]"
      >
        {PRODUCTS.map((p, i) => (
          <motion.article
            key={p.name}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="group border-border bg-card lift w-[260px] shrink-0 snap-start rounded-[2px] border sm:w-[300px]"
          >
            <div className="bg-secondary relative aspect-square overflow-hidden">
              <img
                src=""
                alt={p.name}
                loading="lazy"
                className="size-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              {p.tag && (
                <span className="bg-gold text-gold-foreground absolute top-4 left-4 rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase">
                  {p.tag}
                </span>
              )}
              <button
                type="button"
                aria-label={`Add ${p.name} to basket`}
                className="bg-primary text-primary-foreground absolute right-4 bottom-4 grid size-11 translate-y-3 place-items-center rounded-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <div className="p-5">
              <h3 className="font-display text-[15px] leading-snug font-semibold">{p.name}</h3>
              <p className="text-muted-foreground mt-1 text-[11px] tracking-[0.18em] uppercase">
                {p.unit}
              </p>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-lg font-semibold">{p.price}</span>
                {p.was && (
                  <span className="text-muted-foreground text-xs line-through">{p.was}</span>
                )}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
