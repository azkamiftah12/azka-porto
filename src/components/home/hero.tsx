"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionStyle } from "motion/react";
import { useRange } from "../hooks/useRange";

const ease = [0.22, 1, 0.36, 1] as const;

/*
  Pinned for 1.5 screens of scroll:
  0    → 0.65  the portrait grows from a card to full-bleed while the two name lines widen and drift apart
  0.6  → 0.8   the caption fades in over the photo
*/
const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const open = useTransform(p, [0, 0.65], [0, 1]);
  const imgScale = useTransform(p, [0, 0.65], [1.18, 1]);
  const leftX = useTransform(p, [0, 0.6], ["0vw", "-28vw"]);
  const rightX = useTransform(p, [0, 0.6], ["0vw", "28vw"]);
  const width = useTransform(p, [0, 0.6], [78, 125], { clamp: true });
  const fontVariationSettings = useTransform(width, (w) => `"wdth" ${w.toFixed(1)}`);
  const introOpacity = useRange(p, [0, 0.12], [1, 0]);
  const captionOpacity = useRange(p, [0.58, 0.78], [0, 1]);
  const captionY = useRange(p, [0.58, 0.78], [48, 0]);

  const nameStyle = (x: typeof leftX): MotionStyle => (reduce ? { fontVariationSettings: '"wdth" 78' } : { x, fontVariationSettings });

  return (
    <section id="home" ref={ref} className={reduce ? "relative" : "relative h-[250svh]"} aria-label="Introduction">
      <div className={`${reduce ? "relative min-h-svh" : "sticky top-0 h-svh"} overflow-hidden bg-paper`}>
        {/* Name, top line */}
        <h1 className="display absolute inset-x-0 top-[13svh] whitespace-nowrap px-4 text-[min(15vw,14svh)] md:px-10 md:text-[min(11vw,15svh)]">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block"
              style={nameStyle(leftX)}
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, ease, delay: 0.1 }}
            >
              Azka Miftah
            </motion.span>
          </span>
          <span className="sr-only"> Muhammad</span>
        </h1>

        {/* Name, bottom line + intro */}
        <div className="absolute inset-x-0 bottom-[8svh] flex flex-col gap-4 px-4 md:bottom-[5svh] md:flex-row-reverse md:items-end md:justify-between md:px-10">
          <div aria-hidden className="display overflow-hidden whitespace-nowrap pb-[0.06em] text-right text-[min(15vw,14svh)] md:text-[min(11vw,15svh)]">
            <motion.span
              className="block"
              style={nameStyle(rightX)}
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, ease, delay: 0.22 }}
            >
              Muhammad
            </motion.span>
          </div>
          <motion.p
            className="max-w-[17rem] text-base leading-snug text-graphite md:mb-3 md:text-lg"
            style={reduce ? undefined : { opacity: introOpacity }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.6 }}
            >
              Full-stack web developer at Citilink.
            </motion.span>
          </motion.p>
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
                src="/img/azka-generated.png"
                alt="Portrait of Azka Miftah Muhammad"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[50%_18%]"
              />
            </motion.div>
          </motion.div>

          {!reduce && (
            <motion.div
              className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/90 via-ink/30 to-transparent px-4 pb-[10svh] md:px-10"
              style={{ opacity: captionOpacity }}
            >
              <motion.div style={{ y: captionY }} className="max-w-3xl text-paper">
                <p className="text-[clamp(1.75rem,4.4vw,3.75rem)] font-bold leading-[1.05] tracking-tight [font-variation-settings:'wdth'_92]">
                  I build and maintain the websites people use to book Citilink flights.
                </p>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
