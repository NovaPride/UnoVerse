import { motion } from "motion/react";
import { useDragControls } from "motion/react";
import { useDraggable } from "@dnd-kit/core";
import { type Card, type DigitRange, type SpecialContent } from "@/types/game";
import type { RefObject } from "react";

type CardProps = Card & {
  location?: "hand" | "table";
  size?: "normal" | "big";
  zIndex: number;
  onCardMouseDown: (id: number) => void;
  container: RefObject<null>;
  children?: React.ReactNode;
};

const getDisplayContent = (
  type: "digit" | "special",
  content: DigitRange | SpecialContent,
) => {
  if (type === "digit") return content.toString();
  switch (content) {
    case "skip":
      return "⊘";
    case "reverse":
      return "↺";
    case "draw-two":
      return "+2";
    case "wild":
      return "W";
    case "wild-draw-four":
      return "+4";
    default:
      return "UNK";
  }
};

export default function Card({
  color = "black",
  type = "digit",
  size = "normal",
  location = "hand",
  content,
  id,
  zIndex,
  onCardMouseDown,
  container,
  children,
}: CardProps) {
  const controls = useDragControls();
  const scale = { normal: 0.69, big: 1 }[size];

  // transform, isDragging
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  const handleMouseDown = ({ button }: React.MouseEvent) => {
    if (button === 2) onCardMouseDown(id);
  };

  const dragProps =
    location === "hand"
      ? {
          drag: true,
          dragControls: controls,
          dragConstraints: container,
          dragElastic: 1,
          dragTransition: {
            bounceStiffness: 250,
            velocity: 0,
            bounceDamping: 25,
          },
        }
      : {};

  return (
    <motion.div
      onMouseDown={handleMouseDown}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1 }}
      onHoverStart={() => null}
      ref={setNodeRef}
      className="flex items-center justify-center"
      style={{
        width: `calc(224px * ${scale})`,
        height: `calc(352px * ${scale})`,
        zIndex: `${zIndex}`,
      }}
      {...dragProps}
      {...listeners}
      {...attributes}
    >
      <div
        className={`bg-uno-white border-uno-black aspect-56/88 h-88 shrink-0 grow-0 overflow-hidden rounded-2xl border p-5`}
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_8px_rgba(0,0,0,0.69)]" />
        <div
          className={`bg-uno-${color} relative h-full overflow-hidden rounded-4xl`}
        >
          <div
            className={`bg-uno-white absolute top-1/2 aspect-square w-full rounded-full`}
            style={{
              transform: "skew(0deg, -33deg) scale(1.1, 1.25) translateY(-40%)",
            }}
          />
          <div
            className={`bg-uno-${color} absolute top-1/2 aspect-square w-full rounded-full`}
            style={{
              transform: "skew(0deg, -35deg) scale(1, 1.16) translateY(-43%)",
            }}
          />
          <div
            className="absolute grid h-full w-full overflow-hidden rounded-2xl"
            style={{
              gridTemplate: `
              "top-corner-symbol top-corner-symbol . . ." 1fr
              ". center-symbol center-symbol center-symbol ." 2fr
              ". . . bottom-corner-symbol bottom-corner-symbol" 1fr
              / 1fr 1fr 2fr 1fr 1fr
            `,
            }}
          >
            <div
              style={{
                gridArea: "top-corner-symbol",
              }}
              className={"flex items-center justify-center"}
            >
              <p className={"text-uno-white text-5xl font-semibold"}>
                {getDisplayContent(type, content)}
              </p>
            </div>
            <div
              style={{ gridArea: "center-symbol" }}
              className={"flex items-center justify-center"}
            >
              <p className={"text-uno-white text-7xl font-semibold"}>
                {getDisplayContent(type, content)}
              </p>
            </div>
            <div
              style={{
                gridArea: "bottom-corner-symbol",
                transform: "rotate(180deg)",
              }}
              className={"flex items-center justify-center"}
            >
              <p className={"text-uno-white text-5xl font-semibold"}>
                {getDisplayContent(type, content)}
              </p>
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </motion.div>
  );
}
