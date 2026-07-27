"use client";

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Menu, X, Search, ShoppingBag, MapPin } from "lucide-react";

const LINKS = [
  { label: "Aisles", href: "/" },
  { label: "Fresh Market", href: "/" },
  { label: "Bulk & Wholesale", href: "/" },
  { label: "Delivery", href: "/" },
  { label: "Membership", href: "/" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility strip */}
      <div className="hidden border-b border-border/60 bg-primary text-primary-foreground md:block">
        <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between px-6 text-[11px] tracking-[0.18em] uppercase">
          <span className="flex items-center gap-2 opacity-80">
            <MapPin className="size-3.5" aria-hidden="true" />
            Same-day delivery within a 5&nbsp;km radius
          </span>
          <span className="text-gold-gradient font-semibold">1,000+ curated items in store</span>
        </div>
      </div>

      <motion.div
        animate={{
          backgroundColor: scrolled ? "oklch(1 0 0 / 0.86)" : "oklch(1 0 0 / 0)",
          borderColor: scrolled ? "oklch(0.915 0.004 85 / 1)" : "oklch(0.915 0.004 85 / 0)",
          boxShadow: scrolled ? "0 20px 50px -40px oklch(0 0 0 / 0.5)" : "0 0 0 0 transparent",
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="border-b backdrop-blur-xl"
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6"
        >
          <Link to="/" className="group flex items-center gap-3">
            <span className="surface-crimson shadow-ember relative grid size-10 place-items-center overflow-hidden rounded-sm">
              <span className="font-display text-[17px] leading-none font-semibold text-white">
                A
              </span>
              <span className="absolute inset-x-0 bottom-0 h-[2px] gold-rule" />
            </span>
            <span className="leading-none">
              <span className="font-display block text-[19px] font-semibold tracking-[-0.02em]">
                ALHARAM
              </span>
              <span className="text-ember/80 block text-[9px] font-bold tracking-[0.34em] uppercase">
                Cash &amp; Carry
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-foreground/80 hover:text-foreground relative text-[13px] font-medium tracking-wide transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-[image:var(--gradient-gold)] after:transition-transform after:duration-500 after:content-[''] hover:after:origin-left hover:after:scale-x-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Search the catalogue"
              className="hover:bg-secondary grid size-10 place-items-center rounded-full transition-colors"
            >
              <Search className="size-[18px]" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Open basket"
              className="hover:bg-secondary relative grid size-10 place-items-center rounded-full transition-colors"
            >
              <ShoppingBag className="size-[18px]" aria-hidden="true" />
              <span className="bg-ember absolute top-1.5 right-1.5 size-1.5 rounded-full" />
            </button>
            <Link
              to="/"
              className="bg-primary text-primary-foreground hover:shadow-ember ml-2 hidden rounded-full px-5 py-2.5 text-[13px] font-semibold tracking-wide transition-all duration-500 hover:-translate-y-0.5 sm:inline-flex"
            >
              Check delivery
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="hover:bg-secondary grid size-10 place-items-center rounded-full transition-colors lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="bg-background/98 border-border border-b backdrop-blur-xl lg:hidden"
          >
            <ul className="mx-auto max-w-[1400px] px-5 sm:px-6 py-6">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={reduced ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="border-border/70 border-b last:border-none"
                >
                  <Link
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display block py-4 text-lg font-medium"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
