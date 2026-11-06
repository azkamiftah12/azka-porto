"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { SITE } from "@/data/site";

// Keep in sync with the section ids rendered in src/app/page.tsx
export const SECTIONS = [
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Slide away while scrolling down, come back on any upward scroll
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200 && !open);
    setScrolled(y > 24);
  });

  useEffect(() => {
    const ids = ["home", ...SECTIONS.map((s) => s.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5"
      animate={{ y: hidden ? "-130%" : "0%" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Page progress, drawn as a hairline above the bar */}
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 h-0.5 bg-gradient-to-r from-signal/0 via-signal to-signal/0"
        style={{ width: progress }}
        animate={{ opacity: scrolled ? 1 : 0 }}
      />

      <nav
        aria-label="Main"
        className={`glass-chrome glass-edge mx-auto flex h-[3.5rem] max-w-5xl items-center justify-between rounded-full pl-2 pr-2 text-paper md:h-[3.75rem] md:pl-2.5 ${
          scrolled ? "shadow-[0_18px_50px_-20px_rgb(0_0_0/0.9)]" : ""
        }`}
      >
        {/* Identity: monogram + wordmark */}
        <a href="#home" className="group flex items-center gap-2.5 rounded-full pl-1 pr-3" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center rounded-[0.7rem] bg-signal text-[0.72rem] font-extrabold tracking-tight text-ink shadow-[0_4px_16px_-4px_rgb(255_210_63/0.7)] md:h-9 md:w-9 md:text-[0.78rem]">
            {SITE.initials}
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[0.95rem] font-extrabold tracking-tight">{SITE.shortName}</span>
            <span className="mt-0.5 hidden text-[0.6rem] font-medium uppercase tracking-[0.18em] text-mist sm:block">
              Full-stack dev
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-0.5 md:flex">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className={`relative block rounded-full px-3.5 py-2 text-[0.86rem] font-medium transition-colors duration-300 ${
                  active === s.id ? "text-ink" : "text-mist hover:text-paper"
                }`}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-signal shadow-[0_4px_18px_-6px_rgb(255_210_63/0.8)]"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="glass glass-edge hidden items-center gap-1.5 rounded-full px-4 py-2.5 text-[0.82rem] font-semibold text-paper transition-colors duration-300 hover:text-signal md:inline-flex"
        >
          Let&apos;s talk
          <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
        </a>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="glass-chrome glass-edge mx-auto mt-2 max-w-5xl overflow-hidden rounded-3xl p-2 md:hidden"
          >
            <ul className="flex flex-col">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === s.id ? "true" : undefined}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold ${
                      active === s.id ? "bg-signal text-ink" : "text-paper"
                    }`}
                  >
                    {s.label}
                    <ArrowUpRight aria-hidden className="h-4 w-4 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-center gap-2 rounded-2xl bg-paper px-4 py-3.5 text-base font-bold text-ink"
            >
              Start a project
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
