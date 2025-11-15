import { Zone } from "@/components/ui/zone";
import { CardBack, DrawPileCard } from "@/features/game/card";
import { useDroppable } from "@dnd-kit/core";
import { useRef } from "react";

export function DrawPile() {
  const container = useRef(null);

  const { setNodeRef, isOver } = useDroppable({
    id: "draw-pile-drop-zone",
  });

  return (
    <Zone color="green" gridArea="draw-pile" ref={container}>
      <div
        ref={setNodeRef}
        className={`border-dashed relative border-2 rounded-lg border-amber-50 hover:border-green-300 transition table-zone flex min-h-60 min-w-38 items-center justify-center ${isOver ? "bg-green-200/20" : "bg-gray-200/20"}`}
      >
        <div className="absolute">
          <CardBack />
        </div>
        <DrawPileCard id={1} container={container} />
      </div>
    </Zone>
  );
}
