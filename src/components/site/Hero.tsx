"use client";

import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowRight, Truck, Clock, ShieldCheck } from "lucide-react";

const STATS = [
  { value: "1,000+", label: "Curated SKUs" },
  { value: "5 km", label: "Delivery radius" },
  { value: "90 min", label: "Doorstep window" },
];

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-26%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const word = {
    hidden: { opacity: 0, y: "0.9em" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  const headline = ["Wholesale", "abundance,", "boutique", "precision."];

  return (
    <section ref={ref} className="relative overflow-hidden pt-[104px] md:pt-[124px]">
      {/* Ambient ember depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 size-[620px] rounded-full opacity-[0.16] blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--ember), transparent 65%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-40 size-[520px] rounded-full opacity-[0.2] blur-[130px]"
        style={{ background: "radial-gradient(circle, var(--gold), transparent 65%)" }}
      />

      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 pt-10 pb-20 lg:grid-cols-[1.05fr_1fr] lg:pt-16 lg:pb-28">
        <motion.div style={reduced ? undefined : { y: copyY, opacity: fade }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="border-border bg-card inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
          >
            <span className="bg-ember size-1.5 rounded-full" />
            <span className="eyebrow !text-foreground">Est. 1998 · Members &amp; trade welcome</span>
          </motion.span>

          <h1 className="mt-7 text-[clamp(2.75rem,6.4vw,5.25rem)] leading-[0.94] font-semibold">
            {headline.map((w, i) => (
              <span key={w} className="inline-block overflow-hidden pr-[0.24em] align-bottom">
                <motion.span
                  className={i === 3 ? "text-gold-gradient inline-block" : "inline-block"}
                  custom={i}
                  variants={word}
                  initial={reduced ? undefined : "hidden"}
                  animate="visible"
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-muted-foreground mt-7 max-w-xl text-[17px] leading-relaxed"
          >
            A thousand-plus pantry, fresh and household lines under one roof — priced at cash &amp;
            carry, presented like a flagship. Order before noon and we deliver anywhere inside our
            5&nbsp;kilometre ring.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/"
              className="group bg-primary text-primary-foreground hover:shadow-ember-lg inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold tracking-wide transition-all duration-500 hover:-translate-y-1"
            >
              Shop the aisles
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/"
              className="border-border hover:border-foreground/40 hover:bg-secondary inline-flex items-center gap-2 rounded-full border px-7 py-4 text-sm font-semibold tracking-wide transition-all duration-500"
            >
              Check my postcode
            </Link>
          </motion.div>

          <motion.dl
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.85 } } }}
            className="border-border mt-14 grid max-w-lg grid-cols-3 gap-6 border-t pt-8"
          >
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <dt className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  {s.value}
                </dt>
                <dd className="text-muted-foreground mt-1 text-[11px] tracking-[0.18em] uppercase">
                  {s.label}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Visual column */}
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="shadow-ember-lg relative aspect-[4/5] overflow-hidden rounded-[2px] sm:aspect-[5/6]">
            <motion.img
              src=""
              alt="Meridian Cash & Carry flagship floor"
              style={reduced ? undefined : { y: imageY, scale: 1.18 }}
              className="bg-secondary size-full object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, color-mix(in oklab, var(--ember) 22%, transparent), transparent 55%)",
              }}
            />
            <span className="absolute inset-x-0 top-0 h-[3px] gold-rule" />
          </div>

          <motion.div
            style={reduced ? undefined : { y: cardY }}
            className="bg-card border-border shadow-elevated absolute -bottom-8 -left-4 w-[min(320px,86%)] rounded-[2px] border p-6 lg:-left-14"
          >
            <p className="eyebrow">Delivery promise</p>
            <ul className="mt-4 space-y-3.5">
              {[
                { icon: Truck, text: "Free above ₹2,000 inside 5 km" },
                { icon: Clock, text: "90-minute doorstep windows" },
                { icon: ShieldCheck, text: "Cold-chain sealed, always" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-[13px] leading-snug">
                  <Icon className="text-gold mt-px size-4 shrink-0" aria-hidden="true" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
