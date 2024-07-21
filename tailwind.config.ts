import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'custom-midnight': '#1D1A39',
        'custom-purple': '#451952',
        'custom-maroon': '#662549',
        'custom-pink': '#AE445A',
        'custom-light-pink': '#E8BCB9',
        'custom-red': '#ee4266',
        'custom-yellow': '#ffd23f',
        'custom-green': '#0ead69',
        'custom-dark-white': '#F2CBAC',
        'custom-white': '#F6F6F6',
        'custom-oil-black': '#0C0C0C',
        'custom-obsidian': '#0B1215',
        'custom-dark-slate': '#0D1717',
        'custom-midnight-blue': '#101720',
        'custom-charcoal-gray': '#171717',
        'custom-deep-navy': '#011222',
        'custom-rich-black': '#020D19',
      },
    },
  },
  plugins: [],
};
export default config;
