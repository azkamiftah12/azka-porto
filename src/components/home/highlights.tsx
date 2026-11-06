"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { HIGHLIGHTS, SITE } from "@/data/site";
import experiences from "@/data/experiences.json";

const TONES = {
  signal: "text-signal from-signal/70",
  halo: "text-halo from-halo/70",
  jade: "text-jade from-jade/70",
  iris: "text-iris from-iris/70",
} as const;

/*
  The credibility band. Four numbers that a recruiter or a client can verify
  against the experience list below, plus the "currently" card that answers the
  first question anyone has: what are you doing right now?
*/
const Highlights = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = !!useReducedMotion();
  const current = experiences[0];

  return (
    <section aria-label="Highlights" className="relative isolate bg-void px-4 pb-16 pt-4 md:px-10 md:pb-24">
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className="grid gap-3 md:grid-cols-4 md:gap-4">
          {/* Currently */}
          <motion.article
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            animate={inView || reduce ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass glass-edge relative overflow-hidden rounded-4xl p-6 md:col-span-2 md:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-signal/20 blur-3xl"
            />
            <p className="eyebrow">Currently</p>
            <div className="mt-6 flex items-center gap-3.5">
              <Image
                src={current.logo}
                alt={current.office}
                width={56}
                height={56}
                className="h-12 w-12 rounded-2xl object-cover ring-1 ring-white/15"
              />
              <div>
                <p className="text-lg font-bold tracking-tight text-paper">{current.title}</p>
                <p className="text-sm text-mist">{current.office}</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-pretty text-[0.95rem] leading-relaxed text-mist">
              Maintaining and revamping five booking platforms behind {SITE.company}&apos;s commercial
              websites.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {current.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.72rem] font-medium text-paper/80">
                  {tag}
                </span>
              ))}
              <span className="ml-auto inline-flex items-center gap-1 text-[0.72rem] font-semibold text-signal">
                {current.dateFrom} — {current.dateTo}
              </span>
            </div>
          </motion.article>

          {HIGHLIGHTS.map((item, i) => (
            <motion.article
              key={item.label}
              initial={reduce ? undefined : { opacity: 0, y: 24 }}
              animate={inView || reduce ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.08 * (i + 1), ease: [0.22, 1, 0.36, 1] }}
              className="panel relative overflow-hidden rounded-4xl p-6"
            >
              <span
                aria-hidden
                className={`absolute inset-x-6 top-0 h-px bg-gradient-to-r to-transparent ${TONES[item.tone as keyof typeof TONES]}`}
              />
              <p className={`display text-[3rem] leading-none ${TONES[item.tone as keyof typeof TONES].split(" ")[0]}`}>
                {item.value}
              </p>
              <p className="mt-3 text-sm font-semibold text-paper">{item.label}</p>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-mist">{item.detail}</p>
            </motion.article>
          ))}
        </div>

        <motion.a
          href="#experience"
          initial={reduce ? undefined : { opacity: 0 }}
          animate={inView || reduce ? { opacity: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-mist transition-colors hover:text-signal"
        >
          See the full history
          <ArrowUpRight aria-hidden className="h-4 w-4" />
        </motion.a>
      </div>
    </section>
  );
};

export default Highlights;
