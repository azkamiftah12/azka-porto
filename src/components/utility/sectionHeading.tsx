import type { ReactNode } from "react";

/*
  One heading pattern for every section: a small caps eyebrow with a signal dot,
  then display type, then an optional lead paragraph. Keeping this in one place
  is most of what makes a long page feel art-directed rather than assembled.
*/
type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  className?: string;
  /** Centre the block; default is left-aligned */
  center?: boolean;
};

export default function SectionHeading({ eyebrow, title, lead, id, className = "", center = false }: Props) {
  return (
    <div className={`${center ? "flex flex-col items-center text-center" : ""} ${className}`}>
      <p className="eyebrow flex items-center gap-3">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_12px_rgb(255_210_63/0.9)]" />
        {eyebrow}
      </p>

      <h2
        id={id}
        className="display mt-6 text-balance text-[clamp(2.5rem,6.4vw,5.5rem)] [font-variation-settings:'wdth'_100]"
      >
        {title}
      </h2>

      {lead && (
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-mist md:text-xl">{lead}</p>
      )}
    </div>
  );
}
