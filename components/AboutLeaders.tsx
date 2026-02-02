"use client";

import { useState } from "react";
import aboutLeadersData from "@/content/about-leaders.json";

type LeaderEntry = { filename: string; name: string; description: string };
const LEADERS_LIST: LeaderEntry[] = (aboutLeadersData as { leaders: LeaderEntry[] }).leaders;
const LEADER_BY_FILENAME = new Map(
  LEADERS_LIST.map((l) => [l.filename, l])
);

const LEADER_IMAGES = [
  "Danielle Cohen 1.png",
  "Tamir Hod_0 1.png",
  "אסף יעיש ביטון 1.png",
  "ליאור הנגבי 1.png",
  "ליהיא בנימין מנהלת אמנותית 1.png",
  "רני בלייר איש צוות 1.png",
];

const GAP = 20;
const ROW_HEIGHT = 480;
const COLLAPSED_WIDTH = 80;
const SIDE_PADDING = 130;

export default function AboutLeaders() {
  const [openIndex, setOpenIndex] = useState<number | null>(LEADER_IMAGES.length - 1);

  return (
    <div
      className="w-full overflow-hidden"
    >
      <div
        className="flex flex-row-reverse items-stretch overflow-hidden"
        style={{ gap: GAP, height: ROW_HEIGHT }}
        dir="ltr"
      >
        {[...LEADER_IMAGES].reverse().map((filename, reversedIndex) => {
          const index = LEADER_IMAGES.length - 1 - reversedIndex;
          const isOpen = openIndex === index;
          return (
            <button
              key={filename}
              type="button"
              className="cursor-pointer border-0 p-0 bg-transparent block overflow-hidden transition-all duration-150 ease-out min-w-0"
              style={{
                height: ROW_HEIGHT,
                width: isOpen ? undefined : COLLAPSED_WIDTH,
                flex: isOpen ? "1 1 0" : "0 0 auto",
                minWidth: isOpen ? 200 : COLLAPSED_WIDTH,
              }}
            onClick={() =>
              setOpenIndex((prev) => (prev === index ? null : index))
            }
            aria-label={isOpen ? "Close leader" : `View leader ${index + 1}`}
            aria-expanded={isOpen}
          >
            <span className="relative block w-full h-full">
              <img
                src={`/api/about/leaders/${encodeURIComponent(filename)}`}
                alt=""
                className="block w-full h-full object-cover object-top"
                draggable={false}
              />
              {isOpen && LEADER_BY_FILENAME.get(filename) && (
                <span
                  className="absolute bottom-0 left-0 right-0 p-4 text-white text-right bg-gradient-to-t from-black/90 to-transparent"
                  dir="rtl"
                >
                  <span className="block font-semibold text-lg">
                    {LEADER_BY_FILENAME.get(filename)!.name}
                  </span>
                  <span className="block text-sm opacity-90 mt-0.5">
                    {LEADER_BY_FILENAME.get(filename)!.description}
                  </span>
                </span>
              )}
            </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
