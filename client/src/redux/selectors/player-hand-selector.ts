import { type IPlayerHand } from "@/redux/slices/player-hand-slice";

interface IState {
  playerHand: IPlayerHand;
}

export const getPlayerHandCards = (state: IState) => state.playerHand.cards;
