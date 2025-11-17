import { cardDrawn } from "@/redux/slices/game-slice";
import { store } from "@/redux/store";
import { io, Socket } from "socket.io-client";
import { navigateTo } from "./navigation";

class ClientSocket {
  private socket: Socket | null = null;

  get __private() {
    return {
      connect: (serverUrl: string) => {
        this.socket = io(serverUrl, {
          auth: {
            clientId: "popapisya",
            token: "sada",
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

    this.socket.on("server-card-drawn", (card) => {
      store.dispatch(cardDrawn(card));
    });
    this.socket.on("server-game-created", (game) => {
      console.log("!!!GAME CREATED!!!", game);
      navigateTo(`/game/${game.roomId}`);
    });
  }

  //методы для инвока событий на сервак
  drawCard() {
    this.socket?.emit("client-draw-card");
  }
  createGame(roomId: string) {
    this.socket?.emit("client-create-game", roomId);
  }
}

export const clientSocket = new ClientSocket();
