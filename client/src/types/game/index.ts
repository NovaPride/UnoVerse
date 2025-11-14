export type ColorTypes = "black" | "red" | "green" | "blue" | "yellow";

export type DigitRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type SpecialContent =
  | "skip"
  | "reverse"
  | "draw-two"
  | "wild"
  | "wild-draw-four";

export interface Card {
  id: number;
  type: "digit" | "special";
  color: ColorTypes;
  content: DigitRange | SpecialContent;
}
