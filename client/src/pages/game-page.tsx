import GameTable from "@/components/game/game-table";
import PlayerHand from "@/components/game/player-hand";
import Zone from "@/components/ui/zone";
import { useState } from "react";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import PlayingField from "@/components/game/playing-field";

const __CARDS__ = [
  { type: "digit", content: 1, color: "red", id: 1 },
  { type: "digit", content: 2, color: "blue", id: 2 },
  { type: "digit", content: 3, color: "green", id: 3 },
  { type: "digit", content: 4, color: "yellow", id: 4 },
  { type: "digit", content: 5, color: "red", id: 5 },
  { type: "digit", content: 6, color: "blue", id: 6 },
  { type: "digit", content: 7, color: "green", id: 7 },
  { type: "digit", content: 8, color: "yellow", id: 8 },
  // { type: "digit", content: 1, color: "red", id: 9 },
  // { type: "digit", content: 2, color: "blue", id: 10 },
  // { type: "digit", content: 3, color: "green", id: 11 },
  // { type: "digit", content: 4, color: "yellow", id: 12 },
  // { type: "digit", content: 1, color: "red", id: 13 },
  // { type: "digit", content: 2, color: "blue", id: 14 },
  // { type: "digit", content: 3, color: "green", id: 15 },
  // { type: "digit", content: 4, color: "yellow", id: 16 },
  // { type: "digit", content: 1, color: "red", id: 17 },
  // { type: "digit", content: 2, color: "blue", id: 18 },
  // { type: "digit", content: 3, color: "green", id: 19 },
  // { type: "digit", content: 4, color: "yellow", id: 20 },
];

function GamePage() {
  const [handCards, setHandCards] = useState(() => __CARDS__); // карты в руке
  const [tableCards, setTableCards] = useState([]); // карты на столе

  // ►►► ДОБАВИЛ: Обработчик конца перетаскивания
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return; // если не над дроп-зоной

    const draggedCard = handCards.find((card) => card.id === active.id);

    if (over.id === "table-drop-zone" && draggedCard) {
      // Переносим карту из руки на стол
      setHandCards((prev) => prev.filter((card) => card.id !== active.id));
      setTableCards((prev) => [...prev, draggedCard]);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <GameTable>
        <Zone color="red" gridArea="enemy-hand"></Zone>
        <Zone color="green" gridArea="deck"></Zone>
        {/* <Zone color="yellow" gridArea="playing-field"></Zone> */}
        <PlayingField cards={tableCards}></PlayingField>
        <Zone color="pink" gridArea="controls"></Zone>
        <PlayerHand cards={handCards} />
      </GameTable>
    </DndContext>
  );
}

export default GamePage;
