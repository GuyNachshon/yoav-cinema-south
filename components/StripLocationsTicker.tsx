"use client";

import PatternBand from "./PatternBand";

const SECTION_HEIGHT_PX = 130;
const FONT_SIZE_PX = 32;
const LINE_HEIGHT = 1;
const ROW_HEIGHT_PX = FONT_SIZE_PX * LINE_HEIGHT;
const GAP_PX = 6;
const LOCATIONS_TEXT =
  " שדרות سدירוט Sderot רהט رهط Rahat אופקים أوفاكيم Ofakim קיבוץ דורות كيبوتس دوروت Kibbutz Dorot ";
const REPEAT = 40;
const SPEED = 1000;

export default function StripLocationsTicker() {
  const content = Array.from({ length: REPEAT }, (_, i) => (
    <span
      key={i}
      className="navbar-font text-white break-words whitespace-nowrap inline-block"
      style={{ fontSize: FONT_SIZE_PX, lineHeight: LINE_HEIGHT }}
    >
      {LOCATIONS_TEXT}
    </span>
  ));

  return (
    <section
      className="flex flex-col justify-center border-b border-black bg-black overflow-hidden"
      style={{ height: SECTION_HEIGHT_PX, gap: GAP_PX }}
      dir="ltr"
      aria-hidden
    >
      <div
        className="flex items-center overflow-hidden shrink-0 w-full"
        style={{ height: ROW_HEIGHT_PX }}
      >
        <PatternBand speed={SPEED} direction="left" className="h-full w-full">
          {content}
        </PatternBand>
      </div>
      <div
        className="flex items-center overflow-hidden shrink-0 w-full"
        style={{ height: ROW_HEIGHT_PX }}
      >
        <PatternBand speed={SPEED} direction="right" className="h-full w-full">
          {content}
        </PatternBand>
      </div>
    </section>
  );
}
