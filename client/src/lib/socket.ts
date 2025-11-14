import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket | null = null;

  connect(serverUrl: string) {
    this.socket = io(serverUrl);
    return this.socket;
  }

  getSocket() {
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketService = new SocketService();
