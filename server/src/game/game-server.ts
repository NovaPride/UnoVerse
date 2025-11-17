// server/gameServer.ts
import { Server } from "socket.io";
import { roomManager } from "./room-manager";
import type { Player } from "@shared/types/game";

export function setupGameHandlers(io: Server) {
  io.on("connection", (socket) => {
    // const clientId = socket.handshake.auth.clientId;
    // const token = socket.handshake.auth.token;
    const player: Player = {
      id: socket.id,
      name: `asdasdas`,
      cards: [],
    };

    socket.on("disconnect", () => {
      const roomId = socket.data.roomId;
      if (roomId) {
        // console.log(`Player ${socket.id} disconnected from room ${roomId}`);

        const room = roomManager.getRoom(roomId);
        if (room) {
          roomManager.removePlayerFromRoom(roomId, socket.id);

          // socket.to(roomId).emit("server-player-left", {
          //   playerId: socket.id,
          //   roomData: room,
          //   // reason: reason
          // });
        }
      }
    });

    socket.on("client-connect-room", (roomId) => {
      if (!roomId) {
        // console.log("client-connect-room Doesn provide roomId");
        return;
      }

      let room = roomManager.getRoom(roomId);
      if (!room) {
        room = roomManager.createRoom(roomId);
        // console.log(`Created new room: ${roomId}`);
      }
      try {
        roomManager.addPlayerToRoom(roomId, player);
      } catch (err: unknown) {
        if (err instanceof Error)
          socket.emit("server-room-connected-error", err.message);

        return;
      }

      socket.join(roomId);
      socket.data.roomId = roomId;

      // console.log(`${player.id} connected to ${roomId}`);
      console.log(`Room ${roomId} now has ${room.players.length} players`);

      io.to(roomId).emit("server-player-joined", {
        playerInfo: player,
        roomData: room,
      });

      // socket.to(roomId).emit("server-player-joined", {
      //   newPlayer: player,
      //   roomData: room,
      // });
    });

    socket.on("client-draw-card", () => {
      socket.emit("server-card-drawn", {
        color: "red",
        type: "digit",
        content: 2,
        id: "2 ",
      });
    });

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
