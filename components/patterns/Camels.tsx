"use client";

type Props = { className?: string; size?: number };

export default function Camels({ className = "", size = 48 }: Props) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 48 28"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M8 20c-2 0-4-2-4-6s2-6 4-6 4 2 4 6-2 6-4 6zm2-10l4 4h4l4-4-2-4h-4l-2 2-2-2h-2l-2 4zm8 10c-2 0-4-2-4-6s2-6 4-6 4 2 4 6-2 6-4 6zm6-10l4 4h4l4-4-2-4h-4l-2 2-2-2h-2l-2 4zm8 10c-2 0-4-2-4-6s2-6 4-6 4 2 4 6-2 6-4 6z" />
    </svg>
  );
}
