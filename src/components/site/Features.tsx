import { Boxes, BadgeIndianRupee, Leaf, Headset } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const FEATURES = [
  {
    icon: Boxes,
    title: "1,000+ lines, one trip",
    body: "From single tins to pallet quantities — the depth of a wholesaler with the edit of a specialist grocer.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Transparent trade pricing",
    body: "Break-bulk and case rates printed on every shelf edge. No membership maze, no hidden tiers.",
  },
  {
    icon: Leaf,
    title: "Cold chain, unbroken",
    body: "Chilled and frozen lines travel in sealed thermal totes, temperature-logged from dock to doorstep.",
  },
  {
    icon: Headset,
    title: "A buyer on the phone",
    body: "Named account contacts for restaurants, offices and households ordering at volume.",
  },
];

export function Features() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:py-32" aria-labelledby="why-title">
      <Reveal className="max-w-3xl">
        <p className="eyebrow">Why Meridian</p>
        <h2
          id="why-title"
          className="mt-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] font-semibold"
        >
          Built for people who buy <span className="text-gold-gradient">seriously.</span>
        </h2>
      </Reveal>

      <RevealGroup className="border-border mt-16 grid gap-px border md:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <RevealItem key={title}>
            <div className="bg-card outline-border group relative h-full p-8 outline transition-colors duration-500 lg:p-9">
              <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-[image:var(--gradient-gold)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              <Icon className="text-gold size-6" aria-hidden="true" />
              <h3 className="font-display mt-8 text-lg leading-snug font-semibold">{title}</h3>
              <p className="text-muted-foreground mt-3 text-[14px] leading-relaxed">{body}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
