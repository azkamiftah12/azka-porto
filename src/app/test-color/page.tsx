"use client";

export default function testColor() {
  return (
    <>
      <div className="grid grid-flow-row gap-2">
        <div className="bg-transparent min-w-20 min-h-screen"></div>
        <div className="balok-1 min-w-20 min-h-screen"></div>
        <div className="balok-2 min-w-20 min-h-screen"></div>
        <div className="balok-3 min-w-20 min-h-screen"></div>
        <div className="balok-4 min-w-20 min-h-screen"></div>
        <div className="balok-5 min-w-20 min-h-screen"></div>
        <div className="balok-6 min-w-20 min-h-screen"></div>
        <div className="balok-7 min-w-20 min-h-screen"></div>
      </div>

      <style jsx>
        {`
          .balok-1 {
            background-color: var(--custom-oil-black);
          }
          .balok-2 {
            background-color: var(--custom-obsidian);
          }
          .balok-3 {
            background-color: var(--custom-dark-slate);
          }
          .balok-4 {
            background-color: var(--custom-midnight-blue);
          }
          .balok-5 {
            background-color: var(--custom-charcoal-gray);
          }
          .balok-6 {
            background-color: var(--custom-deep-navy);
          }
          .balok-7 {
            background-color: var(--custom-rich-black);
          }
        `}
      </style>
    </>
  );
}
