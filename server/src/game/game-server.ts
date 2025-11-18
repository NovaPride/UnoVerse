// server/gameServer.ts
import { Server } from "socket.io";
import { roomManager } from "./room-manager";
import type { Player } from "@shared/types/game";

export function setupGameHandlers(io: Server) {
  io.on("connection", (socket) => {
    const authName = socket.handshake.auth.name;

    let player: Player = {
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

    socket.on("client-player-data-change", (playerData: Player) => {
      player = playerData;
    });

    socket.on("client-draw-card", () => {
      socket.emit("server-card-drawn", {
        color: "red",
        type: "digit",
        content: 2,
        id: "2 ",
      });
    });
  });
}

// socket.on("client-create-game", (roomId) => {
//   if (!roomId) {
//     console.log("client-create-game Doesn provide roomId");
//     return;
//   }

//   const game = gameManager.createGame(roomId, [socket.id]);
//   socket.join(roomId);
//   socket.emit("server-game-created", game);
// });

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
