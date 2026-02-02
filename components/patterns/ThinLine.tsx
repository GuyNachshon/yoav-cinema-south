"use client";

type Props = { className?: string; width?: number };

export default function ThinLine({ className = "", width = 200 }: Props) {
  return (
    <svg
      width={width}
      height="2"
      viewBox={`0 0 ${width} 2`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line
        x1="0"
        y1="1"
        x2={width}
        y2="1"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
