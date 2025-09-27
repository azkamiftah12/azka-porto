"use client";
import experiences from "@/data/experiences.json";
import Image from "next/image";

const Experiences = () => {
  return (
    <div id="experiences" className="sticky top-0">
      <div className="bg-custom-obsidian min-h-96 w-full p-16 text-custom-yellow">
        <div className="text-4xl font-extrabold text-center">Experiences</div>
        <div className="flex flex-col justify-center md:px-20 py-8">
          {experiences.map((item) => (
            <div key={item.id} className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="relative w-full h-64">
                <Image src={item.image} alt={item.Title} fill className="object-cover"></Image>
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-2xl mb-2">{item.Title}</div>
                <p className="text-gray-700 text-base">{item.desc}</p>
              </div>
              <div className="px-6 pt-4 pb-2">
                {item.tags.map((tag, index) => (
                  <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experiences;
