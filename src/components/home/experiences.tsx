"use client";
import experiences from "@/data/experiences.json";
import Image from "next/image";

const Experiences = () => {
  return (
    // <div id="experiences" className="sticky top-0">
    <div id="experiences" className="m-6">
      <div className="bg-custom-obsidian min-h-96 w-full rounded-xl p-16 text-custom-yellow">
        <div className="text-4xl font-extrabold text-center">Experiences</div>
        <div className="flex flex-col justify-center md:px-20 py-8 mt-8">
          {experiences.map((item, index) => (
            <div key={item.id} className="flex flex-row items-center justify-between">
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
                <div
                  className="w-10 h-10 rounded-full z-10 shrink-0 overflow-hidden border-2" // Adjust size (w-10 h-10), add border for visibility
                  style={{ borderColor: item.brandColor }} // Use brandColor for the border
                >
                  <Image
                    src={item.logo}
                    alt={item.office + " Logo"}
                    width={40} // Should match the container width (w-10 in tailwind)
                    height={40} // Should match the container height (h-10 in tailwind)
                    className="object-cover" // Ensures the image covers the container
                  />
                </div>

                {/* The Line (Only for entries that are NOT the last one) */}
                {index < experiences.length - 1 && (
                  <div
                    className="w-0.5 h-full -mt-0.5" // The line's thickness and height. -mt-0.5 shifts it up slightly to meet the dot.
                    style={{ backgroundColor: item.brandColor }}
                  ></div>
                )}
              </div>

              {/* Right Column (Title & Description) */}
              <div className="flex flex-col items-start mb-16 basis-64">
                <div className="text-xl font-extrabold" style={{ color: item.brandColor }}>
                  {item.title}
                </div>
                <div className="text-sm text-custom-white">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experiences;
