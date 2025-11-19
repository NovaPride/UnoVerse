import { useDraggable } from "@dnd-kit/core";
import { type Card } from "@shared/types/game";
import { motion, useDragControls } from "motion/react";
import type { RefObject } from "react";
import { SimpleCard } from "./simple-card";

type PlayerHandCardProps = Card & {
  size?: "normal" | "big";
  zIndex: number;
  onCardMouseDown: (id: string) => void;
  container: RefObject<null>;
};

export function PlayerHandCard({
  color = "black",
  type = "digit",
  content,
  size = "normal",
  id,
  zIndex,
  onCardMouseDown,
  container,
}: PlayerHandCardProps) {
  const controls = useDragControls();
  const scale = { normal: 0.69, big: 1 }[size];

  // transform, isDragging
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
    data: {
      sourceContainer: "player-hand",
    },
  });

  const handleMouseDown = ({ button }: React.MouseEvent) => {
    if (button === 2) onCardMouseDown(id);
  };

  const dragProps = {
    drag: true,
    dragControls: controls,
    dragConstraints: container,
    dragElastic: 1,
    dragSnapToOrigin: true, //TODO: пофиксить
    dragTransition: {
      bounceStiffness: 250,
      velocity: 0,
      bounceDamping: 25,
    },
  };

  const simpleCardProps = {
    color,
    type,
    content,
    scale,
  };

  return (
    <motion.div
      onMouseDown={handleMouseDown}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1 }}
      onHoverStart={() => null}
      style={{
        zIndex: `${zIndex}`,
      }}
      ref={setNodeRef}
      {...dragProps}
      {...listeners}
      {...attributes}
    >
      <SimpleCard {...simpleCardProps} />
    </motion.div>
  );
}
