import { useEffect } from "react";
import { useAppDispatch } from "./redux";
import { socketService } from "../lib/socket";

import { serverDrawCard } from "@/redux/slices/game-slice";

export const useSocket = (serverUrl: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = socketService.connect(serverUrl);

    socket.on("server-draw-card", (card) => {
      dispatch(serverDrawCard(card));
    });

    return () => {
      socketService.disconnect();
    };
  }, [serverUrl, dispatch]);
};
