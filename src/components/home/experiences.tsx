"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
import experiences from "@/data/experiences.json";

type Job = (typeof experiences)[number];

const Logo = ({ job, size }: { job: Job; size: number }) => (
  <span className="block shrink-0 overflow-hidden rounded-2xl border-2 bg-white" style={{ borderColor: job.brandColor, width: size, height: size }}>
    <Image src={job.logo} alt="" width={size} height={size} className="h-full w-full object-cover" />
  </span>
);

// One role on the right-hand side; reports when it reaches the middle of the screen
const Role = ({ job, index, onActive }: { job: Job; index: number; onActive: (i: number) => void }) => {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="flex flex-col justify-center py-14 md:min-h-[85svh] md:py-0">
      <div className="mb-5 flex items-center gap-4 md:hidden">
        <Logo job={job} size={48} />
        <div>
          <p className="font-bold">{job.office}</p>
          <p className="text-sm text-graphite">
            {job.dateFrom} to {job.dateTo}
          </p>
        </div>
      </div>
      <h3 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-tight tracking-tight">{job.title}</h3>
      <p className="mt-5 max-w-prose text-lg leading-relaxed text-graphite">{job.desc}</p>
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
    <section id="experience" ref={ref} className="bg-paper px-4 py-28 md:px-10 md:py-0">
      <div className="mx-auto grid max-w-6xl gap-x-16 md:grid-cols-[5fr_7fr]">
        {/* Left: pinned panel that swaps to the role currently in view */}
        <div className="md:sticky md:top-0 md:flex md:h-svh md:flex-col md:justify-center">
          <h2 className="display text-[clamp(2.75rem,7vw,6rem)] [font-variation-settings:'wdth'_100]">Experience</h2>

          <div className="relative mt-12 hidden h-44 md:block">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={job.id}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -24 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Logo job={job} size={64} />
                <p className="mt-5 text-3xl font-bold tracking-tight">{job.office}</p>
                <p className="mt-1 text-graphite">
                  {job.dateFrom} to {job.dateTo}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress rail: one stop per company */}
          <ol className="relative mt-8 hidden gap-3 md:flex md:flex-col" aria-label="Companies">
            <span className="absolute bottom-2 left-[5px] top-2 w-0.5 bg-ink/10" aria-hidden />
            <motion.span className="absolute bottom-2 left-[5px] top-2 w-0.5 origin-top bg-ink" style={{ scaleY: reduce ? 1 : rail }} aria-hidden />
            {experiences.map((item, i) => (
              <li key={item.id} className={`relative flex items-center gap-4 text-sm transition-colors ${i === active ? "font-semibold text-ink" : "text-graphite"}`}>
                <span
                  className="h-3 w-3 shrink-0 rounded-full border-2 transition-transform"
                  style={{ borderColor: item.brandColor, background: i <= active ? item.brandColor : "#F6F6F6", transform: i === active ? "scale(1.35)" : undefined }}
                  aria-hidden
                />
                {item.office}
              </li>
            ))}
          </ol>
        </div>

        {/* Right: the roles themselves */}
        <ol className="mt-6 divide-y divide-ink/10 md:mt-0 md:divide-y-0">
          {experiences.map((item, i) => (
            <Role key={item.id} job={item} index={i} onActive={setActive} />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experiences;
