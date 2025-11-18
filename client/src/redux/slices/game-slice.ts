// import { type Card } from "@/types/game";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CardId, Player, Room } from "@shared/types/game";

export interface IGame {
  room: Room;
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
      // direction: 1,
      // currentColor: "",
    },
  },
  player: {
    id: "",
    name: "",
    cardIds : []
  },
};

//actions - только херня инвокнутая серваком для изменения state

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    cardDrawn: (state, action: PayloadAction<CardId[]>) => {
      state.player.cardIds = action.payload;
    },
    playerDataChanged: (state, action: PayloadAction<Player>) => {
      state.player = action.payload;
      // state.player.cards.push(action.payload);
    },
    roomDataChanged: (state, action: PayloadAction<Room>) => {
      state.room = action.payload;
      // state.player.cards.push(action.payload);
    },
  },
});
const { actions, reducer } = gameSlice;

export const { roomDataChanged, playerDataChanged, cardDrawn } = actions;
export default reducer;
