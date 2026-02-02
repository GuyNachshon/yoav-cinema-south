"use client";

import { CSSProperties, ReactNode, useRef, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  speed?: number;
  style?: CSSProperties;
  direction?: "left" | "right";
  paused?: boolean;
  /** When set, animation duration uses this CSS variable (e.g. for transition/acceleration) */
  speedVariable?: string;
  /** Use measured copy width for animation (fixes gap when itemGap is negative) */
  useExactWidth?: boolean;
};

export default function PatternBand({
  children,
  className = "",
  speed = 30,
  style,
  direction = "left",
  paused = false,
  speedVariable,
  useExactWidth = false,
}: Props) {
  const copyRef = useRef<HTMLDivElement>(null);
  const [copyWidth, setCopyWidth] = useState<number | null>(null);

  useEffect(() => {
    if (!useExactWidth || !copyRef.current) return;
    const el = copyRef.current;
    const measure = () => setCopyWidth(el.offsetWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [useExactWidth, children]);

  const useExact = useExactWidth && copyWidth !== null;
  const animationName =
    useExact
      ? direction === "right"
        ? "scrollRightExact"
        : "scrollExact"
      : direction === "right"
        ? "scrollRight"
        : "scroll";
  const duration = speedVariable
    ? `var(${speedVariable}, ${speed}s)`
    : `${speed}s`;

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={style}
      dir="ltr"
      aria-hidden
    >
      <div
        className="flex items-center w-max whitespace-nowrap"
        style={{
          animationName,
          animationDuration: duration,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: paused ? "paused" : "running",
          ...(useExact && copyWidth !== null
            ? { "--band-copy-width": `${copyWidth}px` }
            : {}),
        } as CSSProperties}
        dir="ltr"
      >
        <div
          ref={copyRef}
          className="inline-flex items-center shrink-0"
        >
          {children}
        </div>
        <div className="inline-flex items-center shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
