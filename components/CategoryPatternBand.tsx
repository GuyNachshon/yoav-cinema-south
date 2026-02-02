"use client";

import PatternBand from "./PatternBand";
import {
  Diamonds,
  XShape,
  Camels,
  Zigzag,
  ChevronRight,
  DiagonalStripes,
  ArrowUpDown,
  Camera,
  CurvedArrowDown,
  FigureWithTool,
  ThinLine,
} from "./patterns";
import type { PatternKey } from "./patterns";

type Props = {
  patternKey: PatternKey;
  className?: string;
};

function renderPattern(key: PatternKey, i: number) {
  const base = "inline-block text-white shrink-0";
  switch (key) {
    case "diamonds":
      return <Diamonds key={i} className={base} size={28} />;
    case "x":
      return <XShape key={i} className={base} size={28} />;
    case "camels":
      return <Camels key={i} className={base} size={40} />;
    case "zigzag":
      return <Zigzag key={i} className={base} size={28} />;
    case "doubleChevron":
      return <ChevronRight key={i} className={base} size={28} double />;
    case "diagonalStripes":
      return <DiagonalStripes key={i} width={80} height={32} className={base} />;
    case "singleChevron":
      return <ChevronRight key={i} className={base} size={28} />;
    case "arrowUpDown":
      return <ArrowUpDown key={i} className={base} size={28} />;
    case "camera":
      return <Camera key={i} className={base} size={32} />;
    case "curvedArrowDown":
      return <CurvedArrowDown key={i} className={base} size={28} />;
    case "figureWithTool":
      return <FigureWithTool key={i} className={base} size={32} />;
    case "thinLine":
      return <ThinLine key={i} width={60} className={base} />;
    default:
      return null;
  }
}

export default function CategoryPatternBand({ patternKey, className = "" }: Props) {
  const segmentCount = 25;
  return (
    <PatternBand className={className} speed={patternKey === "thinLine" ? 40 : 30}>
      {Array.from({ length: segmentCount }, (_, i) => renderPattern(patternKey, i))}
    </PatternBand>
  );
}
