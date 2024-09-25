"use client";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isFaded, setIsFaded] = useState(false);
  const [transparent, setTransparent] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsFaded(true);
      } else {
        setIsFaded(false);
      }
      if (currentScrollY < 2) {
        setTransparent(true);
      } else {
        setTransparent(false);
      }
      setLastScrollY(currentScrollY);

      // set active section for scrolling start
      const sections = ["home", "experiences", "projects", "contact", "services"];
      
      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(sectionId);
          }
        }
      });
      // set active section for scrolling end

    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('home');
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    setActiveSection(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`flex items-center min-h-20 gap-10 sticky top-1 m-6 rounded-md px-16 z-10 transition duration-500 ease-in ${transparent ? 'bg-transparent text-custom-oil-black' : 'bg-custom-oil-black shadow-lg'} ${isFaded ? 'opacity-50' : 'opacity-100'}`}>
      <div onClick={scrollToTop} className={` text-xl hover:border-b-4 hover:border-custom-yellow cursor-pointer ${activeSection === 'home' ? 'border-b-2 border-custom-yellow font-extrabold' : 'font-semibold'}`}>Home</div>
      <div onClick={() => scrollToSection("services")} className={` text-xl hover:border-b-4 hover:border-custom-yellow cursor-pointer ${activeSection === 'services' ? 'border-b-2 border-custom-yellow font-extrabold' : 'font-semibold'}`}>Services</div>
      <div onClick={() => scrollToSection("experiences")} className={` text-xl hover:border-b-4 hover:border-custom-yellow cursor-pointer ${activeSection === 'experiences' ? 'border-b-2 border-custom-yellow font-extrabold' : 'font-semibold'}`}>Experiences</div>
      <div onClick={() => scrollToSection("projects")} className={` text-xl hover:border-b-4 hover:border-custom-yellow cursor-pointer ${activeSection === 'projects' ? 'border-b-2 border-custom-yellow font-extrabold' : 'font-semibold'}`}>Projects</div>
      <div onClick={() => scrollToSection("contact")} className={` text-xl hover:border-b-4 hover:border-custom-yellow cursor-pointer ${activeSection === 'contact' ? 'border-b-2 border-custom-yellow font-extrabold' : 'font-semibold'}`}>Contact Me</div>
    </nav>
  );
};

export default Navbar;
