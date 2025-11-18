// import { type Card } from "@/types/game";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Player, RoomData } from "@shared/types/game";

export interface IGame {
  room: RoomData;
  player: Player;
}

const initialState: IGame = {
  room: {
    id: "",
    createdAt: new Date().toISOString(),
    players: [],
    gameState: {
      drawPile: [],
      discardPile: [],
      currentPlayer: null,
      direction: 1,
      currentColor: "",
    },
  },
  player: {
    id: "",
    name: "",
  },
};

//actions - только херня инвокнутая серваком для изменения state

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // cardDrawn: (state, action: PayloadAction<Card>) => {
    //   state.player.cards.push(action.payload);
    // },
    playerDataChanged: (state, action: PayloadAction<Player>) => {
      state.player = action.payload;
      // state.player.cards.push(action.payload);
    },
    roomDataChanged: (state, action: PayloadAction<RoomData>) => {
      state.room = action.payload;
      // state.player.cards.push(action.payload);
    },
  },
});
const { actions, reducer } = gameSlice;

export const { roomDataChanged, playerDataChanged } = actions;
export default reducer;
