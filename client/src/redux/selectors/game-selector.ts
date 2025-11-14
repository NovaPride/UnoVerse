import { type IGame } from "@/redux/slices/game-slice";

interface IState {
  game: IGame;
}

export const getPlayerHandCards = (state: IState) => state.game.player.cards;
export const getDiscardPileCards = (state: IState) => state.game.discard.cards;
