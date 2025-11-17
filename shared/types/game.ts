export interface Player {
  id: string;
  name: string;
  cards: string[];
  isReady?: boolean;
}

export interface GameState {
  drawPile: string[];
  discardPile: string[];
  currentPlayer: string | null; // ID текущего игрока
  direction: 1 | -1;
  currentColor?: string;
  // status: 'waiting' | 'playing' | 'finished';
}

export interface RoomData {
  id: string;
  players: Player[];
  gameState: GameState;
  createdAt: Date;
}