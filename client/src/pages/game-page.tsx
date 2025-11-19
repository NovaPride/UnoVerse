import { Background, Zone } from "@/components/ui";
import { ActionPanel } from "@/features/game/action-panel";
import { DiscardPile } from "@/features/game/discard-pile";
import { DrawPile } from "@/features/game/draw-pile";
import { GameBoard } from "@/features/game/game-board";
import { PlayerHand } from "@/features/game/player-hand";
import { clientSocket } from "@/lib/client-socket";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export function GamePage() {
  const { roomId } = useParams();

  useEffect(() => {
    if (!roomId) throw new Error();
    clientSocket.connectRoom(roomId);
  }, [roomId]);

  const handleDragEnd = (event: DragEndEvent) => {
    const from = event.active.data.current?.sourceContainer;
    const to = event.over?.id;

    if (!to) return;
    if (from === "draw-pile" && to === "player-hand-drop-zone") {
      clientSocket.drawCard();
    }
    if (from === "player-hand" && to === "discard-pile-drop-zone") {
      const cardId = event.active.id;
      clientSocket.playCard(cardId as string);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Background>
        <GameBoard>
          <Zone color="red" gridArea="opponent-hand"></Zone>
          <DrawPile />
          <DiscardPile />
          <ActionPanel />
          <PlayerHand />
        </GameBoard>
      </Background>
    </DndContext>
  );
}
