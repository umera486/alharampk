import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Heart, Users, Package, Truck } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { AlhLogo } from "@/components/site/AlhLogo";
import { IMAGES } from "@/lib/catalog";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story — Al-Haram Wholesale & Cash Carry" },
      { name: "description", content: "From a single shop front in 1998 to a thousand-line hybrid cash & carry serving restaurants, families and the community across the 5 km ring." },
    ],
  }),
  component: OurStory,
});

const TIMELINE = [
  { year: "1998", title: "The first shop front", body: "Al-Haram opens as a 400 sq ft corner shop on Green Street, selling rice, spices and halal meat to the local community." },
  { year: "2004", title: "Going wholesale", body: "Demand from local restaurants leads to pallet-tier buying. We add a cold store and start offering trade accounts." },
  { year: "2012", title: "The flagship floor", body: "We move to the current 12,000 sq ft site, consolidating 1,000+ lines under one roof — fresh, pantry, butchery and household." },
  { year: "2019", title: "The delivery fleet", body: "A fleet of refrigerated vans begins running tight 90-minute loops inside the 5 km ring, bridging B2B and B2C under one brand." },
  { year: "2024", title: "Going online", body: "The full catalogue comes online — trade pricing, real-time stock, same-day delivery slots and the Chef Haram AI assistant." },
];

const VALUES = [
  { icon: Heart, title: "Community first", body: "We've served the same streets for 25 years. Families, restaurants and corner shops all get the same trade-rate respect." },
  { icon: Package, title: "1,000+ lines, one floor", body: "Everything from a 20 kg sack of basmati to a punnet of raspberries — no minimum order, no aisle too far." },
  { icon: Truck, title: "Real delivery", body: "Refrigerated vans, 90-minute windows, cold-chain sealed. Not a courier marketplace — our own fleet, our own drivers." },
  { icon: Users, title: "Trade & retail together", body: "A restaurant owner buying 50 kg of flour and a parent buying a loaf of bread walk through the same door. That's the point." },
];

const STATS = [
  { value: "25", label: "Years trading", suffix: "yrs" },
  { value: "1,000+", label: "Lines on the floor" },
  { value: "4,800+", label: "Trade accounts" },
  { value: "90", label: "Min delivery", suffix: "min" },
];

function OurStory() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="surface-ink relative overflow-hidden pt-[140px] pb-16 md:pt-[180px] md:pb-24">
          <img
            src={IMAGES.spices}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover opacity-25"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, color-mix(in oklab, oklch(0.22 0.1 27) 72%, transparent), oklch(0.16 0.09 27))",
            }}
          />
          <div className="relative mx-auto max-w-[1000px] px-5 text-center sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <AlhLogo className="size-24 text-gold" variant="mark" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="eyebrow !text-gold mt-8"
            >
              Our story
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="display-lg mt-4 text-gold-gradient"
            >
              Twenty-five years on the same streets.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-muted-foreground mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed"
            >
              From a 400 sq ft corner shop in 1998 to a thousand-line hybrid cash &amp; carry,
              Al-Haram has always been about one thing: giving restaurants and families the same
              trade-rate respect, under one roof, on the same block.
            </motion.p>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-gold/15 bg-black/20 py-14">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-center"
                >
                  <p className="font-display text-4xl font-extrabold text-gold-gradient sm:text-5xl">
                    {s.value}
                    {s.suffix && <span className="text-xl text-gold/60">{s.suffix}</span>}
                  </p>
                  <p className="text-muted-foreground mt-2 text-[11px] tracking-[0.2em] uppercase">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-black/10 py-20 sm:py-28">
          <div className="mx-auto max-w-[1000px] px-5 sm:px-6">
            <p className="eyebrow !text-gold text-center">The journey</p>
            <h2 className="display-lg mt-3 text-center text-foreground">A quarter century, one block at a time.</h2>

            <div className="mt-16 space-y-12">
              {TIMELINE.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex flex-col gap-6 md:flex-row md:items-center ${i % 2 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className="flex-1">
                    <div className="glass-card rounded-2xl p-6 sm:p-8">
                      <p className="font-display text-3xl font-extrabold text-gold-gradient">{t.year}</p>
                      <h3 className="font-display mt-3 text-xl font-bold text-foreground">{t.title}</h3>
                      <p className="text-muted-foreground mt-3 text-[14px] leading-relaxed">{t.body}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="size-4 rounded-full border-2 border-gold bg-black" />
                  </div>
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-black/15 py-20 sm:py-28">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
            <p className="eyebrow !text-gold text-center">What we stand for</p>
            <h2 className="display-lg mt-3 text-center text-foreground">
              The <span className="text-gold-gradient">principles</span> that haven't changed.
            </h2>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {VALUES.map(({ icon: Icon, title, body }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="glass-card group rounded-2xl p-8 transition-all duration-500 hover:gold-glow"
                >
                  <Icon className="text-gold size-6" />
                  <h3 className="font-display mt-5 text-lg font-bold text-foreground">{title}</h3>
                  <p className="text-muted-foreground mt-3 text-[14px] leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="surface-ink py-20 sm:py-28">
          <div className="mx-auto max-w-[800px] px-5 text-center sm:px-6">
            <h2 className="display-lg text-gold-gradient">Come and see the floor.</h2>
            <p className="text-muted-foreground mx-auto mt-5 max-w-md text-[15px] leading-relaxed">
              Open seven days, 7am to 10pm. No membership, no minimum. Just trade prices and a warm welcome.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/shop"
                className="group surface-emerald hover:shadow-emerald-lg inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold tracking-wide transition-all duration-500 hover:-translate-y-1"
              >
                Shop the aisles
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/"
                className="glass-panel hover:gold-glow inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold tracking-wide transition-all duration-500"
              >
                Back home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
