'use client';
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import services from "@/data/services.json";

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
      className="sticky top-0"
    >
      <div className="bg-custom-obsidian min-h-96 rounded-t-xl w-full p-12 text-custom-yellow">
        <div
          className={`text-4xl font-extrabold text-center ${
            isVisible ? "animate-popUp" : "opacity-0"
          }`}
        >
          Services
        </div>
        <div className={`grid grid-cols-3 gap-8 px-20 py-8 ${
            isVisible ? "animate-popUp" : "opacity-0"
          }`}>
        {services.map((item) => (
            <div key={item.id} className="grid grid-flow-row justify-center my-8">
                <div>
                    <Image src={item.logo} alt={`Logo ${item.id}`} width={300} height={0} />
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
