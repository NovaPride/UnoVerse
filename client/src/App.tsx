import { Route, Routes } from "react-router";
import GamePage from "@/pages/game-page";

document.addEventListener("contextmenu", (e) => e.preventDefault());

function App() {
  return (
    <Routes>
      <Route path="/" element={<GamePage />} />
      <Route path="/game/:roomId" element={<GamePage />} />
      <Route path="/*" element={<>404</>} />
    </Routes>
  );
}

export default App;
