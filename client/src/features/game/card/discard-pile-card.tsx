import { type Card } from "@/types/game";
import { useDraggable } from "@dnd-kit/core";
import { motion } from "motion/react";
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

  // transform, isDragging
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  const simpleCardProps = {
    color,
    type,
    content,
    scale,
  };

  return (
    <motion.div ref={setNodeRef} {...listeners} {...attributes}>
      <SimpleCard {...simpleCardProps} />
    </motion.div>
  );
}
