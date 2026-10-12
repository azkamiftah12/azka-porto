import type { CSSProperties } from "react";
import MainButton from "../utility/mainButton";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

const Main = () => {
  return (
    <div
      id="home"
      className="w-full lg:min-h-[85vh] grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-center gap-10 lg:gap-16 text-custom-obsidian p-8 md:p-16"
    >
      {/* Text */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-start md:px-10">
        <p className="hero-in text-xl md:text-2xl font-semibold mb-3" style={delay(0)}>
          Hi, I&apos;m
        </p>

        <h1 className="hero-in text-balance text-5xl md:text-4xl font-extrabold leading-[1.05] tracking-tight" style={delay(100)}>
          Azka Miftah Muhammad
        </h1>

        <div
          className="hero-in bg-custom-yellow shadow-md shadow-custom-yellow w-fit text-xl font-bold p-2 mt-6 md:mt-8"
          style={delay(250)}
        >
          Web Developer
        </div>

        {/* Placeholder copy: replace with your own sentence */}
        <p className="hero-in max-w-md text-base md:text-lg mt-6 md:mt-8 text-custom-obsidian/80" style={delay(350)}>
          Welcome to My Personal Website!
        </p>

        <div className="hero-in flex gap-8 justify-center lg:justify-start mt-8 md:mt-12" style={delay(450)}>
          <MainButton Text="Learn More" Icon="arrow_downward" Url="#services" />
          <a
            href="https://www.linkedin.com/in/azka-miftah-muhammad/"
            target="blank"
            className="flex justify-center items-center  border border-[#0077B5] border-b-8 shadow-2xl text-custom-obsidian hover-animate font-bold text-center whitespace-nowrap py-2 px-5 mt-5 rounded-md relative overflow-hidden hover:text-custom-white ease-linear duration-500"
          >
            <div className="inline-flex items-center z-10 text-md md:text-xl">
              Linked In
              <FontAwesomeIcon className="ml-2" icon={faLinkedin} />
            </div>
            <span className="custom-ease-in absolute bg-[#0077B5] top-0 left-0 w-0 h-full"></span>
          </a>
        </div>
      </div>

      {/* Photo */}
      <div className="hero-in group relative w-full max-w-[13rem] md:max-w-sm mx-auto order-first lg:order-last" style={delay(200)}>
        <div
          aria-hidden
          className="absolute inset-0 translate-x-4 translate-y-4 rounded-xl bg-custom-yellow transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6 motion-reduce:transition-none"
        />
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-custom-obsidian shadow-2xl">
          <Image
            src="/img/azka-generated.png"
            alt="Photo Azka Miftah Muhammad"
            fill
            priority
            sizes="(min-width: 768px) 24rem, 13rem"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
