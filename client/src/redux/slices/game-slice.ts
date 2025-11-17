import { type Card } from "@/types/game";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface IGame {
  player: {
    cards: Card[];
  };
  discard: {
    cards: Card[];
  };
}

const initialState: IGame = {
  player: {
    cards: [],
  },
  discard: {
    cards: [],
  },
};

//actions - только херня инвокнутая серваком для изменения state

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    cardDrawn: (state, action: PayloadAction<Card>) => {
      state.player.cards.push(action.payload);
    },
  },
});
const { actions, reducer } = gameSlice;

export const { cardDrawn } = actions;
export default reducer;
