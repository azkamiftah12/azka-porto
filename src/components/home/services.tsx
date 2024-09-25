'use client';
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
          }else{
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
    <div
      id="services"
      ref={servicesRef}
      className=""
    >
      <div className="bg-custom-obsidian min-h-96 rounded-t-xl w-full p-10 md:p-28 text-custom-yellow">
        <div
          className={`text-4xl font-extrabold text-center ${
            isVisible ? "animate-popDown" : "opacity-0"
          }`}
        >
          Services
        </div>
        <div className={`flex flex-wrap justify-center gap-8 md:px-20 py-8 ${
            isVisible ? "animate-popUp" : "opacity-0"
          }`}>
        {services.map((item) => (
            <div key={item.id} className="grid grid-flow-row justify-center my-8 md:w-1/4">
                <div className="m-auto">
                  <FontAwesomeIcon className="ml-2" icon={faJs} />
                </div>
                <div>{item.desc}</div>
            </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
