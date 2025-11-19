export type DateTimeString = string;
export type CardId = string;
export type PlayerId = string;
export type RoomId = string;

export interface BasePlayer {
  id: string;
  name: string;
}

export interface Player extends BasePlayer {
  cardIds: CardId[];
}

export interface Room {
  id: RoomId;
  players: Player[];
  gameState: GameState;
  createdAt: DateTimeString;
}

export interface GameState {
  drawPile: CardId[];
  discardPile: CardId[];
  currentPlayer: PlayerId | null;
  // direction: 1 | -1;
  // currentColor?: string;
}

export type ColorTypes = "black" | "red" | "green" | "blue" | "yellow";

export type DigitRange = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type SpecialContent =
  | "skip"
  | "reverse"
  | "draw-two"
  | "wild"
  | "wild-draw-four";

export interface Card {
  id: string;
  type: "digit" | "special";
  color: ColorTypes;
  content: DigitRange | SpecialContent;
}
