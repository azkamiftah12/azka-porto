"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
import experiences from "@/data/experiences.json";

type Job = (typeof experiences)[number];

const Logo = ({ job, size }: { job: Job; size: number }) => (
  <span
    className="block shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/15"
    style={{ width: size, height: size, background: job.brandColor }}
  >
    <Image src={job.logo} alt="" width={size} height={size} className="h-full w-full object-cover" />
  </span>
);

// One role on the right-hand side; reports when it reaches the middle of the screen
const Role = ({ job, index, active, onActive }: { job: Job; index: number; active: boolean; onActive: (i: number) => void }) => {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="relative flex flex-col justify-center py-14 md:min-h-[85svh] md:py-0">
      <div className="mb-5 flex items-center gap-4 md:hidden">
        <Logo job={job} size={44} />
        <div>
          <p className="font-bold text-paper">{job.office}</p>
          <p className="text-sm text-mist">
            {job.dateFrom} to {job.dateTo}
          </p>
        </div>
      </div>

      <div className="hidden items-baseline gap-3 md:flex">
        <motion.span
          aria-hidden
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ background: job.brandColor }}
          animate={{ opacity: active ? 1 : 0.25, scale: active ? 1 : 0.7 }}
          transition={{ duration: 0.35 }}
        />
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-mist">
          {job.dateFrom} — {job.dateTo}
        </p>
      </div>

      <h3 className="mt-3 text-[clamp(1.5rem,2.8vw,2.35rem)] font-bold leading-tight tracking-tight text-paper">
        {job.title}
      </h3>
      <p className="mt-4 max-w-prose text-[0.95rem] leading-relaxed text-mist md:text-base">{job.desc}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.7rem] font-medium text-paper/75"
          >
            {tag}
          </li>
        ))}
      </ul>
    </li>
  );
};

const Experiences = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const [active, setActive] = useState(0);
  const job = experiences[active];

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const rail = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" ref={ref} aria-labelledby="experience-title" className="relative isolate scroll-mt-24 bg-void px-4 py-24 md:px-10 md:py-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_0%_20%,rgb(167_139_250/0.12),transparent_60%)]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-x-16 md:grid-cols-[5fr_7fr]">
        {/* Left: pinned panel that swaps to the role currently in view */}
        <div className="md:sticky md:top-0 md:flex md:h-svh md:flex-col md:justify-center">
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_12px_rgb(255_210_63/0.9)]" />
            04 — Experience
          </p>
          <h2
            id="experience-title"
            className="display mt-5 text-[clamp(2.5rem,6.4vw,5rem)] [font-variation-settings:'wdth'_100]"
          >
            Experience
          </h2>

          <div className="glass glass-edge relative mt-10 hidden h-[13rem] overflow-hidden rounded-4xl p-6 md:block">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={job.id}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-6 top-6"
              >
                <Logo job={job} size={52} />
                <p className="mt-4 text-xl font-bold tracking-tight text-paper">{job.office}</p>
                <p className="mt-1 text-sm text-mist">
                  {job.dateFrom} — {job.dateTo}
                </p>
                <p className="mt-1 text-[0.8rem] font-medium text-signal">{job.title}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress rail: one stop per company */}
          <ol className="relative mt-8 hidden gap-3 md:flex md:flex-col" aria-label="Companies">
            <span className="absolute bottom-2 left-[5px] top-2 w-px bg-white/10" aria-hidden />
            <motion.span
              className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-signal"
              style={{ scaleY: reduce ? 1 : rail }}
              aria-hidden
            />
            {experiences.map((item, i) => (
              <li
                key={item.id}
                className={`relative flex items-center gap-4 text-sm transition-colors duration-300 ${
                  i === active ? "font-semibold text-paper" : "text-mist"
                }`}
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full border-2 transition-transform duration-300"
                  style={{
                    borderColor: item.brandColor,
                    background: i <= active ? item.brandColor : "transparent",
                    opacity: i <= active ? 1 : 0.45,
                    transform: i === active ? "scale(1.3)" : undefined,
                  }}
                  aria-hidden
                />
                {item.office}
              </li>
            ))}
          </ol>
        </div>

        {/* Right: the roles themselves */}
        <ol className="mt-10 divide-y divide-white/[0.07] md:mt-0 md:divide-y-0">
          {experiences.map((item, i) => (
            <Role key={item.id} job={item} index={i} active={i === active} onActive={setActive} />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experiences;
