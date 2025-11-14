import { configureStore } from "@reduxjs/toolkit";
import playerHandReducer from "@/redux/slices/player-hand-slice";
import playingFieldReducer from "@/redux/slices/playing-field-slice";

export const store = configureStore({
  reducer: {
    playerHand: playerHandReducer,
    playingField: playingFieldReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
