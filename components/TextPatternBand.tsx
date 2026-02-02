"use client";

import PatternBand from "./PatternBand";

type Props = {
  text: string;
  repeat?: number;
  className?: string;
  speed?: number;
  textClassName?: string;
};

export default function TextPatternBand({
  text,
  repeat = 40,
  className = "",
  speed = 35,
  textClassName = "",
}: Props) {
  const content = Array.from({ length: repeat }, (_, i) => (
    <span key={i} className={textClassName}>
      {text}{" "}
    </span>
  ));
  return (
    <PatternBand className={className} speed={speed}>
      <>{content}</>
    </PatternBand>
  );
}
