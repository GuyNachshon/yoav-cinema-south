"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import PatternBand from "./PatternBand";

const STRIP_HEIGHT = 130;
const PANEL_WIDTH = 170;
const PANEL_PADDING_RIGHT = 5;
const TICKER_REPEAT = 20;
const DEFAULT_SPEED = 40;
const DEFAULT_ACCELERATION = 0.5;
const IDLE_DURATION = 999;

type Props = {
  src: string;
  title: string;
  alt?: string;
  /** Scroll duration in seconds (lower = faster). */
  speed?: number;
  /** Seconds to ramp from idle to full speed on hover. */
  acceleration?: number;
  /** Scroll direction. Default "left". */
  direction?: "left" | "right";
  /** Gap between items in px (negative = overlap). Optional. */
  itemGap?: number;
  /** Number of item repetitions (use more when itemGap is negative). Optional. */
  repeat?: number;
  /** Show title panel on hover. Default true. Set false for footer-style strips. */
  showTitlePanel?: boolean;
  /** Animation always running (no pause). Default false. Use for footer. */
  alwaysRunning?: boolean;
  /** If set, the strip is a link to this path. */
  href?: string;
};

export default function TickerStrip({
  src,
  title,
  alt = "",
  speed = DEFAULT_SPEED,
  acceleration = DEFAULT_ACCELERATION,
  direction = "left",
  itemGap,
  repeat = TICKER_REPEAT,
  showTitlePanel = true,
  alwaysRunning = false,
  href,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [hasEverHovered, setHasEverHovered] = useState(false);

  const effectiveHovered = alwaysRunning || hovered;
  const effectiveHasEverHovered = alwaysRunning || hasEverHovered;

  const itemGapStyle =
    itemGap !== undefined
      ? ({ marginRight: `${itemGap}px` } as React.CSSProperties)
      : undefined;

  const pattern = (
    <>
      {Array.from({ length: repeat }, (_, i) => (
        <span
          key={i}
          className="inline-flex items-center justify-center shrink-0"
          style={itemGapStyle}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="block h-auto w-auto max-h-[130px] object-contain object-center"
            style={{ verticalAlign: "middle" }}
          />
        </span>
      ))}
    </>
  );

  const section = (
    <section
      className="relative flex items-center overflow-hidden border-b border-black h-[130px] bg-transparent group"
      style={{ height: STRIP_HEIGHT }}
      onMouseEnter={() => {
        if (!alwaysRunning) {
          setHovered(true);
          setHasEverHovered(true);
        }
      }}
      onMouseLeave={() => !alwaysRunning && setHovered(false)}
      aria-hidden
    >
      <div
        className="absolute inset-0 flex items-center justify-start"
        dir="ltr"
        style={
          {
            "--ticker-speed": effectiveHasEverHovered ? `${speed}s` : `${IDLE_DURATION}s`,
            transition: `--ticker-speed ${acceleration}s ease-out`,
          } as React.CSSProperties
        }
      >
        <PatternBand
          className="!h-[130px] flex items-center w-full"
          style={{ height: STRIP_HEIGHT }}
          speed={speed}
          speedVariable="--ticker-speed"
          paused={!effectiveHovered}
          direction={direction}
          useExactWidth={itemGap !== undefined}
        >
          {pattern}
        </PatternBand>
      </div>

      {showTitlePanel && (
        <div
          className="absolute top-0 right-0 z-10 h-full bg-black flex items-center justify-end transition-[width] duration-300 ease-out overflow-hidden"
          style={{
            width: hovered ? PANEL_WIDTH : 0,
            paddingRight: hovered ? PANEL_PADDING_RIGHT : 0,
          }}
        >
          <span className="navbar-font text-white text-[15px] whitespace-break-words text-right block w-full">
            {title}
          </span>
        </div>
      )}
    </section>
  );

  if (href) {
    return (
      <Link href={href} className="block cursor-pointer hover:opacity-95 transition-opacity">
        {section}
      </Link>
    );
  }
  return section;
}
