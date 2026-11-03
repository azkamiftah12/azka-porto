"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import services from "@/data/services.json";
import TiltCard, { Depth } from "../utility/tiltCard";

type Tool = (typeof services)[number];

const Tile = ({ tool, fixed = true }: { tool: Tool; fixed?: boolean }) => (
  <li className={fixed ? "w-44 shrink-0 md:w-56" : ""}>
    <TiltCard max={14} className="rounded-[1.75rem] border border-ink/[0.06] bg-white">
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-8 [transform-style:preserve-3d] md:py-10">
        <Depth z={45}>
          <Image src={tool.logo} alt="" width={64} height={64} className="h-14 w-14 object-contain drop-shadow-[0_8px_10px_rgb(11_18_21/0.18)] md:h-16 md:w-16" />
        </Depth>
        <Depth z={25}>
          <span className="text-base font-semibold md:text-lg">{tool.desc}</span>
        </Depth>
      </div>
    </TiltCard>
  </li>
);

const Row = ({ tools, x }: { tools: Tool[]; x?: MotionValue<string> }) => (
  <motion.ul style={x ? { x } : undefined} className="flex w-max gap-4 md:gap-5" aria-hidden={x ? true : undefined}>
    {tools.map((tool, i) => (
      <Tile key={`${tool.id}-${i}`} tool={tool} />
    ))}
  </motion.ul>
);

// Two rows of tiles slide in opposite directions as the section passes through the viewport
const Stack = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  const half = Math.ceil(services.length / 2);
  const repeat = (list: Tool[]) => [...list, ...list, ...list, ...list];

  return (
    <section id="stack" ref={ref} className="overflow-hidden bg-paper py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-4 md:px-10">
        <h2 className="display max-w-4xl text-balance text-[clamp(2.75rem,7vw,6rem)] [font-variation-settings:'wdth'_100]">The tools I work with</h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-graphite md:text-xl">
          Most of my day is .NET and Angular on Citilink&apos;s platforms. Elsewhere I&apos;ve built with Next.js, Node, Laravel and CodeIgniter.
        </p>
      </div>

      {reduce ? (
        <ul className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-4 md:px-10">
          {services.map((tool) => (
            <Tile key={tool.id} tool={tool} fixed={false} />
          ))}
        </ul>
      ) : (
        <div className="mt-16 flex flex-col gap-4 md:mt-24 md:gap-5">
          {/* Readable list for screen readers; the moving rows are decorative duplicates */}
          <ul className="sr-only">
            {services.map((tool) => (
              <li key={tool.id}>{tool.desc}</li>
            ))}
          </ul>
          <Row tools={repeat(services.slice(0, half))} x={x1} />
          <Row tools={repeat(services.slice(half))} x={x2} />
        </div>
      )}
    </section>
  );
};

export default Stack;
