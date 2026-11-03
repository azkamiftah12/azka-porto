import { useTransform, type MotionValue } from "motion/react";

/*
  Linear, clamped mapping of a scroll-progress value: [inStart, inEnd] → [outStart, outEnd].

  Use this instead of useTransform(progress, [a, b], [c, d]) when the result drives `opacity`
  (or other compositor-only props): motion then hands the array form to a native ScrollTimeline,
  which mis-measures our sticky sections and leaves the value stuck. The function form below
  always runs on the main thread, so it stays in sync with the other scroll transforms.
*/
export function useRange(value: MotionValue<number>, [inStart, inEnd]: [number, number], [outStart, outEnd]: [number, number]) {
  return useTransform(value, (v) => {
    const t = Math.min(1, Math.max(0, (v - inStart) / (inEnd - inStart)));
    return outStart + (outEnd - outStart) * t;
  });
}
