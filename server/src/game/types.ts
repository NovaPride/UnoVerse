export type Color = "red" | "blue" | "green" | "yellow";
export type ActionType =
  | "skip"
  | "reverse"
  | "draw-two"
  | "wild"
  | "wild-draw-four";

export interface Card {
  id: string; // уникальный ID типа "red-5", "wild-draw-four"
  type: "digit" | "action";
  color?: Color; // для wild может быть undefined
  value?: number; // для цифровых карт
  action?: ActionType; // для специальных карт
}

// types/player.ts
export interface Player {
  id: string; // socket.id
  hand: string[]; // массив ID карт, например ['red-5', 'wild', 'blue-skip']
}

// types/game.ts
export interface Game {
  roomId: string;
  players: Player[];
  drawPile: string[]; // массив ID карт
  discardPile: string[]; // массив ID карт
  currentPlayerIndex: number;
  direction: 1 | -1; // направление игры
  currentColor?: Color; // текущий активный цвет
}

// // Все 108 карт UNO - полная колода
// export const UNO_CARDS: Record<string, Card> = {
//   // === КРАСНЫЕ КАРТЫ (25 карт) ===
//   // Числовые (19 карт)
//   "red-0": { id: "red-0", type: "number", color: "red", value: 0 },
//   "red-1-1": { id: "red-1-1", type: "number", color: "red", value: 1 },
//   "red-1-2": { id: "red-1-2", type: "number", color: "red", value: 1 },
//   "red-2-1": { id: "red-2-1", type: "number", color: "red", value: 2 },
//   "red-2-2": { id: "red-2-2", type: "number", color: "red", value: 2 },
//   "red-3-1": { id: "red-3-1", type: "number", color: "red", value: 3 },
//   "red-3-2": { id: "red-3-2", type: "number", color: "red", value: 3 },
//   "red-4-1": { id: "red-4-1", type: "number", color: "red", value: 4 },
//   "red-4-2": { id: "red-4-2", type: "number", color: "red", value: 4 },
//   "red-5-1": { id: "red-5-1", type: "number", color: "red", value: 5 },
//   "red-5-2": { id: "red-5-2", type: "number", color: "red", value: 5 },
//   "red-6-1": { id: "red-6-1", type: "number", color: "red", value: 6 },
//   "red-6-2": { id: "red-6-2", type: "number", color: "red", value: 6 },
//   "red-7-1": { id: "red-7-1", type: "number", color: "red", value: 7 },
//   "red-7-2": { id: "red-7-2", type: "number", color: "red", value: 7 },
//   "red-8-1": { id: "red-8-1", type: "number", color: "red", value: 8 },
//   "red-8-2": { id: "red-8-2", type: "number", color: "red", value: 8 },
//   "red-9-1": { id: "red-9-1", type: "number", color: "red", value: 9 },
//   "red-9-2": { id: "red-9-2", type: "number", color: "red", value: 9 },

//   // Активные (6 карт)
//   "red-skip-1": {
//     id: "red-skip-1",
//     type: "action",
//     color: "red",
//     action: "skip",
//   },
//   "red-skip-2": {
//     id: "red-skip-2",
//     type: "action",
//     color: "red",
//     action: "skip",
//   },
//   "red-reverse-1": {
//     id: "red-reverse-1",
//     type: "action",
//     color: "red",
//     action: "reverse",
//   },
//   "red-reverse-2": {
//     id: "red-reverse-2",
//     type: "action",
//     color: "red",
//     action: "reverse",
//   },
//   "red-draw-two-1": {
//     id: "red-draw-two-1",
//     type: "action",
//     color: "red",
//     action: "draw-two",
//   },
//   "red-draw-two-2": {
//     id: "red-draw-two-2",
//     type: "action",
//     color: "red",
//     action: "draw-two",
//   },

//   // === СИНИЕ КАРТЫ (25 карт) ===
//   "blue-0": { id: "blue-0", type: "number", color: "blue", value: 0 },
//   "blue-1-1": { id: "blue-1-1", type: "number", color: "blue", value: 1 },
//   "blue-1-2": { id: "blue-1-2", type: "number", color: "blue", value: 1 },
//   "blue-2-1": { id: "blue-2-1", type: "number", color: "blue", value: 2 },
//   "blue-2-2": { id: "blue-2-2", type: "number", color: "blue", value: 2 },
//   "blue-3-1": { id: "blue-3-1", type: "number", color: "blue", value: 3 },
//   "blue-3-2": { id: "blue-3-2", type: "number", color: "blue", value: 3 },
//   "blue-4-1": { id: "blue-4-1", type: "number", color: "blue", value: 4 },
//   "blue-4-2": { id: "blue-4-2", type: "number", color: "blue", value: 4 },
//   "blue-5-1": { id: "blue-5-1", type: "number", color: "blue", value: 5 },
//   "blue-5-2": { id: "blue-5-2", type: "number", color: "blue", value: 5 },
//   "blue-6-1": { id: "blue-6-1", type: "number", color: "blue", value: 6 },
//   "blue-6-2": { id: "blue-6-2", type: "number", color: "blue", value: 6 },
//   "blue-7-1": { id: "blue-7-1", type: "number", color: "blue", value: 7 },
//   "blue-7-2": { id: "blue-7-2", type: "number", color: "blue", value: 7 },
//   "blue-8-1": { id: "blue-8-1", type: "number", color: "blue", value: 8 },
//   "blue-8-2": { id: "blue-8-2", type: "number", color: "blue", value: 8 },
//   "blue-9-1": { id: "blue-9-1", type: "number", color: "blue", value: 9 },
//   "blue-9-2": { id: "blue-9-2", type: "number", color: "blue", value: 9 },

//   // Активные (6 карт)
//   "blue-skip-1": {
//     id: "blue-skip-1",
//     type: "action",
//     color: "blue",
//     action: "skip",
//   },
//   "blue-skip-2": {
//     id: "blue-skip-2",
//     type: "action",
//     color: "blue",
//     action: "skip",
//   },
//   "blue-reverse-1": {
//     id: "blue-reverse-1",
//     type: "action",
//     color: "blue",
//     action: "reverse",
//   },
//   "blue-reverse-2": {
//     id: "blue-reverse-2",
//     type: "action",
//     color: "blue",
//     action: "reverse",
//   },
//   "blue-draw-two-1": {
//     id: "blue-draw-two-1",
//     type: "action",
//     color: "blue",
//     action: "draw-two",
//   },
//   "blue-draw-two-2": {
//     id: "blue-draw-two-2",
//     type: "action",
//     color: "blue",
//     action: "draw-two",
//   },

//   // === ЗЕЛЁНЫЕ КАРТЫ (25 карт) ===
//   "green-0": { id: "green-0", type: "number", color: "green", value: 0 },
//   "green-1-1": { id: "green-1-1", type: "number", color: "green", value: 1 },
//   "green-1-2": { id: "green-1-2", type: "number", color: "green", value: 1 },
//   "green-2-1": { id: "green-2-1", type: "number", color: "green", value: 2 },
//   "green-2-2": { id: "green-2-2", type: "number", color: "green", value: 2 },
//   "green-3-1": { id: "green-3-1", type: "number", color: "green", value: 3 },
//   "green-3-2": { id: "green-3-2", type: "number", color: "green", value: 3 },
//   "green-4-1": { id: "green-4-1", type: "number", color: "green", value: 4 },
//   "green-4-2": { id: "green-4-2", type: "number", color: "green", value: 4 },
//   "green-5-1": { id: "green-5-1", type: "number", color: "green", value: 5 },
//   "green-5-2": { id: "green-5-2", type: "number", color: "green", value: 5 },
//   "green-6-1": { id: "green-6-1", type: "number", color: "green", value: 6 },
//   "green-6-2": { id: "green-6-2", type: "number", color: "green", value: 6 },
//   "green-7-1": { id: "green-7-1", type: "number", color: "green", value: 7 },
//   "green-7-2": { id: "green-7-2", type: "number", color: "green", value: 7 },
//   "green-8-1": { id: "green-8-1", type: "number", color: "green", value: 8 },
//   "green-8-2": { id: "green-8-2", type: "number", color: "green", value: 8 },
//   "green-9-1": { id: "green-9-1", type: "number", color: "green", value: 9 },
//   "green-9-2": { id: "green-9-2", type: "number", color: "green", value: 9 },

//   // Активные (6 карт)
//   "green-skip-1": {
//     id: "green-skip-1",
//     type: "action",
//     color: "green",
//     action: "skip",
//   },
//   "green-skip-2": {
//     id: "green-skip-2",
//     type: "action",
//     color: "green",
//     action: "skip",
//   },
//   "green-reverse-1": {
//     id: "green-reverse-1",
//     type: "action",
//     color: "green",
//     action: "reverse",
//   },
//   "green-reverse-2": {
//     id: "green-reverse-2",
//     type: "action",
//     color: "green",
//     action: "reverse",
//   },
//   "green-draw-two-1": {
//     id: "green-draw-two-1",
//     type: "action",
//     color: "green",
//     action: "draw-two",
//   },
//   "green-draw-two-2": {
//     id: "green-draw-two-2",
//     type: "action",
//     color: "green",
//     action: "draw-two",
//   },

//   // === ЖЁЛТЫЕ КАРТЫ (25 карт) ===
//   "yellow-0": { id: "yellow-0", type: "number", color: "yellow", value: 0 },
//   "yellow-1-1": { id: "yellow-1-1", type: "number", color: "yellow", value: 1 },
//   "yellow-1-2": { id: "yellow-1-2", type: "number", color: "yellow", value: 1 },
//   "yellow-2-1": { id: "yellow-2-1", type: "number", color: "yellow", value: 2 },
//   "yellow-2-2": { id: "yellow-2-2", type: "number", color: "yellow", value: 2 },
//   "yellow-3-1": { id: "yellow-3-1", type: "number", color: "yellow", value: 3 },
//   "yellow-3-2": { id: "yellow-3-2", type: "number", color: "yellow", value: 3 },
//   "yellow-4-1": { id: "yellow-4-1", type: "number", color: "yellow", value: 4 },
//   "yellow-4-2": { id: "yellow-4-2", type: "number", color: "yellow", value: 4 },
//   "yellow-5-1": { id: "yellow-5-1", type: "number", color: "yellow", value: 5 },
//   "yellow-5-2": { id: "yellow-5-2", type: "number", color: "yellow", value: 5 },
//   "yellow-6-1": { id: "yellow-6-1", type: "number", color: "yellow", value: 6 },
//   "yellow-6-2": { id: "yellow-6-2", type: "number", color: "yellow", value: 6 },
//   "yellow-7-1": { id: "yellow-7-1", type: "number", color: "yellow", value: 7 },
//   "yellow-7-2": { id: "yellow-7-2", type: "number", color: "yellow", value: 7 },
//   "yellow-8-1": { id: "yellow-8-1", type: "number", color: "yellow", value: 8 },
//   "yellow-8-2": { id: "yellow-8-2", type: "number", color: "yellow", value: 8 },
//   "yellow-9-1": { id: "yellow-9-1", type: "number", color: "yellow", value: 9 },
//   "yellow-9-2": { id: "yellow-9-2", type: "number", color: "yellow", value: 9 },

//   // Активные (6 карт)
//   "yellow-skip-1": {
//     id: "yellow-skip-1",
//     type: "action",
//     color: "yellow",
//     action: "skip",
//   },
//   "yellow-skip-2": {
//     id: "yellow-skip-2",
//     type: "action",
//     color: "yellow",
//     action: "skip",
//   },
//   "yellow-reverse-1": {
//     id: "yellow-reverse-1",
//     type: "action",
//     color: "yellow",
//     action: "reverse",
//   },
//   "yellow-reverse-2": {
//     id: "yellow-reverse-2",
//     type: "action",
//     color: "yellow",
//     action: "reverse",
//   },
//   "yellow-draw-two-1": {
//     id: "yellow-draw-two-1",
//     type: "action",
//     color: "yellow",
//     action: "draw-two",
//   },
//   "yellow-draw-two-2": {
//     id: "yellow-draw-two-2",
//     type: "action",
//     color: "yellow",
//     action: "draw-two",
//   },

//   // === ЧЁРНЫЕ КАРТЫ (8 карт) ===
//   "wild-1": { id: "wild-1", type: "action", action: "wild" },
//   "wild-2": { id: "wild-2", type: "action", action: "wild" },
//   "wild-3": { id: "wild-3", type: "action", action: "wild" },
//   "wild-4": { id: "wild-4", type: "action", action: "wild" },
//   "wild-draw-four-1": {
//     id: "wild-draw-four-1",
//     type: "action",
//     action: "wild-draw-four",
//   },
//   "wild-draw-four-2": {
//     id: "wild-draw-four-2",
//     type: "action",
//     action: "wild-draw-four",
//   },
//   "wild-draw-four-3": {
//     id: "wild-draw-four-3",
//     type: "action",
//     action: "wild-draw-four",
//   },
//   "wild-draw-four-4": {
//     id: "wild-draw-four-4",
//     type: "action",
//     action: "wild-draw-four",
//   },
// };
