export { default as Diamonds } from "./Diamonds";
export { default as XShape } from "./XShape";
export { default as DiagonalStripes } from "./DiagonalStripes";
export { default as ChevronRight } from "./ChevronRight";
export { default as Camels } from "./Camels";
export { default as Zigzag } from "./Zigzag";
export { default as ArrowUpDown } from "./ArrowUpDown";
export { default as Camera } from "./Camera";
export { default as CurvedArrowDown } from "./CurvedArrowDown";
export { default as FigureWithTool } from "./FigureWithTool";
export { default as ThinLine } from "./ThinLine";

export const PATTERN_KEYS = [
  "diamonds",
  "x",
  "camels",
  "zigzag",
  "doubleChevron",
  "diagonalStripes",
  "singleChevron",
  "arrowUpDown",
  "camera",
  "curvedArrowDown",
  "figureWithTool",
  "thinLine",
] as const;

export type PatternKey = (typeof PATTERN_KEYS)[number];
