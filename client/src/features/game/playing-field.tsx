import { useRef, useState } from "react";
import Zone from "@/components/ui/zone";
import Card from "./card";
import { useDroppable } from "@dnd-kit/core";
import { getPlayingFieldCards } from "@/redux/selectors/playing-field-selector";
import { useAppSelector } from "@/hooks/redux";

export default function PlayingField() {
  const cards = useAppSelector(getPlayingFieldCards);

  const container = useRef(null);

  const { setNodeRef, isOver } = useDroppable({
    id: "playing-field-drop-zone",
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
    <Zone color="yellow" gridArea="playing-field" ref={container}>
      <div
        ref={setNodeRef}
        className={`table-zone flex min-h-40 grow items-center justify-center ${isOver ? "bg-green-200/20" : "bg-gray-200/20"}`}
        style={{
          border: "2px dashed #ccc",
          borderRadius: "8px",
        }}
      >
        {cards.map(({ type, content, color, id }) => (
          <Card
            location="table"
            type={type}
            content={content}
            color={color}
            id={id}
            key={id}
            zIndex={getZIndex(id)}
            onCardMouseDown={bringToFront}
            container={container}
          />
        ))}
      </div>
    </Zone>
  );
}
