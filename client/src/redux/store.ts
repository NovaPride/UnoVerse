import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "@/redux/slices/game-slice";
import { socketMiddleware } from "@/redux/middleware/socket-middleware";

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
