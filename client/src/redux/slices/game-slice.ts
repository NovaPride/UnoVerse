import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Card } from "@/types/game";

export interface IGame {
  player: {
    cards: Card[];
  };
  field: {
    cards: Card[];
  };
}

const initialState: IGame = {
  player: {
    cards: [
      // { type: "digit", content: 1, color: "red", id: 1 },
      // { type: "digit", content: 2, color: "blue", id: 2 },
      // { type: "digit", content: 3, color: "green", id: 3 },
      // { type: "digit", content: 4, color: "yellow", id: 4 },
      // { type: "digit", content: 5, color: "red", id: 5 },
      // { type: "digit", content: 6, color: "blue", id: 6 },
      // { type: "digit", content: 7, color: "green", id: 7 },
      // { type: "digit", content: 8, color: "yellow", id: 8 },
    ],
  },
  field: {
    cards: [],
  },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    clientDrawCard: () => {},
    serverDrawCard: (state, action: PayloadAction<Card>) => {
      state.player.cards.push(action.payload);
    },
  },
});

const { actions, reducer } = gameSlice;

export const { clientDrawCard, serverDrawCard } = actions;
export default reducer;
