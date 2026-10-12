"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import services from "@/data/services.json";
import { useScrollProgress } from "../hooks/useScrollProgress";

const REVERSIBLE = true;

const LEAD = 0.5;

const Services = () => {

  const trackRef = useScrollProgress<HTMLDivElement>();

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div id="services" ref={trackRef} className="services-track">
      <div className="services-sticky">
        <div className="services-panel bg-custom-obsidian shadow-2xl text-custom-yellow">
          <h2 className="services-title text-4xl font-extrabold text-center">Services</h2>

          <div className="flex flex-wrap justify-center md:px-16 pt-6 pb-4">
            {services.map((item, i) => (
              <div
                key={item.id}
                className="services-reveal w-1/3 md:w-1/4 p-1 md:p-2"
                style={{ "--i": i, "--n": services.length } as React.CSSProperties}
              >
                {/* scroll transform lives on the outer div, hover transform on the inner one */}
                <div
                  onPointerMove={handlePointerMove}
                  className="service-card group flex flex-col items-center justify-center gap-3 h-full py-5 md:py-8 px-2"
                >
                  <Image
                    src={item.logo}
                    alt=""
                    width={64}
                    height={64}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="text-center text-custom-white after:content-[''] after:block after:h-px after:mx-auto after:mt-1 after:bg-custom-yellow after:w-1/2 after:transition-all after:duration-300 group-hover:after:w-full">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="services-progress" />
        </div>
      </div>
    </div>
  );
};

export default Services;