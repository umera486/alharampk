"use client";

const ITEMS = [
  "Fresh Produce",
  "Butchery",
  "Dairy & Chill",
  "Bakery",
  "Pantry Staples",
  "Bulk Grains",
  "Household",
  "Beverages",
  "Frozen",
  "Imported Fine Foods",
];

export function Marquee() {
  return (
    <section aria-label="Departments" className="surface-ink overflow-hidden py-5">
      <div className="flex w-max animate-[marquee_38s_linear_infinite] gap-12 whitespace-nowrap will-change-transform hover:[animation-play-state:paused]">
        {[0, 1].map((pass) => (
          <div key={pass} className="flex gap-12" aria-hidden={pass === 1}>
            {ITEMS.map((item) => (
              <span
                key={item}
                className="flex items-center gap-12 text-[12px] font-medium tracking-[0.3em] uppercase opacity-80"
              >
                {item}
                <span className="bg-gold size-1 rounded-full" />
              </span>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translate3d(0,0,0); }
          to { transform: translate3d(-50%,0,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="animate-[marquee"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
