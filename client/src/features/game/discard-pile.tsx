import { Zone } from "@/components/ui/zone";
import { DiscardPileCard } from "@/features/game/card";
import { useAppSelector } from "@/hooks/redux";
import { getDiscardPileCards } from "@/redux/selectors/game-selector";
import { useDroppable } from "@dnd-kit/core";
import { useRef } from "react";

export function DiscardPile() {
  const cards = useAppSelector(getDiscardPileCards);

  const container = useRef(null);

  const { setNodeRef, isOver } = useDroppable({
    id: "discard-pile-drop-zone",
  });

  return (
    <Zone color="yellow" gridArea="discard-pile" ref={container}>
      <div
        ref={setNodeRef}
        className={`table-zone flex min-h-60 min-w-38 items-center justify-center ${isOver ? "bg-green-200/20" : "bg-gray-200/20"}`}
        style={{
          border: "2px dashed #ccc",
          borderRadius: "8px",
        }}
      >
        {cards.map(({ type, content, color, id }) => (
          <DiscardPileCard
            type={type}
            content={content}
            color={color}
            id={id}
            key={id}
          />
        ))}
      </div>
    </Zone>
  );
}
