"use client";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

// Lenis smooths wheel scrolling but keeps native scroll position, so motion's useScroll keeps working.
// Turned off entirely for people who prefer reduced motion.
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    // -88px clears the floating navbar so anchor targets never land under it
    <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -88 } }}>
      {children}
    </ReactLenis>
  );
}
