"use client";

import PatternBand from "./PatternBand";

const STRIP_HEIGHT_PX = 130;
const DEFAULT_FONT_SIZE = 172;

type Props = {
  text: string;
  speed?: number;
  repeat?: number;
  fontSize?: number;
  spacesBetween?: number;
  direction?: "left" | "right";
};

export default function StripTitleMarquee({
  text,
  speed = 40,
  repeat = 80,
  fontSize = DEFAULT_FONT_SIZE,
  spacesBetween = 2,
  direction = "left",
}: Props) {
  // Cap font size so content fits in 130px strip; line-height 1 keeps height = fontSize
  const effectiveFontSize = Math.min(fontSize, STRIP_HEIGHT_PX);
  const segment = `${text}${" ".repeat(spacesBetween)}`;
  const content = Array.from({ length: repeat }, (_, i) => (
    <span
      key={i}
      className="strip-title-font text-black font-bold break-words inline-flex items-center justify-center whitespace-pre leading-none"
      style={{
        fontSize: effectiveFontSize,
        lineHeight: 1,
        height: STRIP_HEIGHT_PX,
      }}
    >
      <span
        className="block leading-none"
        style={{
          lineHeight: 1,
          fontSize: effectiveFontSize,
          // Nudge up: use whole pixels to avoid GPU compositing ghosting
          transform: `translateY(-${Math.round(effectiveFontSize * 0.06)}px)`,
        }}
      >
        {segment}
      </span>
    </span>
  ));

  return (
    <section
      className="flex items-center justify-center overflow-hidden border-b border-black h-[130px] bg-transparent"
      dir="ltr"
      aria-hidden
    >
      <PatternBand
        className="flex items-center w-full h-[130px]"
        style={{ height: STRIP_HEIGHT_PX }}
        speed={speed}
        direction={direction}
      >
        <>{content}</>
      </PatternBand>
    </section>
  );
}
