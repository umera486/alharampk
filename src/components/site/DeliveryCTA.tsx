"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

export function DeliveryCTA() {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="mx-auto max-w-[1400px] px-6 pb-24 md:pb-32" aria-labelledby="cta-title">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="border-border shadow-ember relative overflow-hidden rounded-[2px] border px-8 py-16 text-center md:px-16 md:py-24"
      >
        <span aria-hidden="true" className="absolute inset-x-0 top-0 gold-rule" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 left-1/2 size-[560px] -translate-x-1/2 rounded-full opacity-[0.14] blur-[110px]"
          style={{ background: "radial-gradient(circle, var(--ember), transparent 65%)" }}
        />

        <p className="eyebrow relative">Start your first order</p>
        <h2
          id="cta-title"
          className="relative mx-auto mt-5 max-w-3xl text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.02] font-semibold"
        >
          Find out if you&apos;re inside the{" "}
          <span className="text-gold-gradient">Meridian ring.</span>
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (value.trim()) setSubmitted(true);
          }}
          className="relative mx-auto mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="postcode" className="sr-only">
            Postcode or street address
          </label>
          <input
            id="postcode"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setSubmitted(false);
            }}
            placeholder="Postcode or street address"
            className="border-border bg-card focus:border-gold h-14 flex-1 rounded-full border px-6 text-sm outline-none transition-colors duration-400"
          />
          <button
            type="submit"
            className="group bg-primary text-primary-foreground inline-flex h-14 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold tracking-wide transition-transform duration-500 hover:-translate-y-0.5"
          >
            Check
            <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
          </button>
        </form>

        {submitted && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-muted-foreground relative mt-5 inline-flex items-center gap-2 text-sm"
          >
            <Check className="text-gold size-4" aria-hidden="true" />
            We&apos;ll confirm coverage for “{value}” the moment checkout opens.
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
