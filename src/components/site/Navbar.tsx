"use client";

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Search, ShoppingBag, X, LogIn, LogOut, User } from "lucide-react";
import { CATEGORIES } from "@/lib/catalog";
import { AlhLogo } from "./AlhLogo";
import { useAuth } from "@/lib/auth-context";

const NAV = [
  { label: "Shop", to: "/shop" as const },
  { label: "Bulk & B2B", to: "/shop" as const },
  { label: "Our Story", to: "/our-story" as const },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="surface-emerald fixed inset-x-0 top-0 z-50 py-2 text-center text-[10px] font-bold tracking-[0.18em] uppercase">
        Free delivery over £60 · inside the 5 km ring · 90-minute windows
      </div>

      <header
        className={`fixed inset-x-0 top-[30px] z-50 transition-all duration-500 ${
          scrolled ? "glass-panel shadow-elevated border-x-0 border-t-0" : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <AlhLogo className="size-9 shrink-0 text-gold" variant="mark" />
            <span className="min-w-0">
              <span className="font-display block truncate text-[15px] leading-none font-extrabold tracking-tight">
                Al-Haram
              </span>
              <span className="text-muted-foreground block truncate text-[9px] tracking-[0.24em] uppercase">
                Wholesale &amp; Cash Carry
              </span>
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <div className="mr-2 hidden items-center gap-1 lg:flex">
              {NAV.map((n) => (
                <Link
                  key={n.label}
                  to={n.to}
                  className="hover:text-emerald rounded-full px-4 py-2 text-[13px] font-semibold transition-colors"
                >
                  {n.label}
                </Link>
              ))}
            </div>
            <button
              aria-label="Search the catalogue"
              className="glass-panel hover:gold-glow grid size-10 place-items-center rounded-full transition-all duration-400"
            >
              <Search className="size-4" />
            </button>
            <button
              aria-label="Basket"
              className="glass-panel hover:gold-glow relative grid size-10 place-items-center rounded-full transition-all duration-400"
            >
              <ShoppingBag className="size-4" />
              <span className="surface-emerald absolute top-1.5 right-1.5 grid size-4 place-items-center rounded-full text-[9px] font-bold">
                3
              </span>
            </button>

            {user ? (
              <button
                onClick={signOut}
                aria-label="Sign out"
                className="glass-panel hover:gold-glow grid size-10 place-items-center rounded-full transition-all duration-400"
              >
                <LogOut className="size-4" />
              </button>
            ) : (
              <Link
                to="/login"
                aria-label="Sign in"
                className="glass-panel hover:gold-glow grid size-10 place-items-center rounded-full transition-all duration-400"
              >
                <LogIn className="size-4" />
              </Link>
            )}

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="glass-panel hover:gold-glow grid size-10 place-items-center rounded-full transition-all duration-400 lg:hidden"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="bg-foreground/40 absolute inset-0" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel absolute inset-y-0 right-0 flex w-[86vw] max-w-sm flex-col overflow-y-auto p-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-extrabold">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="glass-panel hover:gold-glow grid size-9 place-items-center rounded-full transition-all duration-400"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="mt-8 space-y-1">
                {NAV.map((n) => (
                  <Link
                    key={n.label}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="font-display block py-2.5 text-2xl font-extrabold tracking-tight"
                  >
                    {n.label}
                  </Link>
                ))}
              </div>

              <p className="eyebrow mt-10">Departments</p>
              <div className="mt-4 space-y-1">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    to="/category/$slug"
                    params={{ slug: c.slug }}
                    onClick={() => setOpen(false)}
                    className="text-muted-foreground hover:text-emerald block py-1.5 text-[14px] font-semibold transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>

              <div className="mt-10 border-t border-gold/15 pt-6">
                {user ? (
                  <button
                    onClick={() => { signOut(); setOpen(false); }}
                    className="glass-panel hover:gold-glow flex w-full items-center gap-2 rounded-full px-4 py-3 text-[13px] font-bold transition-all"
                  >
                    <LogOut className="size-4" /> Sign out
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="glass-panel hover:gold-glow flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-[13px] font-bold transition-all"
                    >
                      <LogIn className="size-4" /> Sign in
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setOpen(false)}
                      className="surface-emerald flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-[13px] font-bold transition-all"
                    >
                      <User className="size-4" /> Register
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
