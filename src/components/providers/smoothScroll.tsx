"use client";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

// Lenis smooths wheel scrolling but keeps native scroll position, so motion's useScroll keeps working.
// Turned off entirely for people who prefer reduced motion.
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: { offset: 0 } }}>
      {children}
    </ReactLenis>
  );
}
