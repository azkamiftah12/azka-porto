// Brand strings and the handful of facts that appear in more than one place.
// Keeping them here means the hero, metadata and structured data can never drift apart.
export const SITE = {
  name: "Azka Miftah Muhammad",
  first: "Azka Miftah",
  last: "Muhammad",
  shortName: "Azka",
  initials: "AM",
  role: "Full-Stack Web Developer",
  company: "Citilink",
  country: "Indonesia",
  availability: "Open to new opportunities",
  headline: "I build and maintain the websites people use to book Citilink flights.",
  intro: "Full-stack web developer at Citilink.",
  description:
    "Full-stack web developer in Indonesia. I maintain and rebuild the booking platforms at Citilink, and I've shipped frontend work at Home Credit and a learning platform at Nusa Tekno Global.",
} as const;

// Headline numbers used by the highlights bento. Every figure is traceable to a
// role in src/data/experiences.json — nothing here is invented.
export const HIGHLIGHTS = [
  {
    value: "5",
    label: "booking platforms maintained",
    detail: "Main site, B2C, B2B agent, B2E corporate and group booking at Citilink.",
    tone: "signal",
  },
  {
    value: "3",
    label: "companies, 2022 to now",
    detail: "Citilink, Home Credit Indonesia and Nusa Tekno Global.",
    tone: "halo",
  },
  {
    value: "1000+",
    label: "clients reached",
    detail: "Home Credit's financial literacy pages, built and published end to end.",
    tone: "jade",
  },
  {
    value: "2",
    label: "platforms revamped",
    detail: "B2C and B2E booking rebuilt for UI, UX and runtime performance.",
    tone: "iris",
  },
] as const;
