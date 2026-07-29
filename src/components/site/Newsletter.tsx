"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, CircleCheck as CheckCircle2 } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };

  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow !text-crimson">Stay ahead</p>
          <h2 className="display-lg mt-4 text-foreground">
            Trade deals, <span className="text-crimson-gradient">new arrivals</span>, weekly specials.
          </h2>
          <p className="text-muted-foreground mx-auto mt-5 max-w-lg text-[15px] leading-relaxed">
            Join 4,800+ trade buyers and retail customers who get early access to pallet discounts
            and seasonal drops every Thursday.
          </p>

          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 flex items-center justify-center gap-3 text-crimson"
            >
              <CheckCircle2 className="size-6" />
              <span className="font-bold text-[15px]">You're on the list — see you Thursday!</span>
            </motion.div>
          ) : (
            <form
              onSubmit={submit}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-14 flex-1 max-w-sm rounded-full border border-crimson/20 bg-white px-6 text-[14px] outline-none ring-0 transition focus:border-crimson focus:ring-2 focus:ring-crimson/15 sm:flex-none"
              />
              <button
                type="submit"
                className="surface-crimson hover:shadow-crimson-lg group inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 text-[14px] font-bold tracking-wide transition-all duration-500 hover:-translate-y-0.5"
              >
                Subscribe
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
          <p className="text-muted-foreground mt-5 text-[11px]">No spam. Unsubscribe any time.</p>
        </div>
      </div>
    </section>
  );
}
