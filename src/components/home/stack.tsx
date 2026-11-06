"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import services from "@/data/services.json";
import TiltCard, { Depth } from "../utility/tiltCard";
import SectionHeading from "../utility/sectionHeading";

type Tool = (typeof services)[number];

/** "#61DAFB" -> "97 218 251", the format TiltCard's glow expects */
const rgb = (hex: string) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
};

const Tile = ({ tool, fixed = true }: { tool: Tool; fixed?: boolean }) => (
  <li className={fixed ? "w-[10.5rem] shrink-0 md:w-52" : ""}>
    <TiltCard max={12} glow={rgb(tool.accent)} className="panel rounded-[1.6rem]">
      <div className="flex flex-col items-center gap-3 px-5 py-7 [transform-style:preserve-3d] md:py-8">
        <Depth z={45}>
          <span className="relative grid h-16 w-16 place-items-center">
            {/* Each logo sits on its own brand-coloured bloom */}
            <span
              aria-hidden
              className="absolute inset-2 rounded-full opacity-40 blur-xl"
              style={{ background: tool.accent }}
            />
            <Image
              src={tool.logo}
              alt=""
              width={56}
              height={56}
              className="relative h-12 w-12 rounded-xl object-contain"
            />
          </span>
        </Depth>
        <Depth z={25} className="text-center">
          <span className="block text-sm font-semibold text-paper">{tool.desc}</span>
          <span className="mt-1 block text-[0.62rem] font-medium uppercase tracking-[0.16em] text-mist">
            {tool.usage}
          </span>
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
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-26%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-26%", "0%"]);

  const half = Math.ceil(services.length / 2);
  const repeat = (list: Tool[]) => [...list, ...list, ...list];

  return (
    <section id="stack" ref={ref} aria-labelledby="stack-title" className="relative scroll-mt-24 overflow-hidden bg-void py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_100%_0%,rgb(125_211_252/0.12),transparent_60%),radial-gradient(60%_50%_at_0%_100%,rgb(255_210_63/0.1),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-10">
        <SectionHeading
          id="stack-title"
          eyebrow="02 — Stack"
          title="The tools I work with"
          lead={
            <>
              Most of my day is .NET and Angular on Citilink&apos;s platforms. Elsewhere I&apos;ve built with Next.js,
              Node, Laravel and CodeIgniter.
            </>
          }
        />
      </div>

      {reduce ? (
        <ul className="relative mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-4 md:px-10">
          {services.map((tool) => (
            <Tile key={tool.id} tool={tool} fixed={false} />
          ))}
        </ul>
      ) : (
        <div className="mask-x relative mt-14 flex flex-col gap-4 md:mt-20 md:gap-5">
          {/* Readable list for screen readers; the moving rows are decorative duplicates */}
          <ul className="sr-only">
            {services.map((tool) => (
              <li key={tool.id}>
                {tool.desc} — {tool.usage}
              </li>
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
