"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { CONTACT } from "@/data/contact";
import { SITE } from "@/data/site";
import { GitHubIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from "../utility/brandIcons";
import MainButton from "../utility/mainButton";
import Aurora from "../utility/aurora";

const CHANNELS = [
  { label: "WhatsApp", value: CONTACT.phone, href: CONTACT.whatsapp, Icon: WhatsAppIcon },
  { label: "LinkedIn", value: "azka-miftah-muhammad", href: CONTACT.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", value: "@azkamiftah12", href: CONTACT.github, Icon: GitHubIcon },
  { label: "Instagram", value: "@azka_miftah", href: CONTACT.instagram, Icon: InstagramIcon },
];

// The headline widens and settles into place as the panel rises into view
const Contact = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.35"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const width = useTransform(scrollYProgress, [0, 1], [72, 104]);
  const fontVariationSettings = useTransform(width, (w) => `"wdth" ${w.toFixed(1)}`);

  return (
    <section id="contact" ref={ref} aria-labelledby="contact-title" className="relative isolate scroll-mt-24 overflow-hidden bg-void px-4 py-24 md:px-10 md:py-32">
      <div aria-hidden className="absolute inset-0 opacity-90">
        <Aurora intensity={0.75} />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="glass glass-edge overflow-hidden rounded-[2rem] p-6 md:rounded-[2.75rem] md:p-14">
          <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
            <div>
              <p className="eyebrow flex items-center gap-3">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_12px_rgb(255_210_63/0.9)]" />
                05 — Contact
              </p>

              <motion.h2
                id="contact-title"
                className="display mt-6 origin-bottom-left text-[clamp(2.5rem,7vw,5.5rem)] text-paper"
                style={reduce ? { fontVariationSettings: '"wdth" 100' } : { scale, y, fontVariationSettings }}
              >
                Let&apos;s build
                <br />
                something.
              </motion.h2>

              <p className="mt-8 max-w-md text-pretty text-lg leading-relaxed text-mist">
                I&apos;m {SITE.name.split(" ")[0]}, a full-stack developer in {SITE.country}. Tell me what you&apos;re
                building on WhatsApp or LinkedIn and I&apos;ll reply from there.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <MainButton
                  href={CONTACT.whatsapp}
                  variant="primary"
                  external
                  icon={<ArrowUpRight aria-hidden className="h-4 w-4" />}
                >
                  Chat on WhatsApp
                </MainButton>
                <MainButton href={CONTACT.linkedin} variant="glass" external>
                  Connect on LinkedIn
                </MainButton>
              </div>

              <a
                href={`tel:${CONTACT.phoneHref}`}
                className="group mt-10 inline-flex items-center gap-3 text-[clamp(1.25rem,2.6vw,1.9rem)] font-bold tracking-tight text-paper transition-colors hover:text-signal"
              >
                {CONTACT.phone}
                <ArrowUpRight aria-hidden className="h-5 w-5 opacity-40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </a>
            </div>

            <ul className="flex flex-col gap-2.5 md:justify-center">
              {CHANNELS.map(({ label, value, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3.5 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.07]"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-paper transition-colors group-hover:border-signal/40 group-hover:text-signal">
                      <Icon className="h-[1.15rem] w-[1.15rem]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-mist">
                        {label}
                      </span>
                      <span className="block truncate text-[0.95rem] font-medium text-paper">{value}</span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="h-4 w-4 shrink-0 text-mist transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-signal"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
