import type { ReactNode } from "react";

/*
  Link-button with the "loading bar" hover: a fill slides in from the left (.hover-animate / .custom-ease-in in globals.css).
  - solid:   ink button, paper fill, for the main action on light/yellow backgrounds
  - outline: ink outline, ink fill, for secondary actions on light/yellow backgrounds
  - signal:  yellow outline, yellow fill, for dark backgrounds
*/
const VARIANTS = {
  solid: {
    base: "border-ink bg-ink text-paper hover:text-ink focus-visible:text-ink shadow-[0_1px_2px_rgb(11_18_21/0.12),0_8px_24px_-6px_rgb(11_18_21/0.35)]",
    fill: "bg-paper",
  },
  outline: {
    base: "border-ink text-ink hover:text-paper focus-visible:text-paper shadow-[0_1px_2px_rgb(11_18_21/0.06),0_8px_24px_-10px_rgb(11_18_21/0.25)]",
    fill: "bg-ink",
  },
  signal: {
    base: "border-signal text-signal hover:text-ink focus-visible:text-ink shadow-[0_8px_30px_-10px_rgb(255_210_63/0.35)]",
    fill: "bg-signal",
  },
} as const;

type Props = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
  icon?: ReactNode;
  external?: boolean;
  className?: string;
};

const MainButton = ({ href, children, variant = "outline", icon, external = false, className = "" }: Props) => {
  const v = VARIANTS[variant];
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`hover-animate relative inline-flex w-fit items-center justify-center overflow-hidden whitespace-nowrap rounded-full border-2 px-7 py-4 text-lg font-semibold transition-[color,transform] duration-500 ease-linear hover:-translate-y-0.5 active:translate-y-0 ${v.base} ${className}`}
    >
      <span aria-hidden className={`custom-ease-in absolute inset-y-0 left-0 ${v.fill}`} />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {icon}
      </span>
    </a>
  );
};

export default MainButton;
