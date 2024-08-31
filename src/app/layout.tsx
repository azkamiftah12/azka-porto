import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "../styles/globals.css";
import "../styles/googleIcons.css";
import '@fortawesome/fontawesome-svg-core/styles.css';
import Navbar from "../components/layouts/navbar";
import Footer from "../components/layouts/footer";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Azka Miftah Muhammad",
  description: "Website Portofolio Azka Miftah Muhammad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        <main className="min-h-dvh">
        {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
