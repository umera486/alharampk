"use client";

import { gsap } from "gsap";
import { useGsap } from "./useGsap";

const LINE =
  "Ten years merchandising the floor. A thousand lines edited by hand. One promise: everything you carry out, we can carry to you.";

const CREDS = [
  { k: "1998", v: "Founded on the market road" },
  { k: "10 yrs", v: "Of category buying craft" },
  { k: "4.9/5", v: "Across 12,000 deliveries" },
];

export function Manifesto() {
  const ref = useGsap<HTMLElement>((el) => {
    const words = gsap.utils.toArray<HTMLElement>("[data-word]", el);

    gsap.fromTo(
      words,
      { opacity: 0.12 },
      {
        opacity: 1,
        stagger: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          end: "bottom 62%",
          scrub: 0.5,
        },
      },
    );

    gsap.to("[data-rule]", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top 80%", end: "center 60%", scrub: 0.4 },
    });
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-36" aria-label="Our promise">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[320px] w-[min(1100px,92vw)] -translate-x-1/2 -translate-y-1/2 opacity-[0.13] blur-[110px]"
        style={{ background: "radial-gradient(ellipse, var(--ember), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-6">
        <p className="eyebrow">The house standard</p>
        <span data-rule aria-hidden="true" className="mt-5 block origin-left scale-x-0 crimson-rule" />

        <p className="font-display mt-9 text-[clamp(1.6rem,4.6vw,3.4rem)] leading-[1.06] font-semibold tracking-[-0.035em]">
          {LINE.split(" ").map((w, i) => (
            <span key={`${w}-${i}`} data-word className="inline-block pr-[0.26em]">
              {w}
            </span>
          ))}
        </p>

        <dl className="border-border mt-14 grid gap-8 border-t pt-10 sm:grid-cols-3">
          {CREDS.map((c) => (
            <div key={c.k}>
              <dt className="font-display text-ember-gradient text-3xl font-semibold tracking-tight">
                {c.k}
              </dt>
              <dd className="text-muted-foreground mt-2 text-[13px] leading-snug">{c.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
