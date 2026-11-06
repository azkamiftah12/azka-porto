import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "lenis/dist/lenis.css";
import "../styles/globals.css";
import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/footer";
import SmoothScroll from "@/components/providers/smoothScroll";
import { CONTACT } from "@/data/contact";
import { SITE } from "@/data/site";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Vercel exposes the production domain at build time, so canonical URLs and
// structured data stay correct without hardcoding a hostname.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: CONTACT.linkedin }],
  creator: SITE.name,
  keywords: [
    "Azka Miftah Muhammad",
    "full-stack web developer",
    "frontend developer Indonesia",
    "Next.js developer",
    "React developer",
    "Citilink",
    "booking platform developer",
    "TypeScript",
  ],
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
    creator: "@azka_miftah",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#05080A",
  colorScheme: "dark",
};

// Person + ProfilePage tells search engines and LLM crawlers who this is, in a
// form they can quote without parsing the page.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: SITE.name,
      jobTitle: SITE.role,
      description: SITE.description,
      url: siteUrl,
      worksFor: { "@type": "Organization", name: "PT Citilink Indonesia", url: "https://www.citilink.co.id" },
      address: { "@type": "PostalAddress", addressCountry: "ID" },
      sameAs: [CONTACT.linkedin, CONTACT.github, CONTACT.instagram],
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        ".NET",
        "AngularJS",
        "Laravel",
        "Web performance",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: `${SITE.name} — ${SITE.role}`,
      description: SITE.description,
      publisher: { "@id": `${siteUrl}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          // Static object authored in this file; escaping `<` closes the one injection path
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-signal focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Navbar />
          <main id="content">{children}</main>
          <Footer />
        </SmoothScroll>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
