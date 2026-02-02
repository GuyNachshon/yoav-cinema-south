"use client";

import PatternBand from "./PatternBand";
import { DiagonalStripes } from "./patterns";

type Props = { className?: string; height?: number };

export default function DiagonalStripeBand({
  className = "",
  height = 24,
}: Props) {
  const segmentWidth = 120;
  const segments = 20;
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <PatternBand speed={25}>
        {Array.from({ length: segments }, (_, i) => (
          <DiagonalStripes
            key={i}
            width={segmentWidth}
            height={height}
            className="inline-block text-white shrink-0"
          />
        ))}
      </PatternBand>
    </div>
  );
}
