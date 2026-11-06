import type { ReactNode } from "react";

/*
  Link-button on the glass system. The owner's "loading bar" hover is kept: a
  pane of colour slides in from the left and the label flips to the contrasting
  ink while it fills (`.hover-animate` / `.custom-ease-in` in globals.css).

  - primary: signal yellow, flips to ink. One per viewport, for the main action.
  - glass:   frosted pane, flips to paper. Secondary actions on dark panels.
  - outline: signal hairline, flips to signal. Quiet tertiary actions.
*/
const VARIANTS = {
  primary: {
    base: "border-signal bg-signal text-ink shadow-[0_12px_44px_-14px_rgb(255_210_63/0.6)]",
    fill: "bg-ink",
    flip: "hover:text-paper focus-visible:text-paper",
  },
  glass: {
    base: "glass glass-edge text-paper",
    fill: "bg-paper",
    flip: "hover:text-ink focus-visible:text-ink",
  },
  outline: {
    base: "border-signal/45 text-signal",
    fill: "bg-signal",
    flip: "hover:text-ink focus-visible:text-ink",
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

const MainButton = ({ href, children, variant = "glass", icon, external = false, className = "" }: Props) => {
  const v = VARIANTS[variant];

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`hover-animate group relative inline-flex h-[3.25rem] w-fit items-center justify-center overflow-hidden whitespace-nowrap rounded-full border px-7 text-[0.95rem] font-semibold tracking-tight transition-[color,transform,box-shadow] duration-500 ease-apple hover:-translate-y-0.5 active:translate-y-0 ${v.base} ${v.flip} ${className}`}
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
