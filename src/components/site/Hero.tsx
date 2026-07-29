"use client";

import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ArrowRight, Truck, Clock, ShieldCheck } from "lucide-react";
import { useGsap } from "./useGsap";

const STATS = [
  { value: "1,000+", label: "Lines on the floor" },
  { value: "5 km", label: "Delivery ring" },
  { value: "90 min", label: "Doorstep window" },
];

const HEADLINE = [
  { text: "WHOLESALE", accent: false },
  { text: "PRICE.", accent: true },
  { text: "FLAGSHIP", accent: false },
  { text: "FLOOR.", accent: false },
];

export function Hero() {
  const reduced = useReducedMotion();

  const ref = useGsap<HTMLElement>((el) => {
    const q = gsap.utils.selector(el);

    gsap.to(q("[data-parallax='image']"), {
      yPercent: 16,
      scale: 1.08,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
    });

    gsap.to(q("[data-parallax='card']"), {
      yPercent: -32,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
    });

    gsap.to(q("[data-parallax='copy']"), {
      yPercent: -14,
      opacity: 0.2,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
    });

    gsap.to(q("[data-parallax='glow']"), {
      yPercent: 28,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 1 },
    });

    gsap.to(q("[data-parallax='badge']"), {
      yPercent: -60,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.4 },
    });
  }, []);

  return (
    <section ref={ref} className="surface-jade-wash relative overflow-hidden">
      <div
        aria-hidden="true"
        className="hairline-grid pointer-events-none absolute inset-0 opacity-[0.45] [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        data-parallax="glow"
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 size-[460px] rounded-full opacity-30 blur-[110px] md:size-[680px]"
        style={{ background: "radial-gradient(circle, var(--emerald), transparent 65%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -left-32 size-[380px] rounded-full opacity-25 blur-[120px] md:size-[560px]"
        style={{ background: "radial-gradient(circle, var(--gold), transparent 66%)" }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 pt-[124px] pb-16 sm:px-6 md:pt-[172px] md:pb-24">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="border-border/80 bg-card/70 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 backdrop-blur-sm"
        >
          <span className="relative flex size-1.5">
            <span className="bg-emerald absolute inline-flex size-full animate-ping rounded-full opacity-60" />
            <span className="bg-emerald relative inline-flex size-1.5 rounded-full" />
          </span>
          <span className="eyebrow !text-foreground !text-[9px] sm:!text-[10px]">
            Open 7 days · 7am–10pm · Trade &amp; retail
          </span>
        </motion.div>

        <div data-parallax="copy" className="mt-8 md:mt-12">
          <h1 className="display-xl">
            {HEADLINE.map((w, i) => (
              <span key={w.text} className="block overflow-hidden">
                <motion.span
                  className={`block ${w.accent ? "text-emerald-gradient" : ""}`}
                  initial={reduced ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.15, delay: 0.12 + i * 0.09, ease: [0.19, 1, 0.22, 1] }}
                >
                  {w.text}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-[1fr_1.15fr] lg:items-end">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-muted-foreground max-w-lg text-[15px] leading-relaxed sm:text-[17px]">
              Al-Haram Wholesale &amp; Cash Carry is a hybrid B2B and B2C floor: over a thousand
              pantry, fresh and household lines at trade rates, pallet pricing for kitchens, and a
              delivery fleet running tight loops inside a five kilometre ring.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/shop"
                className="group surface-emerald hover:shadow-emerald-lg inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold tracking-wide transition-all duration-500 hover:-translate-y-1"
              >
                Shop the aisles
                <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/shop"

                className="border-border hover:border-emerald hover:bg-card inline-flex items-center justify-center gap-2 rounded-full border px-7 py-4 text-sm font-bold tracking-wide transition-all duration-500"
              >
                Open a trade account
              </Link>
            </div>

            <dl className="border-border mt-10 grid grid-cols-3 gap-4 border-t pt-7 sm:gap-6">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <dt className="font-display text-xl font-extrabold tracking-tight sm:text-3xl">
                    {s.value}
                  </dt>
                  <dd className="text-muted-foreground mt-1.5 text-[9px] tracking-[0.2em] uppercase sm:text-[10px]">
                    {s.label}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="shadow-emerald-lg grain relative aspect-[4/3] overflow-hidden rounded-3xl sm:aspect-[16/11]">
              <img
                data-parallax="image"
                src=""
                alt="Al-Haram Wholesale & Cash Carry trading floor"
                className="bg-secondary size-full scale-[1.2] object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(200deg, transparent 40%, color-mix(in oklab, var(--emerald-deep) 42%, transparent))",
                }}
              />
              <span aria-hidden="true" className="gold-rule absolute inset-x-0 top-0 h-[3px]" />
            </div>

            <div
              data-parallax="badge"
              className="surface-emerald shadow-emerald absolute -top-5 right-5 hidden rounded-2xl px-5 py-3 sm:block"
            >
              <p className="text-[9px] font-bold tracking-[0.24em] uppercase opacity-80">
                Pallet rate
              </p>
              <p className="font-display text-2xl font-extrabold">−22%</p>
            </div>

            <div
              data-parallax="card"
              className="bg-card border-border shadow-elevated mt-4 rounded-2xl border p-5 sm:absolute sm:-bottom-10 sm:-left-6 sm:mt-0 sm:w-[300px] sm:p-6 lg:-left-16"
            >
              <p className="eyebrow">Delivery promise</p>
              <ul className="mt-4 space-y-3">
                {[
                  { icon: Truck, text: "Free above £60 inside 5 km" },
                  { icon: Clock, text: "90-minute doorstep windows" },
                  { icon: ShieldCheck, text: "Cold-chain sealed, always" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-[13px] leading-snug">
                    <Icon className="text-emerald mt-px size-4 shrink-0" aria-hidden="true" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
