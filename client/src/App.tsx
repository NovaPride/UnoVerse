import { useSocket } from "@/hooks/useSocket";
import { GamePage } from "@/pages/game-page";
import { MainPage } from "@/pages/main-page";
import { Route, Routes } from "react-router";

// import { io } from "socket.io-client";

//disable contextmenu
document.addEventListener("contextmenu", (e) => e.preventDefault());

// const socket = io("http://localhost:8080");
// socket.on("connect", () => {
//   console.log("Connected, your id:", socket.id);
//   socket.emit("send-message", socket.id, "Да пошел ты нахуй");
// });

// socket.on("receive-message", (message) => {
//   console.log(message);
// });

export function App() {
  useSocket("http://localhost:8080");

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/game/:roomId" element={<GamePage />} />
      <Route path="/*" element={<>404</>} />
    </Routes>
  );
}
