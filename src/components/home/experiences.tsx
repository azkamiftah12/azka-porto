"use client";
import React from "react";
import experiences from "@/data/experiences.json";
import Image from "next/image";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { useFitToViewport } from "../hooks/useFitToViewport";

const Experiences = () => {
  const trackRef = useScrollProgress<HTMLDivElement>();
  const { stickyRef, panelRef } = useFitToViewport();

  return (
    <div id="experiences" ref={trackRef} className="services-track">
      <div className="services-sticky" ref={stickyRef}>
        <div className="fit-wrap">
          <div ref={panelRef} className="services-panel panel-compact bg-custom-obsidian shadow-2xl text-custom-yellow">
            <h2 className="services-title text-4xl font-extrabold text-center">Experiences</h2>

            <div className="mx-auto w-full max-w-5xl mt-[clamp(1rem,4vh,2.5rem)]">
              {experiences.map((item, index) => {
                const isLast = index === experiences.length - 1;
                const gap = isLast ? "" : "mb-[clamp(0.75rem,3vh,2.5rem)]";

                return (
                  <div
                    key={item.id}
                    className="services-reveal grid grid-cols-[auto_1fr] md:grid-cols-[1fr_auto_1.6fr] gap-x-4 md:gap-x-8"
                    style={
                      {
                        "--i": index,
                        "--n": experiences.length,
                        "--rise": "0px",
                        "--shrink": 0,
                      } as React.CSSProperties
                    }
                  >
                    <div className={`hidden md:flex flex-col items-end text-right ${gap}`}>
                      <div className="text-xl font-extrabold" style={{ color: item.brandColor }}>
                        {item.office}
                      </div>
                      <div className="text-sm text-custom-white">
                        {item.dateFrom} - {item.dateTo}
                      </div>
                    </div>

                    <div className="flex flex-col items-center self-stretch">
                      <div
                        className="timeline-dot w-10 h-10 rounded-full z-10 shrink-0 overflow-hidden border-2"
                        style={{
                          borderColor: item.brandColor,
                          boxShadow: `0 0 calc(var(--cp) * 16px) ${item.brandColor}`,
                        }}
                      >
                        <Image src={item.logo} alt="" width={40} height={40} className="object-cover" />
                      </div>
                      {!isLast && <div className="timeline-line flex-1 w-0.5 -mt-0.5" style={{ backgroundColor: item.brandColor }} />}
                    </div>

                    <div className={`flex flex-col items-start ${gap}`}>
                      <div className="md:hidden mb-2">
                        <div className="text-lg font-extrabold" style={{ color: item.brandColor }}>
                          {item.office}
                        </div>
                        <div className="text-xs text-custom-white">
                          {item.dateFrom} - {item.dateTo}
                        </div>
                      </div>

                      <div className="text-base md:text-xl font-extrabold" style={{ color: item.brandColor }}>
                        {item.title}
                      </div>
                      <div className="text-xs md:text-sm text-custom-white mt-1 md:mt-2 max-w-prose">{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="services-progress" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experiences;