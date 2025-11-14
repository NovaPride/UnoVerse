import { Zone } from "@/components/ui/zone";
import { ActionPanel } from "@/features/game/action-panel";
import { DiscardPile } from "@/features/game/discard-pile";
import { DrawPile } from "@/features/game/draw-pile";
import { GameBoard } from "@/features/game/game-board";
import { PlayerHand } from "@/features/game/player-hand";

// import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";

export function GamePage() {
  // const handleDragEnd = (event: DragEndEvent) => {
  //   const { active, over } = event;
  //   if (!over) return; // если не над дроп-зоной
  //   const draggedCard = handCards.find((card) => card.id === active.id);
  //   if (over.id === "discard-pile-drop-zone" && draggedCard) {
  //     // Переносим карту из руки на стол
  //     setHandCards((prev) => prev.filter((card) => card.id !== active.id));
  //     setTableCards((prev) => [...prev, draggedCard]);
  //   }
  // };

  return (
    // <DndContext onDragEnd={handleDragEnd}>
    <GameBoard>
      <Zone color="red" gridArea="opponent-hand"></Zone>
      <DrawPile />
      <DiscardPile />
      <ActionPanel />
      <PlayerHand />
    </GameBoard>
    // </DndContext>
  );
}
