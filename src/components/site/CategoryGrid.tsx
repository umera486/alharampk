"use client";

import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/catalog";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

export function CategoryGrid() {
  return (
    <section className="relative py-20 md:py-28" id="departments">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
        <Reveal className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="min-w-0">
            <p className="eyebrow">Departments</p>
            <h2 className="display-lg mt-4 max-w-2xl">
              Eight floors of stock, <span className="text-emerald-gradient">one aisle map.</span>
            </h2>
          </div>
          <Link
            to="/shop"
            className="border-border hover:border-emerald hover:text-emerald inline-flex shrink-0 items-center gap-2 rounded-full border px-6 py-3 text-[12px] font-bold transition-colors"
          >
            Browse all 1,000+ lines <ArrowUpRight className="size-3.5" />
          </Link>
        </Reveal>

        <RevealGroup className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 sm:auto-rows-[240px] lg:grid-cols-4">
          {CATEGORIES.map((c, i) => {
            const wide = i === 0 || i === 5;
            const tall = i === 2;
            return (
              <RevealItem
                key={c.slug}
                className={`${wide ? "col-span-2" : ""} ${tall ? "row-span-2" : ""}`}
              >
                <Link
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  className="group bg-card border-border shadow-elevated relative flex size-full flex-col justify-end overflow-hidden rounded-2xl border p-5 sm:p-6"
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="bg-secondary absolute inset-0 size-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-95"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 25%, color-mix(in oklab, oklch(0.12 0.012 165) 88%, transparent) 100%)",
                    }}
                  />
                  <motion.div className="relative">
                    <p className="text-[9px] font-bold tracking-[0.24em] text-white/60 uppercase">
                      {c.lines} lines
                    </p>
                    <h3 className="font-display mt-1.5 text-lg font-extrabold text-white sm:text-2xl">
                      {c.name}
                    </h3>
                    <p className="mt-1.5 max-w-xs text-[12px] leading-snug text-white/70 opacity-0 transition-all duration-500 group-hover:opacity-100">
                      {c.blurb}
                    </p>
                  </motion.div>
                  <span
                    aria-hidden="true"
                    className="emerald-rule absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
                  />
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
