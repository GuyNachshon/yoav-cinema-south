"use client";

type Props = { className?: string; size?: number };

export default function XShape({ className = "", size = 24 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 4L20 20M20 4L4 20"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
