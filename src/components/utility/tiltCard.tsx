"use client";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

/*
  3D card that tilts toward the mouse, lifts on hover, and casts a layered shadow
  that shifts opposite the tilt (as if lit from above). Children wrapped in
  <Depth> float above the surface. Touch input and reduced-motion users get the
  static card with its resting shadow.
*/

const SHADOWS = {
  dark: { rgb: "0 0 0", rest: 0.45, hover: 0.8 },
  light: { rgb: "11 18 21", rest: 0.1, hover: 0.24 },
} as const;

type Props = {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees */
  max?: number;
  shadow?: keyof typeof SHADOWS;
  /** Optional coloured halo under the card on hover, as "r g b" */
  glow?: string;
};

const spring = { stiffness: 260, damping: 24, mass: 0.6 };

export default function TiltCard({ children, className = "", max = 10, shadow = "dark", glow = "0 0 0" }: Props) {
  const reduce = !!useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hovered = useMotionValue(0);
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const lift = useSpring(hovered, spring);

  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const scale = useTransform(lift, [0, 1], [1, 1.03]);
  const y = useTransform(lift, [0, 1], [0, -8]);

  const s = SHADOWS[shadow];
  const offX = useTransform(sx, [0, 1], [16, -16]);
  const offY = useTransform(() => 14 + lift.get() * 26 + (sy.get() - 0.5) * -14);
  const blur = useTransform(lift, [0, 1], [30, 70]);
  const alpha = useTransform(lift, [0, 1], [s.rest, s.hover]);
  const glowAlpha = useTransform(lift, [0, 1], [0, glow === "0 0 0" ? 0 : 0.35]);
  const boxShadow = useMotionTemplate`0 1px 2px rgb(${s.rgb} / 0.1), 0 6px 14px -4px rgb(${s.rgb} / 0.14), ${offX}px ${offY}px ${blur}px -14px rgb(${s.rgb} / ${alpha}), 0 24px 70px -20px rgb(${glow} / ${glowAlpha})`;

  const gx = useTransform(sx, [0, 1], [0, 100]);
  const gy = useTransform(sy, [0, 1], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgb(255 255 255 / 0.22), rgb(255 255 255 / 0) 55%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    hovered.set(1);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    hovered.set(0);
  };

  return (
    <motion.div
      className={`relative [transform-style:preserve-3d] ${className}`}
      style={reduce ? { boxShadow } : { rotateX, rotateY, scale, y, transformPerspective: 1000, boxShadow }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glare, opacity: lift }}
        />
      )}
    </motion.div>
  );
}

/** Lifts its children off the card surface by `z` pixels */
export const Depth = ({ z = 40, className = "", children }: { z?: number; className?: string; children: ReactNode }) => (
  <div className={className} style={{ transform: `translateZ(${z}px)` } as CSSProperties}>
    {children}
  </div>
);
