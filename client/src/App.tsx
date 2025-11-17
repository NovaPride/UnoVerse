import { setNavigate } from "@/lib/navigation";
import { GamePage } from "@/pages/game-page";
import { MainPage } from "@/pages/main-page";
import { useEffect } from "react";
import { Route, Routes } from "react-router";
import { useNavigate } from "react-router-dom";

//disable contextmenu
document.addEventListener("contextmenu", (e) => e.preventDefault());

export function App() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/game/:roomId" element={<GamePage />} />
      <Route path="/*" element={<>404</>} />
    </Routes>
  );
}
