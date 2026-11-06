"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Sparkles } from "lucide-react";
import { useRange } from "../hooks/useRange";
import { SITE } from "@/data/site";

const TEXT = `I'm a full-stack web developer in ${SITE.country}. At ${SITE.company} I maintain and rebuild the booking websites: the main site, ticket booking, and the portals for travel agents, corporate clients and group bookings. Before that I shipped frontend work at Home Credit and built a learning platform at Nusa Tekno Global.`;

const FACTS = ["Booking systems at scale", "Server-rendered frontends", "Design that ships"];

const Word = ({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) => {
  // Dimmed words stay readable — this is a focus effect, not a hide-and-reveal.
  const opacity = useRange(progress, range, [0.22, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  );
};

// The paragraph is pinned while each word lights up in reading order
const About = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end end"] });
  const ruleScale = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
  const words = TEXT.split(" ");

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-title"
      className={`relative isolate scroll-mt-24 bg-void ${reduce ? "" : "h-[170svh]"}`}
    >
      {/* Static light, no canvas here: this section holds no motion background on purpose */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_15%_0%,rgb(167_139_250/0.14),transparent_60%),radial-gradient(70%_60%_at_85%_100%,rgb(255_210_63/0.1),transparent_60%)]"
      />

      <div className={`${reduce ? "relative" : "sticky top-0 h-svh"} flex items-center overflow-hidden px-4 py-10 md:px-10 md:py-24`}>
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex items-center gap-3">
            <p className="eyebrow">01 — About</p>
            <motion.span
              aria-hidden
              style={reduce ? undefined : { scaleX: ruleScale }}
              className="h-px flex-1 origin-left bg-gradient-to-r from-white/25 to-transparent"
            />
          </div>

          <h2 id="about-title" className="sr-only">
            About me
          </h2>

          <p className="mt-6 max-w-5xl text-[clamp(1.35rem,3.3vw,3.1rem)] font-semibold leading-[1.18] tracking-tight text-paper [font-variation-settings:'wdth'_92]">
            {reduce
              ? TEXT
              : words.map((word, i) => {
                  const start = (i / words.length) * 0.85;
                  return (
                    <Word key={i} progress={scrollYProgress} range={[start, start + 0.85 / words.length + 0.04]}>
                      {word}
                    </Word>
                  );
                })}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-2.5">
            {FACTS.map((fact) => (
              <span
                key={fact}
                className="panel inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.8rem] font-medium text-paper/90"
              >
                <Sparkles aria-hidden className="h-3 w-3 text-signal" />
                {fact}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
