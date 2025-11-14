import GameTable from "@/features/game/game-table";
import PlayerHand from "@/features/game/player-hand";
import Zone from "@/components/ui/zone";
import PlayingField from "@/features/game/playing-field";

// import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";

function GamePage() {
  // const handleDragEnd = (event: DragEndEvent) => {
  //   const { active, over } = event;
  //   if (!over) return; // если не над дроп-зоной
  //   const draggedCard = handCards.find((card) => card.id === active.id);
  //   if (over.id === "playing-field-drop-zone" && draggedCard) {
  //     // Переносим карту из руки на стол
  //     setHandCards((prev) => prev.filter((card) => card.id !== active.id));
  //     setTableCards((prev) => [...prev, draggedCard]);
  //   }
  // };

  return (
    // <DndContext onDragEnd={handleDragEnd}>
    <GameTable>
      <Zone color="red" gridArea="enemy-hand"></Zone>
      <Zone color="green" gridArea="deck"></Zone>
      <PlayingField />
      <Zone color="pink" gridArea="controls"></Zone>
      <PlayerHand />
    </GameTable>
    // </DndContext>
  );
}

export default GamePage;
