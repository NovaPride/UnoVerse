import { navigateTo } from "@/lib/navigation";
import {
  cardDrawn,
  playerDataChanged,
  roomDataChanged,
} from "@/redux/slices/game-slice";
import { store } from "@/redux/store";
import type { Player } from "@shared/types/game";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

class ClientSocket {
  private socket: Socket | null = null;

  get __private() {
    return {
      connect: (serverUrl: string) => {
        const playerName = localStorage.getItem("player-name");
        this.socket = io(serverUrl, {
          auth: {
            name: playerName ? playerName : "anon",
            currentRoomId: "asd",
            // clientId: "clientId",
            // token: "token",
          },
        });
        this.setupListeners();
      },
      disconnect: () => {
        this.socket?.disconnect();
        this.socket = null;
      },
      getSocket: () => this.socket,
    };
  }

  //листенеры событий приходящих с сервака
  private setupListeners() {
    if (!this.socket) return;

    this.socket.on("server-card-drawn", (cardIds) => {
      store.dispatch(cardDrawn(cardIds));
    });
    this.socket.on("server-player-connected", (playerInfo) => {
      store.dispatch(playerDataChanged(playerInfo));
    });
    this.socket.on("server-player-joined", (roomInfo) => {
      store.dispatch(roomDataChanged(roomInfo));
    });
    this.socket.on("server-player-left", (roomInfo) => {
      store.dispatch(roomDataChanged(roomInfo));
    });
    this.socket.on("server-room-connected-error", (errorMessage) => {
      toast.error(errorMessage);
      navigateTo("/");
    });
    this.socket.on("server-game-state-updated", (errorMessage) => {
      toast.error(errorMessage);
      navigateTo("/");
    });

    // this.socket.on("server-game-created", (game) => {
    //   console.log("!!!GAME CREATED!!!", game);
    //   navigateTo(`/game/${game.roomId}`);
    // });
  }

  //методы для инвока событий на сервак

  playerDataChange(playerData: Player) {
    this.socket?.emit("client-player-data-change", playerData);
  }
  drawCard() {
    this.socket?.emit("client-draw-card");
  }
  connectRoom(roomId: string) {
    this.socket?.emit("client-connect-room", roomId);
  }
}

export const clientSocket = new ClientSocket();
