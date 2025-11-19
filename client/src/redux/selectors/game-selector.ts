import { parseCardId } from "@/lib/utils";
import { type IGame } from "@/redux/slices/game-slice";
import { createSelector } from "@reduxjs/toolkit";

interface IState {
  game: IGame;
}

// export const getPlayerHandCards = (state: IState) => state.game.player.cards;
// export const getDiscardPileCards = (state: IState) => state.game.discard.cards;
export const getRoom = (state: IState) => state.game.room;
export const getPlayer = (state: IState) => state.game.player;
const selectPlayerCardIds = (state: IState) => state.game.player.cardIds;

export const selectPlayerCards = createSelector(
  [selectPlayerCardIds],
  (cardIds) => cardIds?.map(parseCardId),
);

// export const selectCardById = createSelector(
//   [selectPlayerCardIds, (_, cardId: string) => cardId],
//   (cardIds, cardId) => parseCardId(cardId),
// );

const selectDiscardPileCardIds = (state: IState) =>
  state.game.room.gameState.discardPile;

export const selectDiscardPilerCards = createSelector(
  [selectDiscardPileCardIds],
  (cardIds) => cardIds?.map(parseCardId),
);
