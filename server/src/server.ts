// import express from "express";
import { Socket } from "socket.io";
import { generateCard } from "./generate-card";

// const app = express();

// const http = require("http");
// const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(8080, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`+++ ${socket.id} connected`);
  socket.on("disconnect", () => {
    console.log(`--- ${socket.id} disconnected`);
    console.log(`______________`);
  });

  socket.on("client-draw-card", () => {
    const card = generateCard();
    console.log("Generated card: ", card);
    socket.emit("server-draw-card", card);
  });

  // socket.on("send-message", (id: any, data) => {
  //   console.log(id, data);
  //   socket.broadcast.emit("receive-message", `Еблан ? C любовью от ${id}`);
  // });
});

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
