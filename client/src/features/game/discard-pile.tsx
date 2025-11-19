import { Zone } from "@/components/ui";
import { useAppSelector } from "@/hooks/redux";
import { selectDiscardPilerCards } from "@/redux/selectors/game-selector";
import { useDroppable } from "@dnd-kit/core";
import { useRef } from "react";
import { DiscardPileCard } from "./card";

export function DiscardPile() {
  const cards = useAppSelector(selectDiscardPilerCards);

  const container = useRef(null);

  const { setNodeRef, isOver } = useDroppable({
    id: "discard-pile-drop-zone",
  });

  return (
    <Zone color="yellow" gridArea="discard-pile" ref={container}>
      <div
        ref={setNodeRef}
        className={`relative flex justify-center items-center table-zone h-60 w-38 ${isOver ? "bg-green-200/20" : "bg-gray-200/20"}`}
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
