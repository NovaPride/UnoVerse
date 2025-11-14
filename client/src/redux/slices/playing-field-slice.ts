import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Card } from "@/types/game";

export interface IPlayingField {
  cards: Card[];
}

const initialState: IPlayingField = {
  cards: [{ type: "digit", content: 1, color: "red", id: 1 }],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    drawCard: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload);
    },
  },
});

const { actions, reducer } = gameSlice;

export const { drawCard } = actions;
export default reducer;
