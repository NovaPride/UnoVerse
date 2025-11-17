import express from "express";
import { setupGameHandlers } from "./game/game-server";

const app = express();

const { Server } = require("socket.io");

const httpServer = app.listen(8080);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3030"],
    credentials: true,
  },
});

setupGameHandlers(io);

// херня чисто для socket admin ui
const { instrument } = require("@socket.io/admin-ui");
const adminUI = express();
adminUI.use(express.static("./node_modules/@socket.io/admin-ui/ui/dist"));
adminUI.listen(3030);
instrument(io, { auth: false, mode: "development" });
