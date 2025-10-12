"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import services from "@/data/services.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJs } from "@fortawesome/free-brands-svg-icons";

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const servicesRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }
  }, []);

  return (
    // <div id="services" ref={servicesRef} className="sticky top-0">
    <div id="services" ref={servicesRef} className="m-4 md:m-6">
      <div className="bg-custom-obsidian min-h-96 rounded-xl w-full shadow-lg p-8 md:p-16 md:p-28 text-custom-yellow">
        <div className={`text-4xl font-extrabold text-center ${isVisible ? "animate-popDown" : "opacity-0"}`}>Services</div>
        <div className={`flex flex-wrap justify-center md:px-16 py-8 ${isVisible ? "animate-popUp" : "opacity-0"}`}>
          {services.map((item) => (
            <div key={item.id} className="flex flex-col items-center justify-center gap-4 my-8 w-1/3 md:w-1/4">
              <div className="m-auto">
                {/* <FontAwesomeIcon className="ml-2" icon={faJs} /> */}
                <Image src={item.logo} alt={item.desc} width={64} height={64}></Image>
              </div>
              <div className="relative inline-block text-custom-white after:content-[''] after:block after:w-1/2 after:mx-auto after:border-b after:border-custom-yellow">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
