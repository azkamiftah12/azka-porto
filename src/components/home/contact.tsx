"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { CONTACT } from "@/data/contact";
import MainButton from "../utility/mainButton";

// The headline grows into place as the section rises into view
const Contact = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const width = useTransform(scrollYProgress, [0, 1], [70, 108]);
  const fontVariationSettings = useTransform(width, (w) => `"wdth" ${w.toFixed(1)}`);

  return (
    <section id="contact" ref={ref} className="overflow-hidden bg-signal px-4 py-28 text-ink md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="display origin-bottom-left text-[clamp(3.25rem,10vw,9rem)]"
          style={reduce ? { fontVariationSettings: '"wdth" 100' } : { scale, y, fontVariationSettings }}
        >
          Have a project in mind?
        </motion.h2>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 md:items-end">
          <div>
            <p className="max-w-md text-xl leading-relaxed">Send me a message on WhatsApp or LinkedIn and I&apos;ll get back to you.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MainButton href={CONTACT.whatsapp} variant="solid" external>
                Chat on WhatsApp
              </MainButton>
              <MainButton href={CONTACT.linkedin} variant="outline" external>
                Connect on LinkedIn
              </MainButton>
            </div>
          </div>
          <a href={`tel:${CONTACT.phoneHref}`} className="w-fit text-[clamp(1.5rem,3.2vw,2.5rem)] font-bold tracking-tight underline decoration-2 underline-offset-8 md:justify-self-end">
            {CONTACT.phone}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
