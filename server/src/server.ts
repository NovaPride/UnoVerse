import express from "express";
import { setupGameHandlers } from "./game/game-server.js";
// import { instrument } from "@socket.io/admin-ui";
import { Server } from "socket.io";

const app = express();

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://uno-verse.vercel.app/"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const httpServer = app.listen(8080);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});
app.get(("/hello"), (req, res) => res.send("Hello World!"))

setupGameHandlers(io);

// херня чисто для socket admin ui
// const adminUI = express();
// adminUI.use(express.static("./node_modules/@socket.io/admin-ui/ui/dist"));
// adminUI.listen(3030);
// instrument(io, { auth: false, mode: "development" });
