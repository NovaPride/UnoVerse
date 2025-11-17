import express from "express";
// import { Socket } from "socket.io";
// import { generateCard } from "./generate-card";
import { setupGameHandlers } from "./game/game-server";

const app = express();

// const { createServer } = require("http");

const { Server } = require("socket.io");
// const http = require("http");
// const server = http.createServer(app);

const httpServer = app.listen(8080);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3030"],
    credentials: true,
  },
});

setupGameHandlers(io);

const { instrument } = require("@socket.io/admin-ui");
const adminUI = express();
adminUI.use(express.static("./node_modules/@socket.io/admin-ui/ui/dist"));
adminUI.listen(3030);
instrument(io, { auth: false, mode: "development" });
// httpServer.listen(8080, () => {
//   console.log("Server is running on port ");
// });

// io.on("connection", (socket: Socket) => {
//   console.log(`+++ ${socket.id} connected`);
//   socket.on("disconnect", () => {
//     console.log(`--- ${socket.id} disconnected`);
//     console.log(`______________`);
//   });

//   socket.on("client-draw-card", () => {
//     const card = generateCard();
//     socket.emit("server-draw-card", card);
//   });
// });

// server.listen(8080, () => {
//   console.log("listening on *:8080");
// });

// app.get("/", (req, res) => {
//   // res.send("<h1>Hello world</h1>");
//   res.json({ test: [1, 2, 3, 4, 5] });
// });

// app.use(cors(corsOptions));

// app.get("/api", (req, res) => {
//   res.json({ test: [1, 2, 3, 4, 5] });
// });

// app.listen(8080, () => {
//   console.log("Server started on port 8080");
// });
