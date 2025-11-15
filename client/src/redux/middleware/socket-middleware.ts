import { socketService } from "@/lib/socket";
import { isAction, type Middleware } from "@reduxjs/toolkit";

export const socketMiddleware: Middleware = (/*store*/) =>
  (next) =>
  (action) => {
    if (isAction(action) && typeof action.type === "string") {
      const socket = socketService.getSocket();
      // console.log(action.type);

      if (action.type === "game/clientDrawCard" && socket) {
        socket.emit("client-draw-card");
      }
    }

    return next(action);
  };
