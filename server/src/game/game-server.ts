// server/gameServer.ts
import { GameManager } from "./game-manager";
import { Server } from "socket.io";

const gameManager = new GameManager();

export function setupGameHandlers(io: Server) {
  io.on("connection", (socket) => {
    const clientId = socket.handshake.auth.clientId;
    const token = socket.handshake.auth.token;
    
    console.log(`+++ ${socket.id} connected ${clientId} ${token}`);
    socket.on("disconnect", () => {
      console.log(`--- ${socket.id} disconnected`);
      console.log(`______________`);
    });

    socket.on("create-game", (roomId) => {
      const game = gameManager.createGame(roomId, [socket.id]);
      socket.join(roomId);
      socket.emit("game-created", game);
    });

    // socket.on("join-game", (roomId) => {
    //   const game = gameManager.getGame(roomId);
    //   if (game && game.players.length < 4) {
    //     game.players.push({ id: socket.id, hand: [] });
    //     // Раздать карты новому игроку
    //     for (let i = 0; i < 7; i++) {
    //       gameManager.drawCard(game, socket.id);
    //     }
    //     socket.join(roomId);
    //     io.to(roomId).emit("player-joined", game);
    //   }
    // });

    // socket.on("play-card", (roomId, cardId) => {
    //   const game = gameManager.getGame(roomId);
    //   if (game && gameManager.playCard(game, socket.id, cardId)) {
    //     io.to(roomId).emit("game-update", game);
    //   }
    // });

    // socket.on("draw-card", (roomId) => {
    //   const game = gameManager.getGame(roomId);
    //   if (game) {
    //     const cardId = gameManager.drawCard(game, socket.id);
    //     socket.emit("card-drawn", cardId);
    //     io.to(roomId).emit("game-update", game);
    //   }
    // });
  });
}
