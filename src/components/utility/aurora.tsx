"use client";
import { useEffect, useRef } from "react";

/*
  Ambient light field behind the dark sections: four additive radial gradients
  drifting on slow Lissajous paths.

  It replaces the "big background video" every agency site ships, at about three
  orders of magnitude less bandwidth. Two things keep it cheap:

  1. The canvas is 288 x 162 and stretched by CSS. Bilinear filtering does the
     blurring for free, so there is no `filter: blur()` anywhere near it.
  2. It only draws while it is on screen, only when the tab is visible, and only
     at ~30fps. Off-screen sections cost exactly nothing.

  Reduced-motion users get one static frame.
*/

const W = 288;
const H = 162;

const BLOBS = [
  { c: [255, 210, 63], a: 0.5, x: 0.28, y: 0.36, r: 0.5, sx: 0.17, sy: 0.12, p: 0.0 },
  { c: [125, 211, 252], a: 0.42, x: 0.76, y: 0.6, r: 0.46, sx: 0.12, sy: 0.19, p: 1.7 },
  { c: [167, 139, 250], a: 0.34, x: 0.56, y: 0.18, r: 0.42, sx: 0.21, sy: 0.15, p: 3.1 },
  { c: [52, 211, 153], a: 0.2, x: 0.16, y: 0.82, r: 0.34, sx: 0.1, sy: 0.17, p: 4.6 },
] as const;

type Props = {
  className?: string;
  /** Multiplies the blob opacity. 1 is the hero setting; 0.6 suits text-heavy areas. */
  intensity?: number;
};

export default function Aurora({ className = "", intensity = 1 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;

    canvas.width = W;
    canvas.height = H;

    const frame = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      for (const b of BLOBS) {
        const x = (b.x + Math.sin(t * b.sx + b.p) * 0.15) * W;
        const y = (b.y + Math.cos(t * b.sy + b.p * 1.4) * 0.15) * H;
        const radius = b.r * Math.max(W, H) * (1 + Math.sin(t * 0.21 + b.p) * 0.08);
        const alpha = b.a * intensity;

        const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
        g.addColorStop(0, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},${alpha})`);
        g.addColorStop(0.5, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},${alpha * 0.34})`);
        g.addColorStop(1, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      ctx.globalCompositeOperation = "source-over";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame(0);
      return;
    }

    let raf = 0;
    let visible = false;
    let last = 0;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      // ~30fps is indistinguishable for light this diffuse
      if (now - last < 33) return;
      last = now;
      if (!document.hidden) frame(now / 1000);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !visible) {
        visible = true;
        raf = requestAnimationFrame(loop);
      } else if (!entry.isIntersecting && visible) {
        visible = false;
        cancelAnimationFrame(raf);
      }
    });

    io.observe(canvas);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [intensity]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none h-full w-full ${className}`} />;
}
