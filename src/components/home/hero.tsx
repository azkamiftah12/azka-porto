"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionStyle } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRange } from "../hooks/useRange";
import Aurora from "../utility/aurora";
import MainButton from "../utility/mainButton";
import { SITE } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

/*
  Pinned for 1.5 screens of scroll:
  0    → 0.62  the portrait grows from a glass card to full-bleed while the two
                name lines widen and drift apart
  0.55 → 0.76  the caption fades in over the photo

  The frame growth is interpolated in CSS from the --open variable (see
  .hero-photo in globals.css) so the heavy part never touches React.
*/
const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const open = useTransform(p, [0, 0.62], [0, 1]);
  const imgScale = useTransform(p, [0, 0.62], [1.16, 1]);
  const leftX = useTransform(p, [0, 0.58], ["0vw", "-26vw"]);
  const rightX = useTransform(p, [0, 0.58], ["0vw", "26vw"]);
  const width = useTransform(p, [0, 0.58], [78, 124], { clamp: true });
  const fontVariationSettings = useTransform(width, (w) => `"wdth" ${w.toFixed(1)}`);
  const introOpacity = useRange(p, [0, 0.15], [1, 0]);
  const chromeOpacity = useRange(p, [0, 0.12], [1, 0]);
  const frameOpacity = useRange(p, [0.05, 0.3], [1, 0]);
  const captionOpacity = useRange(p, [0.55, 0.76], [0, 1]);
  const captionY = useRange(p, [0.55, 0.76], [56, 0]);

  const nameStyle = (x: typeof leftX): MotionStyle =>
    reduce ? { fontVariationSettings: '"wdth" 78' } : { x, fontVariationSettings };

  return (
    <section id="home" ref={ref} className={reduce ? "relative" : "relative h-[250svh]"} aria-label="Introduction">
      <div className={`${reduce ? "relative min-h-svh" : "sticky top-0 h-svh"} overflow-hidden bg-void`}>
        {/* Ambient light: a drifting canvas field instead of a background video */}
        <div aria-hidden className="absolute inset-0 opacity-80">
          <Aurora />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(125%_95%_at_50%_-15%,transparent_18%,rgb(5_8_10/0.6)_58%,rgb(5_8_10/0.95)_100%)]"
        />
        <div
          aria-hidden
          className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(65%_55%_at_50%_45%,#000,transparent)]"
        />

        {/* Name, top line */}
        <h1 className="display absolute inset-x-0 top-[12svh] whitespace-nowrap px-4 text-[min(13.5vw,13svh)] md:px-10 md:text-[min(10.5vw,14svh)]">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block text-paper"
              style={nameStyle(leftX)}
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, ease, delay: 0.1 }}
            >
              {SITE.first}
            </motion.span>
          </span>
          <span className="sr-only"> {SITE.last}</span>
        </h1>

        {/* Name, bottom line + intro. Status sits with the CTA rather than in the
            navbar band, where it was hidden behind the floating bar. */}
        <div className="absolute inset-x-0 bottom-[7svh] z-20 flex flex-col gap-5 px-4 md:bottom-[4.5svh] md:flex-row-reverse md:items-end md:justify-between md:px-10">
          <div
            aria-hidden
            className="display overflow-hidden whitespace-nowrap pb-[0.06em] text-right text-[min(13.5vw,13svh)] md:text-[min(10.5vw,14svh)]"
          >
            <motion.span
              className="block text-paper"
              style={nameStyle(rightX)}
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, ease, delay: 0.22 }}
            >
              {SITE.last}
            </motion.span>
          </div>

          <motion.div style={reduce ? undefined : { opacity: introOpacity }} className="max-w-sm">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="glass glass-edge inline-flex items-center gap-2.5 rounded-full py-2 pl-3 pr-4 text-xs font-medium text-paper">
                <span aria-hidden className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-jade opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-jade" />
                </span>
                {SITE.availability}
              </span>
              <span className="eyebrow hidden sm:block">{SITE.country} — working worldwide</span>
            </div>

            <p className="mt-4 text-base leading-snug text-mist md:text-lg">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.55 }}
              >
                <span className="text-paper">{SITE.role}</span> at {SITE.company}. I keep the booking
                platforms people use to fly running.
              </motion.span>
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <MainButton href="#contact" variant="primary" icon={<ArrowUpRight aria-hidden className="h-4 w-4" />}>
                Start a project
              </MainButton>
              <MainButton href="#projects" variant="glass">
                See the work
              </MainButton>
            </div>
          </motion.div>
        </div>

        {/* Portrait that opens to full-bleed */}
        <motion.div
          className="hero-photo z-10 bg-ink"
          style={reduce ? undefined : ({ "--open": open } as MotionStyle)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease, delay: 0.25 }}
        >
          {/* .hero-photo owns the CSS transform, so entrance + parallax scale live on inner wrappers */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease, delay: 0.25 }}
          >
            <motion.div className="absolute inset-0" style={reduce ? undefined : { scale: imgScale }}>
              <Image
                src="/img/portrait.webp"
                alt="Portrait of Azka Miftah Muhammad"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[50%_18%]"
              />
            </motion.div>
          </motion.div>

          {/* Glass rim that melts away as the card becomes full-bleed */}
          {!reduce && (
            <motion.div
              aria-hidden
              style={{ opacity: frameOpacity }}
              className="pointer-events-none absolute inset-0 rounded-[inherit] [box-shadow:inset_0_1px_0_rgb(255_255_255/0.28),inset_0_0_0_1px_rgb(255_255_255/0.12),inset_0_-60px_120px_-40px_rgb(5_8_10/0.85)]"
            />
          )}

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/85 via-void/5 to-void/20"
          />

          {!reduce && (
            <motion.div
              className="absolute inset-0 flex items-end bg-gradient-to-t from-void via-void/40 to-transparent px-4 pb-[10svh] md:px-10"
              style={{ opacity: captionOpacity }}
            >
              <motion.div style={{ y: captionY }} className="max-w-3xl">
                <p className="text-[clamp(1.6rem,4vw,3.5rem)] font-bold leading-[1.06] tracking-tight text-paper [font-variation-settings:'wdth'_92]">
                  {SITE.headline}
                </p>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Scroll cue */}
        {!reduce && (
          <motion.div
            style={{ opacity: chromeOpacity }}
            className="absolute bottom-[4svh] left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
          >
            <span className="eyebrow text-[0.62rem]">Scroll</span>
            <span aria-hidden className="relative h-10 w-px overflow-hidden bg-white/15">
              <motion.span
                className="absolute inset-x-0 top-0 h-4 bg-signal"
                animate={{ y: [-16, 44] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            <ArrowDown aria-hidden className="h-3 w-3 text-mist" />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero;
