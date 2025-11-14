import { type IPlayingField } from "@/redux/slices/playing-field-slice";

interface IState {
  playingField: IPlayingField;
}

export const getPlayingFieldCards = (state: IState) => state.playingField.cards;
