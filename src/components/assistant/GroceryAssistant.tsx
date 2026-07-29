"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Send, X } from "lucide-react";
import { IMAGES } from "@/lib/catalog";
import { AlhLogo } from "@/components/site/AlhLogo";

type Msg = { id: number; role: "assistant" | "user"; text: string };

const ONBOARDING: Msg[] = [
  {
    id: 1,
    role: "assistant",
    text: "Assalamu alaikum — I'm Chef Haram, your grocery assistant. Tell me a dish and I'll map every ingredient to an aisle, a pack size and a trade price.",
  },
  {
    id: 2,
    role: "assistant",
    text: "Try: Chicken biryani for 12. I will map Basmati 20 kg (Aisle 7 Bulk Grains), Chicken thigh fillet 12 kg case (Butchery counter), Garam masala 500 g (Aisle 4 Spices), Greek yoghurt 1 kg (Chill wall 2).",
  },
];

const CHIPS = ["Biryani for 12", "Restaurant breakfast prep", "Weekly family basket"];

const CANNED =
  "Noted. Once the POS catalogue is connected I'll price this live, check stock at your nearest counter and drop it straight into a delivery slot inside the 5 km ring.";

const ORBIT_LABELS = [
  "Fresh produce",
  "Halal butchery",
  "Bulk grains",
  "Spices & pantry",
  "Dairy & chill",
  "Bakery",
];

export function GroceryAssistant() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(ONBOARDING);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, role: "user", text: trimmed },
      { id: prev.length + 2, role: "assistant", text: CANNED },
    ]);
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <div className="fixed right-4 bottom-4 z-[70] sm:right-6 sm:bottom-6">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="panel"
            initial={reduced ? false : { opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel shadow-elevated flex h-[min(72vh,560px)] w-[min(92vw,384px)] flex-col overflow-hidden rounded-3xl"
          >
            <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-gold/15 px-4 py-3.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-black/40 ring-1 ring-gold/30">
                <AlhLogo className="size-6 text-gold" variant="mark" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-bold text-foreground">Chef Haram</p>
                <p className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
                  <span className="size-1.5 rounded-full bg-gold" /> Recipe &amp; aisle mapping
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="glass-panel hover:gold-glow grid size-8 shrink-0 place-items-center rounded-full transition-all duration-400"
              >
                <X className="size-4" />
              </button>
            </header>

            <div className="relative h-20 shrink-0 overflow-hidden border-b border-gold/15">
              <img
                src={IMAGES.freshProduce}
                alt="Fresh produce for recipe mapping"
                loading="lazy"
                className="size-full object-cover opacity-60"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, color-mix(in oklab, oklch(0.2 0.09 27) 82%, transparent), transparent 80%)",
                }}
              />
              <p className="absolute inset-y-0 left-4 flex items-center text-[10px] font-bold tracking-[0.22em] text-gold uppercase">
                Fresh today
              </p>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={m.role === "user" ? "flex justify-end" : ""}
                >
                  <p
                    className={
                      m.role === "user"
                        ? "surface-emerald max-w-[85%] rounded-2xl rounded-br-sm px-3.5 py-2.5 text-[13px] leading-relaxed"
                        : "text-foreground max-w-[92%] text-[13px] leading-relaxed"
                    }
                  >
                    {m.text}
                  </p>
                </motion.div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="border-t border-gold/15 px-3 pt-3 pb-3">
              <div className="no-scrollbar mb-2.5 flex gap-2 overflow-x-auto">
                {CHIPS.map((c) => (
                  <button
                    key={c}
                    onClick={() => send(c)}
                    className="glass-panel hover:gold-glow shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap transition-all duration-400"
                  >
                    {c}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(value);
                }}
                className="glass-panel flex items-center gap-2 rounded-full py-1 pr-1 pl-4"
              >
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Ask for a recipe or a basket…"
                  className="min-w-0 flex-1 bg-transparent py-2 text-[13px] text-foreground outline-none placeholder:text-muted-foreground/60"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  className="surface-emerald grid size-8 shrink-0 place-items-center rounded-full"
                >
                  <Send className="size-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="fab"
            onClick={() => setOpen(true)}
            aria-label="Open the Al-Haram grocery assistant"
            initial={reduced ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="relative grid size-20 place-items-center rounded-full"
          >
            {/* Pulsing rings */}
            {!reduced && (
              <>
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-gold opacity-30"
                  animate={{ scale: [1, 1.55, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-gold/50"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                />
              </>
            )}

            {/* Orbiting labels */}
            {!reduced && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {ORBIT_LABELS.map((label, i) => {
                  const angle = (i / ORBIT_LABELS.length) * Math.PI * 2;
                  const radius = 58;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  return (
                    <div
                      key={label}
                      className="absolute top-1/2 left-1/2"
                      style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}
                    >
                      <motion.span
                        className="glass-panel block whitespace-nowrap rounded-full px-2.5 py-1 text-[9px] font-bold tracking-wide text-gold"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        {label}
                      </motion.span>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* Avatar center */}
            <motion.span
              className="surface-ink relative grid size-20 place-items-center rounded-full ring-2 ring-gold shadow-emerald-lg"
              animate={reduced ? undefined : { scale: [1, 1.04, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <AlhLogo className="size-12 text-gold" variant="mark" />
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
