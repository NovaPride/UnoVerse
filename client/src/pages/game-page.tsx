import { Background, Zone } from "@/components/ui";
import { ActionPanel } from "@/features/game/action-panel";
import { DiscardPile } from "@/features/game/discard-pile";
import { DrawPile } from "@/features/game/draw-pile";
import { GameBoard } from "@/features/game/game-board";
import { PlayerHand } from "@/features/game/player-hand";
import { clientSocket } from "@/lib/client-socket";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";

export function GamePage() {
  const handleDragEnd = (event: DragEndEvent) => {
    const from = event.active.data.current?.sourceContainer;
    const to = event.over?.id;

    if (!to) return;

    if (from === "draw-pile" && to === "player-hand-drop-zone") {
      clientSocket.drawCard();
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
