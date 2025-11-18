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
const selectCardIds = (state: IState) => state.game.player.cardIds;

export const selectPlayerCards = createSelector([selectCardIds], (cardIds) =>
  cardIds?.map(parseCardId),
);

export const selectCardById = createSelector(
  [selectCardIds, (_, cardId: string) => cardId],
  (cardIds, cardId) => parseCardId(cardId),
);
