import { clientSocket } from "@/lib/client-socket";
import { useDraggable } from "@dnd-kit/core";
import { motion, useDragControls } from "motion/react";
import type { RefObject } from "react";
import { CardBack } from "./card-back";

type DrawPileCardProps = {
  id: number;
  size?: "normal" | "big";
  container: RefObject<null>;
};

export function DrawPileCard({
  id,
  container,
  size = "normal",
}: DrawPileCardProps) {
  const controls = useDragControls();

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
    data: {
      sourceContainer: "draw-pile",
    },
  });

  const dragProps = {
    drag: true,
    dragControls: controls,
    dragConstraints: container,
    dragElastic: 1,
    dragSnapToOrigin: true,
    dragTransition: {
      bounceStiffness: 350,
      velocity: 0,
      bounceDamping: 25,
    },
  };

  const handleMouseDown = ({ button }: React.MouseEvent) => {
    if (button === 2) clientSocket.drawCard();
  };

  return (
    <motion.div
      onMouseDown={handleMouseDown}
      ref={setNodeRef}
      {...dragProps}
      {...listeners}
      {...attributes}
      className="z-10"
    >
      <CardBack size={size} />
    </motion.div>
  );
}
