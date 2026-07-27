"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Registers ScrollTrigger once, client-side only. */
export function useGsapReady() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

/**
 * Scoped GSAP context. The callback receives the container element and runs
 * inside a gsap.context so every tween/trigger is reverted on unmount.
 */
export function useGsap<T extends HTMLElement>(
  setup: (el: T, ctx: gsap.Context) => void,
  deps: unknown[] = [],
) {
  const ref = useRef<T | null>(null);
  useGsapReady();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context((self) => setup(el, self), el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
