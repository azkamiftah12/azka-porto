"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, type MotionValue } from "motion/react";
import { useRange } from "../hooks/useRange";

const TEXT =
  "I'm a full-stack web developer. At Citilink I maintain and rebuild the booking websites: the main site, ticket booking, and the portals for travel agents, corporate clients and group bookings. Before that I shipped frontend work at Home Credit and built a learning platform at Nusa Tekno Global.";

const Word = ({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) => {
  const opacity = useRange(progress, range, [0.16, 1]);
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
  const words = TEXT.split(" ");

  return (
    <section id="about" ref={ref} className={`relative bg-ink text-paper ${reduce ? "" : "h-[220svh]"}`}>
      <div className={`${reduce ? "" : "sticky top-0 h-svh"} flex items-center px-4 py-24 md:px-10`}>
        <div className="mx-auto w-full max-w-5xl">
          <h2 className="sr-only">About me</h2>
          <p className="text-[clamp(1.6rem,3.9vw,3.4rem)] font-semibold leading-[1.15] tracking-tight [font-variation-settings:'wdth'_92]">
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
        </div>
      </div>
    </section>
  );
};

export default About;
