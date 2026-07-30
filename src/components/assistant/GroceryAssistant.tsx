"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Send, X } from "lucide-react";
import { IMAGES } from "@/lib/catalog";

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
    text: "Try: “Chicken biryani for 12” → Basmati 20 kg (Aisle 7 · Bulk Grains), Chicken thigh fillet 12 kg case (Butchery counter), Garam masala 500 g (Aisle 4 · Spices), Greek yoghurt 1 kg (Chill wall 2).",
  },
];

const CHIPS = ["Biryani for 12", "Restaurant breakfast prep", "Weekly family basket"];

const CANNED =
  "Noted. Once the POS catalogue is connected I'll price this live, check stock at your nearest counter and drop it straight into a delivery slot inside the 5 km ring.";

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
            <header className="border-border/60 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b px-4 py-3.5">
              <span className="surface-emerald grid size-9 shrink-0 place-items-center rounded-full text-base">
                👨‍🍳
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-bold">Chef Haram</p>
                <p className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
                  <span className="bg-emerald size-1.5 rounded-full" /> Recipe &amp; aisle mapping
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

            <div className="border-border/60 border-t px-3 pt-3 pb-3">
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
                  className="min-w-0 flex-1 bg-transparent py-2 text-[13px] outline-none"
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
            className="shadow-emerald-lg relative grid size-15 place-items-center rounded-full"
          >
            {!reduced && (
              <>
                <motion.span
                  aria-hidden="true"
                  className="bg-emerald absolute inset-0 rounded-full opacity-30"
                  animate={{ scale: [1, 1.45, 1], opacity: [0.32, 0, 0.32] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.span
                  aria-hidden="true"
                  className="border-emerald/50 absolute inset-0 rounded-full border"
                  animate={{ scale: [1, 1.22, 1] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                />
              </>
            )}
            <motion.span
              className="surface-emerald relative grid size-15 place-items-center rounded-full text-2xl"
              animate={reduced ? undefined : { scale: [1, 1.06, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              👨‍🍳
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
