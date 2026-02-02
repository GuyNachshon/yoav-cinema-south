"use client";

// Use image from content/assets; Next serves it from build
import bgImage from "@/content/assets/background.png";

type Props = {
  fixed?: boolean;
  className?: string;
};

export default function BackgroundPattern({
  fixed = true,
  className = "",
}: Props) {
  const positionClass = fixed ? "fixed inset-0" : "absolute inset-0 min-h-full";
  const src = typeof bgImage === "string" ? bgImage : (bgImage as { src: string }).src;

  return (
    <div
      className={`${positionClass} -z-10 pointer-events-none ${className}`}
      aria-hidden
      style={{
        backgroundImage: `url(${src})`,
        backgroundRepeat: "repeat",
        backgroundPosition: "center center",
      }}
    />
  );
}
