"use client";

type Props = { className?: string; size?: number };

export default function Diamonds({ className = "", size = 24 }: Props) {
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
        d="M12 2L14 8L12 14L10 8L12 2Z M12 14L14 20L12 22L10 20L12 14Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}
