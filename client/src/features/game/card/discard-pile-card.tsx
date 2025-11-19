import { getRandomIntInclusive } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { type Card } from "@shared/types/game";
import { motion } from "motion/react";
import { useRef } from "react";
import { SimpleCard } from "./simple-card";

type DiscardPileCardProps = Card & {
  size?: "normal" | "big";
};

export function DiscardPileCard({
  color = "black",
  type = "digit",
  content,
  size = "normal",
  id,
}: DiscardPileCardProps) {
  const scale = { normal: 0.69, big: 1 }[size];
  const rotate = useRef(`rotate(${getRandomIntInclusive(-10, 10)}deg)`);

  // transform, isDragging
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  const simpleCardProps = {
    color,
    type,
    content,
    scale,
  };

  return (
    <motion.div
      className="absolute"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: rotate.current,
      }}
    >
      <SimpleCard {...simpleCardProps} />
    </motion.div>
  );
}
