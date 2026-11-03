import { Analytics } from "@vercel/analytics/next";
import Hero from "@/components/home/hero";
import About from "@/components/home/about";
import Stack from "@/components/home/stack";
import Projects from "@/components/home/projects";
import Experiences from "@/components/home/experiences";
import Contact from "@/components/home/contact";

// Section ids here must match SECTIONS in src/components/layouts/navbar.tsx
export default function Home() {
  return (
    <>
      <Analytics />
      <Hero />
      <About />
      <Stack />
      <Projects />
      <Experiences />
      <Contact />
    </>
  );
}
