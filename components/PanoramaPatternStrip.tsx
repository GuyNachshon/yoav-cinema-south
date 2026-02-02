"use client";

import { useState } from "react";
import PatternBand from "./PatternBand";
import BackgroundPattern from "./BackgroundPattern";

const STRIP_HEIGHT = 26;
const PATTERN_GAP = -6;
const REPEAT = 80;

function PanoramaPatternIcon() {
  return (
    <svg width={117} height={26} viewBox="0 0 117 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="block shrink-0">
      <path d="M55 26H81L116.5 0H90.5L55 26Z" fill="black" />
      <path d="M0 26H26L61.5 0H35.5L0 26Z" fill="black" />
    </svg>
  );
}

export default function PanoramaPatternStrip() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative mt-[30px] h-[26px] overflow-hidden"
      style={{ height: STRIP_HEIGHT }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-hidden
    >
      <BackgroundPattern fixed={false} className="absolute inset-0 min-h-0" />
      <div className="absolute inset-0 flex items-center" dir="ltr">
        <PatternBand
          className="!h-[26px] flex items-center w-full"
          style={{ height: STRIP_HEIGHT }}
          speed={25}
          direction="right"
          useExactWidth
          paused={!hovered}
        >
          {Array.from({ length: REPEAT }, (_, i) => (
            <span
              key={i}
              className="inline-flex items-center justify-center shrink-0"
              style={{ marginRight: PATTERN_GAP }}
            >
              <PanoramaPatternIcon />
            </span>
          ))}
        </PatternBand>
      </div>
    </div>
  );
}
