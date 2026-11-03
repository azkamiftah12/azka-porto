"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import projects from "@/data/projects.json";
import TiltCard, { Depth } from "../utility/tiltCard";
import MainButton from "../utility/mainButton";

type Project = (typeof projects)[number];

// Cover tones cycle so neighbouring cards never match; glow is the hover halo colour ("r g b")
const TONES = [
  { surface: "bg-signal", text: "text-ink", glow: "255 210 63" },
  { surface: "bg-paper", text: "text-ink", glow: "246 246 246" },
  { surface: "bg-[#1C262B] ring-1 ring-inset ring-paper/10", text: "text-paper", glow: "152 163 169" },
];

const Card = ({ project, index }: { project: Project; index: number }) => {
  const tone = TONES[index % TONES.length];
  return (
  <article className="flex w-[82vw] shrink-0 flex-col sm:w-[30rem] md:w-[36rem]">
    <TiltCard shadow="dark" glow={tone.glow} className="aspect-[4/3] rounded-[2rem]">
      <div className={`absolute inset-0 overflow-hidden rounded-[2rem] ${tone.surface}`}>
        {project.image && <Image src={project.image} alt="" fill sizes="(min-width: 768px) 36rem, 82vw" className="object-cover" />}
      </div>
      {!project.image && (
        <Depth z={60} className={`absolute inset-0 flex items-end p-6 md:p-8 ${tone.text}`}>
          <span aria-hidden className="display text-[clamp(3rem,9vw,6.5rem)] [font-variation-settings:'wdth'_112]">
            {project.title}
          </span>
        </Depth>
      )}
    </TiltCard>
    <div className="mt-6 flex items-baseline justify-between gap-4">
      <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{project.title}</h3>
      <span className="text-mist">{project.year}</span>
    </div>
    {project.desc && <p className="mt-3 max-w-md leading-relaxed text-mist">{project.desc}</p>}
    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Built with">
      {project.tags.map((tag) => (
        <li key={tag} className="rounded-full border border-paper/20 px-3 py-1 text-sm text-paper/80">
          {tag}
        </li>
      ))}
    </ul>
    {project.url && (
      <MainButton href={project.url} variant="signal" external className="mt-6" icon={<ArrowUpRight aria-hidden className="h-5 w-5" />}>
        Visit {project.title}
      </MainButton>
    )}
  </article>
  );
};

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
      className="relative bg-ink text-paper"
      style={reduce ? undefined : { height: `calc(100svh + ${distance}px)` }}
    >
      <div className={reduce ? "py-28" : "sticky top-0 flex h-svh flex-col justify-center overflow-hidden"}>
        <motion.div
          ref={trackRef}
          style={reduce ? undefined : { x }}
          className={`flex gap-6 px-4 md:gap-10 md:px-10 ${reduce ? "no-scrollbar overflow-x-auto" : "w-max"}`}
        >
          <div className="flex w-[82vw] shrink-0 flex-col justify-end pb-2 sm:w-[24rem] md:w-[28rem]">
            <h2 className="display text-[clamp(2.75rem,7vw,6rem)] [font-variation-settings:'wdth'_100]">Projects</h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-mist">A few things I&apos;ve built outside the airline booking world.</p>
          </div>
          {projects.map((project, i) => (
            <Card key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        {!reduce && (
          <div className="absolute inset-x-4 bottom-8 h-px bg-paper/15 md:inset-x-10">
            <motion.div className="h-full origin-left bg-signal" style={{ scaleX: bar }} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
