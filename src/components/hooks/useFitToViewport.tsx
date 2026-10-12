"use client";
import { useEffect, useRef } from "react";

// Sets --fit (0..1) on the sticky container so the panel never exceeds the screen height
export function useFitToViewport(minScale = 0.5) {
  const stickyRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sticky = stickyRef.current;
    const panel = panelRef.current;
    if (!sticky || !panel) return;

    const fit = () => {
      const cs = getComputedStyle(sticky);
      const available = sticky.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      const natural = panel.offsetHeight; // layout height, unaffected by transforms
      const scale = natural > 0 ? Math.min(1, Math.max(minScale, available / natural)) : 1;
      sticky.style.setProperty("--fit", scale.toFixed(4));
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(panel);
    ro.observe(sticky);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [minScale]);

  return { stickyRef, panelRef };
}