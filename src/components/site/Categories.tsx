import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const CATEGORIES = [
  { name: "Fresh Produce", count: "180+ lines", span: "lg:col-span-7 lg:row-span-2" },
  { name: "Butchery & Seafood", count: "90+ lines", span: "lg:col-span-5" },
  { name: "Bulk Grains & Pulses", count: "140+ lines", span: "lg:col-span-5" },
  { name: "Dairy & Chilled", count: "120+ lines", span: "lg:col-span-4" },
  { name: "Imported Fine Foods", count: "210+ lines", span: "lg:col-span-4" },
  { name: "Home & Household", count: "260+ lines", span: "lg:col-span-4" },
];

export function Categories() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 sm:px-6 py-24 md:py-32" aria-labelledby="aisles-title">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="eyebrow">The floor plan</p>
          <h2
            id="aisles-title"
            className="mt-4 display-lg"
          >
            Eleven departments. <span className="text-gold-gradient">One receipt.</span>
          </h2>
        </div>
        <p className="text-muted-foreground max-w-sm text-[15px] leading-relaxed">
          Every aisle is merchandised weekly by our category buyers — so bulk value never costs you
          the browsing experience.
        </p>
      </Reveal>

      <RevealGroup className="mt-14 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
        {CATEGORIES.map((cat) => (
          <RevealItem key={cat.name} className={cat.span}>
            <article className="group border-border lift relative h-full overflow-hidden rounded-[2px] border">
              <img
                src=""
                alt={`${cat.name} aisle`}
                loading="lazy"
                className="bg-secondary size-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.14 0.006 60 / 0.82), oklch(0.14 0.006 60 / 0.08) 60%)",
                }}
              />
              <div className="text-primary-foreground absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <div>
                  <h3 className="font-display text-xl font-semibold">{cat.name}</h3>
                  <p className="mt-1 text-[11px] tracking-[0.22em] uppercase opacity-70">
                    {cat.count}
                  </p>
                </div>
                <span className="border-gold/50 text-gold translate-y-2 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-widest uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  Browse
                </span>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
