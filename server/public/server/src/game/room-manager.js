import { transformPlayer } from "../utils.js";
import { GameEngine } from "./game-engine.js";
export class RoomManager {
    rooms = new Map();
    createRoom(roomId) {
        const room = {
            id: roomId,
            players: [],
            gameState: this.createInitialGameState(),
            createdAt: new Date().toISOString(),
        };
        this.rooms.set(roomId, room);
        return room;
    }
    getRoom(roomId) {
        return this.rooms.get(roomId);
    }
    getRoomPlayers(roomId) {
        return this.rooms.get(roomId)?.players || [];
    }
    addPlayerToRoom(roomId, player) {
        const room = this.rooms.get(roomId);
        if (room) {
            if (room.players.length <= 1) {
                room.players.push(transformPlayer(player));
            }
            else {
                throw new Error("Error: There is already 2 players!");
            }
        }
    }
    removePlayerFromRoom(roomId, playerId) {
        const room = this.rooms.get(roomId);
        if (room) {
            room.players = room.players.filter((player) => player.id !== playerId);
            if (room.players.length === 0) {
                setTimeout(() => {
                    if (this.getRoom(roomId)?.players.length === 0) {
                        this.rooms.delete(roomId);
                        console.log(`Room ${roomId} deleted (no players)`);
                    }
                }, 300000);
            }
        }
    }
    updateGameState(roomId, gameState) {
        const room = this.rooms.get(roomId);
        if (room) {
            room.gameState = gameState;
        }
    }
    createInitialGameState() {
        return {
            drawPile: GameEngine.generateDeck(),
            discardPile: [],
            currentPlayer: null,
            // direction: 1,
        };
    }
}
export const roomManager = new RoomManager();
// import type { ActionType, Card, Color, Game } from "./types";
// type CardOmitID = Omit<Card, "id">;
// // game/GameManager.ts
// export class GameManager {
//   private games = new Map<string, Game>();
//   private cardRegistry = new Map<string, CardOmitID>(); // Реестр карт по ID
//   constructor() {
//     this.initializeCardRegistry();
//   }
//   // Создаём реестр всех возможных карт
//   private initializeCardRegistry() {
//     const colors: Color[] = ["red", "blue", "green", "yellow"];
//     // Числовые карты (0-9 для каждого цвета)
//     colors.forEach((color) => {
//       // Карта 0 (1 копия)
//       this.cardRegistry.set(`${color}-0`, { type: "digit", color, value: 0 });
//       // Карты 1-9 (по 2 копии)
//       for (let value = 1; value <= 9; value++) {
//         this.cardRegistry.set(`${color}-${value}-1`, {
//           type: "digit",
//           color,
//           value,
//         });
//         this.cardRegistry.set(`${color}-${value}-2`, {
//           type: "digit",
//           color,
//           value,
//         });
//       }
//       // Активные карты (по 2 копии каждого типа)
//       const actionTypes: ActionType[] = ["skip", "reverse", "draw-two"];
//       actionTypes.forEach((action) => {
//         this.cardRegistry.set(`${color}-${action}-1`, {
//           type: "action",
//           color,
//           action,
//         });
//         this.cardRegistry.set(`${color}-${action}-2`, {
//           type: "action",
//           color,
//           action,
//         });
//       });
//     });
//     // Чёрные карты (по 4 копии каждого типа)
//     const wildTypes: ActionType[] = ["wild", "wild-draw-four"];
//     wildTypes.forEach((action) => {
//       for (let i = 1; i <= 4; i++) {
//         this.cardRegistry.set(`${action}-${i}`, { type: "action", action });
//       }
//     });
//   }
//   // Получить карту по ID
//   private getCardById(cardId: string): CardOmitID | undefined {
//     return this.cardRegistry.get(cardId);
//   }
//   createGame(roomId: string, playerIds: string[]): Game {
//     const game: Game = {
//       roomId,
//       players: playerIds.map((id) => ({ id, hand: [] })),
//       drawPile: this.generateShuffledDeck(),
//       discardPile: [],
//       currentPlayerIndex: 0,
//       direction: 1,
//     };
//     // Раздаём карты
//     playerIds.forEach((playerId) => {
//       for (let i = 0; i < 7; i++) {
//         this.drawCard(game, playerId);
//       }
//     });
//     // Первая карта в сброс
//     const firstCardId = game.drawPile.pop()!;
//     game.discardPile.push(firstCardId);
//     // Устанавливаем текущий цвет
//     const firstCard = this.getCardById(firstCardId);
//     if (firstCard?.color) {
//       game.currentColor = firstCard.color;
//     }
//     this.games.set(roomId, game);
//     return game;
//   }
//   // Теперь генерируем только ID карт
//   private generateShuffledDeck(): string[] {
//     const deck: string[] = [];
//     // Проходим по всем картам в реестре и добавляем их ID
//     this.cardRegistry.forEach((card, cardId) => {
//       deck.push(cardId);
//     });
//     return this.shuffle(deck);
//   }
//   drawCard(game: Game, playerId: string): string | null {
//     const player = game.players.find((p) => p.id === playerId);
//     if (!player || game.drawPile.length === 0) return null;
//     const cardId = game.drawPile.pop()!;
//     player.hand.push(cardId);
//     return cardId;
//   }
//   playCard(game: Game, playerId: string, cardId: string): boolean {
//     const player = game.players.find((p) => p.id === playerId);
//     if (!player) return false;
//     const cardIndex = player.hand.indexOf(cardId);
//     if (cardIndex === -1) return false;
//     // Проверяем можно ли играть эту карту (логика валидации хода)
//     if (!this.canPlayCard(game, cardId)) return false;
//     // Убираем карту из руки и кладём в сброс
//     player.hand.splice(cardIndex, 1);
//     game.discardPile.push(cardId);
//     // Обрабатываем специальные эффекты карт
//     this.handleCardEffect(game, cardId);
//     // Передаём ход следующему игроку
//     this.nextTurn(game);
//     return true;
//   }
//   private canPlayCard(game: Game, cardId: string): boolean {
//     const card = this.getCardById(cardId);
//     const topCardId = game.discardPile[game.discardPile.length - 1];
//     const topCard = this.getCardById(topCardId);
//     if (!card || !topCard) return false;
//     // Wild карты можно играть всегда
//     if (!card.color) return true;
//     // Совпадение цвета или значения
//     return (
//       card.color === game.currentColor ||
//       (card.type === "digit" &&
//         topCard.type === "digit" &&
//         card.value === topCard.value) ||
//       (card.type === "action" && card.action === topCard.action)
//     );
//   }
//   private handleCardEffect(game: Game, cardId: string) {
//     const card = this.getCardById(cardId);
//     if (!card) return;
//     // Обновляем текущий цвет (для wild карт цвет выбирает игрок)
//     if (card.color) {
//       game.currentColor = card.color;
//     }
//     // Обрабатываем специальные действия
//     switch (card.action) {
//       case "skip":
//         this.nextTurn(game); // пропускаем ход
//         break;
//       case "reverse":
//         game.direction *= -1;
//         break;
//       case "draw-two":
//         this.nextTurn(game);
//         // TODO: следующий игрок берёт 2 карты
//         break;
//       case "wild-draw-four":
//         this.nextTurn(game);
//         // TODO: следующий игрок берёт 4 карты
//         break;
//     }
//   }
//   private nextTurn(game: Game) {
//     game.currentPlayerIndex =
//       (game.currentPlayerIndex + game.direction + game.players.length) %
//       game.players.length;
//   }
//   private shuffle<T>(array: T[]): T[] {
//     const shuffled = [...array];
//     for (let i = shuffled.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//     return shuffled;
//   }
//   getGame(roomId: string): Game | undefined {
//     return this.games.get(roomId);
//   }
//   // Метод для получения данных карты по ID (для клиента)
//   getCardData(cardId: string): CardOmitID | undefined {
//     return this.getCardById(cardId);
//   }
// }
