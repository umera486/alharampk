"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { DEALS, formatPrice } from "@/lib/catalog";
import { Reveal } from "./Reveal";

function useCountdown() {
  const [left, setLeft] = useState({ h: "00", m: "00", s: "00" });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const diff = Math.max(0, end.getTime() - now.getTime());
      const pad = (n: number) => String(n).padStart(2, "0");
      setLeft({
        h: pad(Math.floor(diff / 3.6e6)),
        m: pad(Math.floor((diff % 3.6e6) / 6e4)),
        s: pad(Math.floor((diff % 6e4) / 1000)),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}

export function DealOfTheDay() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { h, m, s } = useCountdown();

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section className="surface-ink relative overflow-hidden py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/3 size-[520px] rounded-full opacity-25 blur-[130px]"
        style={{ background: "radial-gradient(circle, var(--emerald-glow), transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6">
        <Reveal className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="min-w-0">
            <p className="eyebrow !text-gold flex items-center gap-2">
              <Flame className="size-3.5" /> Deal of the day
            </p>
            <h2 className="display-lg mt-4 max-w-2xl text-white">
              Twenty-four hours. <span className="text-gold-gradient">Trade floor prices.</span>
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="flex items-center gap-1.5">
              {[h, m, s].map((v, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="font-display grid min-w-11 place-items-center rounded-xl bg-white/10 px-2 py-2 text-lg font-extrabold text-white tabular-nums">
                    {v}
                  </span>
                  {i < 2 && <span className="text-white/40">:</span>}
                </span>
              ))}
            </div>
            <div className="hidden gap-2 sm:flex">
              {([-1, 1] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => scrollBy(d)}
                  aria-label={d === -1 ? "Previous deals" : "Next deals"}
                  className="grid size-10 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
                >
                  {d === -1 ? (
                    <ChevronLeft className="size-4" />
                  ) : (
                    <ChevronRight className="size-4" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div
          ref={trackRef}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
        >
          {DEALS.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group w-[248px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm sm:w-[300px]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white/10">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-[1.1s] group-hover:scale-110"
                />
                <span className="bg-gold text-gold-foreground absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-extrabold">
                  −{p.discount}%
                </span>
              </div>
              <div className="p-5">
                <p className="text-[9px] font-bold tracking-[0.24em] text-white/50 uppercase">
                  {p.brand}
                </p>
                <h3 className="font-display mt-1.5 truncate text-base font-extrabold text-white">
                  {p.name}
                </h3>
                <p className="mt-1 text-[11px] text-white/50">{p.caseSize}</p>
                <div className="mt-4 flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-display text-xl font-extrabold text-white">
                      {formatPrice(p.price * (1 - (p.discount ?? 0) / 100))}
                    </p>
                    <p className="text-[11px] text-white/40 line-through">{formatPrice(p.price)}</p>
                  </div>
                  <button className="surface-emerald shrink-0 rounded-full px-4 py-2 text-[11px] font-bold transition-transform duration-500 hover:-translate-y-0.5">
                    Add
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
