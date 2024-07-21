import Image from "next/image";
import type { Metadata } from "next";
// import profilePic from '../';

export const metadata: Metadata = {
  title: "Home - Azka",
  description: "Website Portofolio Azka Miftah Muhammad",
};
export default function Home() {
  return <>
  <div>

  <div id="home" className="min-h-96 w-full grid grid-flow-row flex-row-reverse md:grid-flow-col text-custom-obsidian sticky top-16">
    <div className="flex flex-col justify-center pl-20 px-10 pb-10">

      <div className="text-4xl font-extrabold mb-4">Hello, My <span className="text-custom-yellow">Name</span>....</div>
      <div className="text-4xl font-extrabold mb-16"><span className="text-custom-yellow shadow-sm shadow-custom-yellow">AZKA</span> Miftah Muhammad</div>
      <div className="bg-custom-yellow shadow-md shadow-custom-yellow w-fit text-xl font-bold p-2">Web Developer</div>
    </div>
    {/* <div className=" flex justify-center pt-24">
      <Image src="/img/azka-1.png" width={200} height={200} alt="Photo Azka Miftah Muhammad"/>
      </div> */}
  </div>
  <div id="contact" className="sticky top-0">
    <div className="bg-custom-obsidian min-h-96 rounded-t-xl w-full p-12 text-custom-yellow">
        <div className="text-4xl font-extrabold text-center">Contact Me</div>
    </div>
    <div id="services" className="bg-custom-white min-h-96  w-full p-12 text-custom-red">
      <div className="text-4xl font-extrabold text-center">Services</div>
    </div>
  </div>
  {/* <div className="bg-custom-obsidian min-h-96 w-full">

</div> */}
</div>
  </>;
}
