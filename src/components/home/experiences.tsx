"use client";
import experiences from "@/data/experiences.json";
import Image from "next/image";

const Experiences = () => {
  return (
    // <div id="experiences" className="sticky top-0">
    <div id="experiences" className="m-4 md:m-6">
      <div className="bg-custom-obsidian min-h-96 w-full rounded-xl shadow-lg p-8 md:p-16 text-custom-yellow">
        <div className="text-4xl font-extrabold text-center">Experiences</div>
        <div className="flex flex-col justify-center md:px-16 pt-8 mt-8">
          {experiences.map((item, index) => (
            <div key={item.id} className="flex flex-row items-start justify-between">
              {/* Left Column (Office & Dates) */}
              <div className="flex flex-col items-start mb-16 basis-64">
                <div className="text-xl font-extrabold" style={{ color: item.brandColor }}>
                  {item.office}
                </div>
                <div className="text-sm text-custom-white">
                  {item.dateFrom} - {item.dateTo}
                </div>
              </div>

              {/* Timeline Column (Dot and Line) */}
              <div className="flex flex-col items-center mx-4 self-stretch">
                {/* The Dot */}
                <div className="w-10 h-10 rounded-full z-10 shrink-0 overflow-hidden border-2" style={{ borderColor: item.brandColor }}>
                  <Image src={item.logo} alt={item.office + " Logo"} width={40} height={40} className="object-cover" />
                </div>

                {/* The Line (Only for entries that are NOT the last one) */}
                {index < experiences.length - 1 && <div className="w-0.5 h-full -mt-0.5" style={{ backgroundColor: item.brandColor }}></div>}
              </div>

              {/* Right Column (Title & Description) */}
              <div className="flex flex-col items-start mb-16 basis-64">
                <div className="text-xl font-extrabold" style={{ color: item.brandColor }}>
                  {item.title}
                </div>
                <div className="text-xs text-custom-white mt-2">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experiences;
