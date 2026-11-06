"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import projects from "@/data/projects.json";
import TiltCard from "../utility/tiltCard";
import MainButton from "../utility/mainButton";

type Project = (typeof projects)[number];

const Card = ({ project, index, total }: { project: Project; index: number; total: number }) => (
  <article className="group flex w-[82vw] shrink-0 flex-col sm:w-[26rem] md:w-[32rem]">
    <TiltCard shadow="dark" glow={project.glow} className="panel aspect-[4/3] rounded-[1.75rem]">
      <div className="absolute inset-0 overflow-hidden rounded-[1.75rem]">
        <Image
          src={project.image}
          alt={`Cover artwork for ${project.title}`}
          fill
          sizes="(min-width: 768px) 32rem, 82vw"
          className="object-cover transition-transform duration-[900ms] ease-apple group-hover:scale-[1.04]"
        />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-void/70 via-void/5 to-void/25" />

        <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-paper/90 backdrop-blur-md">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="absolute right-5 top-5 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[0.66rem] font-semibold tracking-[0.18em] text-paper/80 backdrop-blur-md">
          {project.year}
        </span>

        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
          <h3 className="display max-w-[72%] text-[clamp(1.4rem,2.7vw,2.1rem)] capitalize text-paper">{project.title}</h3>
          <span className="glass grid h-10 w-10 shrink-0 place-items-center rounded-full text-paper transition-transform duration-500 ease-apple group-hover:-translate-y-0.5 group-hover:text-signal">
            <ArrowUpRight aria-hidden className="h-4 w-4" />
          </span>
        </div>
      </div>
    </TiltCard>

    <div className="mt-6 flex flex-col gap-3">
      {project.desc && <p className="max-w-md text-[0.95rem] leading-relaxed text-mist">{project.desc}</p>}

      <ul className="flex flex-wrap gap-2" aria-label="Built with">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.72rem] font-medium text-paper/80"
          >
            {tag}
          </li>
        ))}
      </ul>

      {project.url && (
        <MainButton href={project.url} variant="outline" external className="mt-2" icon={<ArrowUpRight aria-hidden className="h-4 w-4" />}>
          Visit {project.title}
        </MainButton>
      )}
    </div>
  </article>
);

// Vertical scroll drives a horizontal track while the section is pinned
const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-labelledby="projects-title"
      className="relative isolate bg-void"
      style={reduce ? undefined : { height: `calc(100svh + ${distance}px)` }}
    >
      <div className={reduce ? "py-24 md:py-32" : "sticky top-0 flex h-svh flex-col justify-center overflow-hidden"}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_10%,rgb(125_211_252/0.12),transparent_65%),radial-gradient(50%_45%_at_10%_90%,rgb(255_210_63/0.1),transparent_65%)]"
        />

        <motion.div
          ref={trackRef}
          style={reduce ? undefined : { x }}
          className={`relative flex items-center gap-6 px-4 md:gap-10 md:px-10 ${
            reduce ? "no-scrollbar overflow-x-auto" : "w-max"
          }`}
        >
          <div className="flex w-[82vw] shrink-0 flex-col justify-center sm:w-[24rem] md:w-[28rem]">
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_12px_rgb(255_210_63/0.9)]" />
              03 — Selected work
            </p>
            <h2 id="projects-title" className="display mt-6 text-[clamp(2.5rem,6.4vw,5rem)] [font-variation-settings:'wdth'_100]">
              Projects
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-mist">
              A few things I&apos;ve built outside the airline booking world.
            </p>
            {!reduce && (
              <p className="mt-8 inline-flex items-center gap-2 text-[0.8rem] font-medium text-mist/70">
                Scroll to move the row
                <span aria-hidden className="h-px w-10 bg-gradient-to-r from-mist/60 to-transparent" />
              </p>
            )}
          </div>

          {projects.map((project, i) => (
            <Card key={project.id} project={project} index={i} total={projects.length} />
          ))}

          {/* Closing slide so the row never ends on a half-cut card */}
          <div className="flex w-[70vw] shrink-0 flex-col justify-center sm:w-[20rem] md:w-[24rem]">
            <p className="display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-paper/90">
              More in the works.
            </p>
            <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-mist">
              New case studies land here as projects ship.
            </p>
            <MainButton href="#contact" variant="glass" className="mt-6" icon={<ArrowUpRight aria-hidden className="h-4 w-4" />}>
              Work with me
            </MainButton>
          </div>
        </motion.div>

        {!reduce && (
          <div className="absolute inset-x-4 bottom-8 h-px bg-white/10 md:inset-x-10">
            <motion.div className="h-full origin-left bg-signal" style={{ scaleX: bar }} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
