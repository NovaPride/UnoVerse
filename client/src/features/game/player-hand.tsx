import { Zone } from "@/components/ui";
import { useRef, useState } from "react";

// import { getPlayerHandCards } from "@/redux/selectors/game-selector";
import { useDroppable } from "@dnd-kit/core";

export function PlayerHand() {
  // const cards = useAppSelector(getPlayerHandCards);

  const container = useRef(null);

  const { setNodeRef, isOver } = useDroppable({
    id: "player-hand-drop-zone",
  });

  const [cardStack, setCardStack] = useState<number[]>([1, 2, 3, 4]);
  const bringToFront = (cardId: number) => {
    setCardStack((prev) => {
      const filtered = prev.filter((id) => id !== cardId);

      return [...filtered, cardId];
    });
  };

  const getZIndex = (cardId: number) => {
    const index = cardStack.indexOf(cardId);
    return index === -1 ? 0 : index + 1;
  };

  return (
    <Zone color="blue" gridArea="player-hand" ref={container}>
      <div
        ref={setNodeRef}
        className={`table-zone items-centers flex h-full grow ${isOver ? "bg-green-200/20" : "bg-gray-200/20"}`}
        style={{
          border: "2px dashed #ccc",
          borderRadius: "8px",
        }}
      >
        {/* {cards.map(({ type, content, color, id }) => (
          <PlayerHandCard
            type={type}
            content={content}
            color={color}
            id={id}
            key={id}
            zIndex={getZIndex(id)}
            onCardMouseDown={bringToFront}
            container={container}
          />
        ))} */}
      </div>
    </Zone>
  );
}
