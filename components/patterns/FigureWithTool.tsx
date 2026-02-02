"use client";

type Props = { className?: string; size?: number };

export default function FigureWithTool({ className = "", size = 32 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="16" cy="8" r="4" />
      <path d="M10 14v10h4v-6h4v6h4V14l-2-4h-8l-2 4z" />
      <rect x="14" y="22" width="4" height="6" />
    </svg>
  );
}
