"use client";

import { motion } from "framer-motion";

export function movieThumbLayoutId(slug: string) {
  return `movie-thumb-${slug}`;
}

const LAYOUT_TRANSITION = {
  layout: { duration: 0.25, ease: [0.32, 0.72, 0, 1] as const },
};

type Props = {
  slug: string;
  src: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function MovieThumbnail({ slug, src, width, height, className, style }: Props) {
  return (
    <motion.div
      layoutId={movieThumbLayoutId(slug)}
      initial={false}
      className={className}
      style={{
        ...style,
        width,
        height,
        overflow: "hidden",
      }}
      transition={LAYOUT_TRANSITION}
    >
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover object-center block"
        width={width}
        height={height}
      />
    </motion.div>
  );
}
