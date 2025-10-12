"use client";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isFaded, setIsFaded] = useState(false);
  const [transparent, setTransparent] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

      // active section highlight
      const sections = ["home", "services", "projects", "experiences", "contact"];
      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSection("home");
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const navClasses = (id: string) => `text-xl hover:border-b-4 hover:border-custom-yellow cursor-pointer ${activeSection === id ? "border-b-2 border-custom-yellow font-extrabold" : "font-semibold"}`;

  return (
    <nav
      className={`flex items-center justify-between min-h-16 sticky top-1 m-6 rounded-md px-6 md:px-16 z-20 transition duration-500 ease-in 
        ${transparent ? "bg-transparent text-custom-oil-black" : "bg-custom-oil-black shadow-2xl"} 
        ${isFaded ? "opacity-30" : "opacity-100"}`}
    >
      {/* Logo / Brand */}
      {/* <div onClick={scrollToTop} className="md:hidden text-2xl font-bold cursor-pointer">
        Azka Muhammad
      </div> */}

      {/* Desktop menu */}
      <div className="hidden md:flex gap-10">
        <div onClick={scrollToTop} className={navClasses("home")}>
          Home
        </div>
        <div onClick={() => scrollToSection("services")} className={navClasses("services")}>
          Services
        </div>
        <div onClick={() => scrollToSection("projects")} className={navClasses("projects")}>
          Projects
        </div>
        <div onClick={() => scrollToSection("experiences")} className={navClasses("experiences")}>
          Experiences
        </div>
        <div onClick={() => scrollToSection("contact")} className={navClasses("contact")}>
          Contact Me
        </div>
      </div>

      {/* Mobile burger */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}</button>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className={`absolute top-full left-0 right-0 mt-2 rounded-md shadow-2xl flex flex-col items-center gap-4 py-6 bg-custom-oil-black text-white md:hidden`}>
          <div onClick={scrollToTop} className={navClasses("home")}>
            Home
          </div>
          <div onClick={() => scrollToSection("services")} className={navClasses("services")}>
            Services
          </div>
          <div onClick={() => scrollToSection("projects")} className={navClasses("projects")}>
            Projects
          </div>
          <div onClick={() => scrollToSection("experiences")} className={navClasses("experiences")}>
            Experiences
          </div>
          <div onClick={() => scrollToSection("contact")} className={navClasses("contact")}>
            Contact Me
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
