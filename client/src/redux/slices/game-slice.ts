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

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    clientDrawCard: () => {},
    serverDrawCard: (state, action: PayloadAction<Card>) => {
      state.player.cards.push(action.payload);
    },
    clientCreateGame: () => {},
    serverGameCreated: (state, action: PayloadAction<Card>) => {
      console.log("serverGameCreated: ", action.payload)
    },
  },
});

const { actions, reducer } = gameSlice;

export const { clientDrawCard, serverDrawCard } = actions;
export default reducer;
