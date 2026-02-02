"use client";

type Props = { className?: string; size?: number };

export default function Camera({ className = "", size = 32 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="2" y="8" width="28" height="18" rx="2" fill="currentColor" />
      <circle cx="16" cy="17" r="5" fill="black" />
      <rect x="26" y="10" width="4" height="3" rx="0.5" fill="currentColor" />
      <path d="M10 8h2v2h-2z M20 8h2v2h-2z" fill="currentColor" />
    </svg>
  );
}
