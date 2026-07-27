"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Link } from "@tanstack/react-router";

const STEPS = [
  { n: "01", t: "Fill your basket", d: "Browse 1,000+ lines with live in-store stock counts." },
  { n: "02", t: "Confirm your ring", d: "Enter a postcode — we serve every address within 5 km." },
  { n: "03", t: "Pick a window", d: "90-minute slots from 7am to 10pm, seven days." },
  { n: "04", t: "Sealed handover", d: "Totes are scanned, sealed and signed at your door." },
];

export function DeliveryRadius() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      className="surface-ink relative overflow-hidden py-24 md:py-32"
      aria-labelledby="delivery-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 opacity-25 blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--ember), transparent 60%)" }}
      />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-16 px-6 lg:grid-cols-2">
        <motion.div style={reduced ? undefined : { y }} className="relative">
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            {[1, 0.72, 0.46, 0.22].map((scale, i) => (
              <motion.span
                key={scale}
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="border-gold/25 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                style={{ width: `${scale * 100}%`, height: `${scale * 100}%` }}
              />
            ))}
            <span className="bg-gold absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full">
              <span className="text-gold-foreground font-display text-xs font-bold tracking-widest">
                5 KM
              </span>
            </span>
            {[
              { top: "18%", left: "62%" },
              { top: "68%", left: "30%" },
              { top: "40%", left: "16%" },
              { top: "76%", left: "68%" },
            ].map((pos) => (
              <motion.span
                key={`${pos.top}${pos.left}`}
                aria-hidden="true"
                animate={reduced ? undefined : { opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="bg-ember absolute size-2 rounded-full"
                style={pos}
              />
            ))}
          </div>
        </motion.div>

        <div>
          <p className="eyebrow !text-gold">Delivery</p>
          <h2
            id="delivery-title"
            className="mt-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] font-semibold"
          >
            Everything in the store, five kilometres out.
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed opacity-70">
            Our fleet runs tight, deliberate loops around the flagship — which is exactly why a
            25&nbsp;kg sack and a punnet of raspberries arrive in the same condition they left.
          </p>

          <ol className="mt-12 space-y-px">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-6 border-t border-white/10 py-5 last:border-b"
              >
                <span className="text-gold font-display pt-0.5 text-xs font-semibold tracking-widest">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold">{s.t}</h3>
                  <p className="mt-1 text-[13.5px] opacity-60">{s.d}</p>
                </div>
              </motion.li>
            ))}
          </ol>

          <Link
            to="/"
            className="bg-gold text-gold-foreground mt-10 inline-flex rounded-full px-7 py-4 text-sm font-semibold tracking-wide transition-transform duration-500 hover:-translate-y-1"
          >
            Check your address
          </Link>
        </div>
      </div>
    </section>
  );
}
