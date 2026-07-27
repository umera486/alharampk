import { Quote } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const QUOTES = [
  {
    quote:
      "We run three kitchens off Meridian. Case pricing, one invoice, and produce that survives a Saturday service.",
    name: "Anaya Raghunathan",
    role: "Executive Chef, Pallavi House",
  },
  {
    quote:
      "The 5 km promise is the whole thing — our office pantry is restocked before the first stand-up.",
    name: "Devin Marsh",
    role: "Operations Lead, Northgate Studios",
  },
  {
    quote:
      "It feels like a boutique but bills like a wholesaler. I stopped splitting my shop across four places.",
    name: "Priya Sundaram",
    role: "Member since 2016",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 sm:px-6 py-24 md:py-32" aria-labelledby="voices-title">
      <Reveal className="max-w-2xl">
        <p className="eyebrow">Trade &amp; table</p>
        <h2
          id="voices-title"
          className="mt-4 display-lg"
        >
          Trusted by kitchens, <span className="text-gold-gradient">offices and households.</span>
        </h2>
      </Reveal>

      <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
        {QUOTES.map((q) => (
          <RevealItem key={q.name}>
            <figure className="border-border bg-card lift flex h-full flex-col justify-between rounded-[2px] border p-8">
              <Quote className="text-gold size-6" aria-hidden="true" />
              <blockquote className="font-display mt-8 text-[17px] leading-snug font-medium">
                “{q.quote}”
              </blockquote>
              <figcaption className="border-border mt-8 flex items-center gap-3 border-t pt-5">
                <img
                  src=""
                  alt={q.name}
                  loading="lazy"
                  className="bg-secondary size-10 rounded-full object-cover"
                />
                <span>
                  <span className="block text-[13px] font-semibold">{q.name}</span>
                  <span className="text-muted-foreground block text-[11px] tracking-[0.14em] uppercase">
                    {q.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
