import { CONTACT } from "@/data/contact";
import { SITE } from "@/data/site";
import { SOCIALS } from "../utility/brandIcons";

const LINKS = [
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-white/[0.07] bg-void px-4 pb-10 pt-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#home" className="inline-flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-[0.85rem] bg-signal text-[0.8rem] font-extrabold text-ink">
                {SITE.initials}
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-base font-extrabold tracking-tight text-paper">{SITE.name}</span>
                <span className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-mist">{SITE.role}</span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-[0.85rem] leading-relaxed text-mist">
              Building and maintaining booking platforms at {SITE.company}, from {SITE.country}.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <p className="eyebrow">Sections</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="text-sm text-mist transition-colors hover:text-paper">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <p className="eyebrow">Elsewhere</p>
            <ul className="flex gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={CONTACT[href]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.03] text-mist transition-colors duration-300 hover:border-white/20 hover:text-paper"
                  >
                    <Icon className="h-[1.1rem] w-[1.1rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/[0.07] pt-6 text-[0.78rem] text-mist md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            Built with Next.js, Tailwind and a lot of glass
            <span aria-hidden className="h-1 w-1 rounded-full bg-signal" />
            {SITE.country}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
