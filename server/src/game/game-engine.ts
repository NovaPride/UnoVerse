import type { Room, CardId, Player } from "@shared/types/game";

export class GameEngine {
  // ДОБАВЛЕНО: статический метод для генерации колоды
  static generateDeck(): string[] {
    const colors: string[] = ["red", "blue", "green", "yellow"];
    const deck: string[] = [];

    // Числовые карты (0-9)
    colors.forEach((color) => {
      // Карта 0 (1 копия)
      deck.push(`${color}:0:1`);

      // Карты 1-9 (по 2 копии)
      for (let value = 1; value <= 9; value++) {
        deck.push(`${color}:${value}:1`);
        deck.push(`${color}:${value}:2`);
      }

      // Активные карты (по 2 копии каждого типа)
      const actionTypes = ["skip", "reverse", "draw-two"];
      actionTypes.forEach((action) => {
        deck.push(`${color}:${action}:1`);
        deck.push(`${color}:${action}:2`);
      });
    });

    // Чёрные карты (по 4 копии каждого типа)
    const wildTypes = ["wild", "wild-draw-four"];
    wildTypes.forEach((action) => {
      for (let i = 1; i <= 4; i++) {
        deck.push(`black:${action}:${i}`);
      }
    });

    return this.shuffleDeck(deck);
  }

  // ДОБАВЛЕНО: статический метод для перемешивания
  private static shuffleDeck(cards: CardId[]): CardId[] {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  drawCard(room: Room, player: Player): boolean {
    if (room.gameState.drawPile.length === 0) {
      if (!this.reshuffleDiscardPile(room)) {
        return false;
      }
    }

    const card = room.gameState.drawPile.pop()!;
    player.cardIds.push(card);

    return true;
  }

  playCard(room: Room, player: Player, cardId: string): boolean {
    if (player.cardIds.includes(cardId)) {
      player.cardIds = player.cardIds.filter((id) => id !== cardId);
      room.gameState.discardPile.push(cardId);
      return true;
    } else {
      return false;
    }
  }

  // ИЗМЕНЕНО: возвращает boolean для индикации успеха
  private reshuffleDiscardPile(room: Room): boolean {
    if (room.gameState.discardPile.length <= 1) {
      return false; // Недостаточно карт для перетасовки
    }

    const topCard = room.gameState.discardPile.pop()!;
    room.gameState.drawPile = GameEngine.shuffleDeck(
      room.gameState.discardPile
    );
    room.gameState.discardPile = [topCard];

    return true;
  }
}
