import { type Middleware } from "@reduxjs/toolkit";
import { socketService } from "@/lib/socket";


export const socketMiddleware: Middleware = (store) => (next) => (action) => {
    const socket = socketService.getSocket();
    console.log(action)

    if (action.type === "game/clientDrawCard" && socket) {
      socket.emit("client-draw-card");
    }

    // ►►► Перехватываем экшены для отправки на сервер
    // if (action.type === "game/playCard" && socket) {
    //   socket.emit("play-card", action.payload);
    // }

    // if (action.type === "game/drawCard" && socket) {
    //   socket.emit("draw-card", action.payload);
    // }

    // if (action.type === "game/joinRoom" && socket) {
    //   socket.emit("join-room", action.payload);
    // }

    return next(action);
  };
