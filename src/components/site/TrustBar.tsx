import { ShieldCheck, Award, Leaf, Truck, Clock, Star } from "lucide-react";

const ITEMS = [
  { icon: ShieldCheck, label: "Halal Certified", sub: "All butchery & meat" },
  { icon: Award, label: "Trading since 1998", sub: "25+ years of service" },
  { icon: Leaf, label: "Fresh daily", sub: "Farm deliveries at 5am" },
  { icon: Truck, label: "Free delivery", sub: "Over £60 within 5 km" },
  { icon: Clock, label: "90-min windows", sub: "Same-day slots available" },
  { icon: Star, label: "4.9 / 5 rating", sub: "Over 3,200 reviews" },
];

export function TrustBar() {
  return (
    <section className="border-y border-crimson/10 bg-white py-10">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {ITEMS.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <span className="grid size-10 place-items-center rounded-full bg-crimson/8">
                <Icon className="size-4.5 text-crimson" />
              </span>
              <p className="text-[13px] font-bold text-foreground leading-tight">{label}</p>
              <p className="text-[11px] text-muted-foreground leading-tight">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
