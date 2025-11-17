import { type Card } from "@/types/game";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GameState, Player } from "@shared/types/game";

export interface IGame {
  info: {
    room: {
      playerInfo: Player;
      data: {
        id: string;
        createAt: string;
        players: Player[];
        gameState: GameState;
      };
    };
  };
  player: {
    cards: Card[];
  };
  discard: {
    cards: Card[];
  };
}

const initialState: IGame = {
  info: {
    room: {
      playerInfo: { id: "", name: "", cards: [] },
      data: {
        id: "",
        createAt: "",
        players: [],
        gameState: {
          drawPile: [],
          discardPile: [],
          currentPlayer: null,
          direction: 1,
          currentColor: "",
        },
      },
    },
  },
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
    playerJoined: (state, action: PayloadAction<Card>) => {
      state.player.cards.push(action.payload);
    },
  },
});
const { actions, reducer } = gameSlice;

export const { cardDrawn } = actions;
export default reducer;
