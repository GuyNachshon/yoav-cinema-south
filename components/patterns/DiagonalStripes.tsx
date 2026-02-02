"use client";

import { useId } from "react";

type Props = { className?: string; width?: number; height?: number };

export default function DiagonalStripes({
  className = "",
  width = 200,
  height = 24,
}: Props) {
  const id = useId().replace(/:/g, "-");
  const stripeWidth = 12;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <pattern
          id={`diagonal-stripes-${id}`}
          width={stripeWidth * 2}
          height={height * 2}
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-45)"
        >
          <rect width={stripeWidth} height={height * 2} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#diagonal-stripes-${id})`} />
    </svg>
  );
}
