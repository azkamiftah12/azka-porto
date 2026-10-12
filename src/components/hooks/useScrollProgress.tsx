"use client";
import { useEffect, useRef } from "react";

type Options = {
  lead?: number; // how early (fraction of viewport height) the animation starts
  reversible?: boolean; // true = scrubs backwards when scrolling up
};

export function useScrollProgress<T extends HTMLElement>({ lead = 0.5, reversible = true }: Options = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const track = ref.current;
    if (!track) return;

    let target = 0;
    let current = 0;
    let max = 0;
    let raf = 0;

    const readProgress = () => {
      const vh = window.innerHeight;
      const rect = track.getBoundingClientRect();
      const scrollable = rect.height - vh;
      let p = (vh * lead - rect.top) / (scrollable + vh * lead);
      p = Math.min(1, Math.max(0, p));
      if (!reversible) {
        max = Math.max(max, p);
        p = max;
      }
      return p;
    };

    const tick = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0005) current = target;
      track.style.setProperty("--p", current.toFixed(4));
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    target = current = readProgress();
    track.style.setProperty("--p", current.toFixed(4));

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [lead, reversible]);

  return ref;
}