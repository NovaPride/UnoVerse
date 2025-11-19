// server/gameServer.ts
import { Server } from "socket.io";
import { roomManager } from "./room-manager.js";
import type { BasePlayer } from "@shared/types/game";
import { GameEngine } from "./game-engine.js";

export function setupGameHandlers(io: Server) {
  const gameEngine = new GameEngine(); //убрать нахуй и сделать как с roommaanger

  io.on("connection", (socket) => {
    const authName = socket.handshake.auth.name;

    let player: BasePlayer = {
      id: socket.id,
      name: authName ? authName : "anonymous",
    };

    socket.emit("server-player-connected", {
      id: player.id,
      name: player.name,
    });

    socket.on("disconnect", () => {
      const roomId = socket.data.roomId;
      if (roomId) {
        const room = roomManager.getRoom(roomId);
        if (room) {
          roomManager.removePlayerFromRoom(roomId, socket.id);
          io.to(roomId).emit("server-player-left", room);
        }
      }
    });

    socket.on("client-connect-room", (roomId) => {
      if (!roomId) return;

      let room = roomManager.getRoom(roomId);
      if (!room) room = roomManager.createRoom(roomId);

      try {
        roomManager.addPlayerToRoom(roomId, player);
      } catch (err: unknown) {
        if (err instanceof Error)
          socket.emit("server-room-connected-error", err.message);

        return;
      }

      socket.join(roomId);
      socket.data.roomId = roomId;

      io.to(roomId).emit("server-player-joined", room);
    });

    socket.on("client-player-data-change", (playerData: BasePlayer) => {
      player = playerData;
    });

    socket.on("client-draw-card", () => {
      const roomId = socket.data.roomId;
      if (!roomId) return;

      const room = roomManager.getRoom(roomId);
      if (!room) return;

      const player = room.players.find((elem) => elem.id === socket.id);
      if (!player) {
        return;
      }

      const success = gameEngine.drawCard(room, player);
      if (success) {
        socket.emit("server-card-drawn", player.cardIds);
      } else {
        socket.emit("server-draw-card-error", "Cannot draw card");
      }
    });

    socket.on("client-play-card", (cardId: string) => {
      const roomId = socket.data.roomId;
      if (!roomId) return;

      const room = roomManager.getRoom(roomId);
      if (!room) return;

      const player = room.players.find((elem) => elem.id === socket.id);
      if (!player) {
        return;
      }
      const success = gameEngine.playCard(room, player, cardId);

      if (success) {
        socket.emit("server-card-played", player);
        io.to(roomId).emit("server-discard-pile-updated", room.gameState.discardPile);
      } else {
        socket.emit("server-play-card-error", "Cannot play card");
      }
    });
  });
}
