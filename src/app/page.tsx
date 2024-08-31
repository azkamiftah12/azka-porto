import Image from "next/image";
import type { Metadata } from "next";
import Services from "@/components/home/services";
import Contact from "@/components/home/contact";
import Main from "@/components/home/main";

export const metadata: Metadata = {
  title: "Home - Azka",
  description: "Website Portofolio Azka Miftah Muhammad",
};
export default function Home() {
  return <>
    <div>
      <Main/>
      <Services/>
      <Contact/>
    </div>
  </>;
}
