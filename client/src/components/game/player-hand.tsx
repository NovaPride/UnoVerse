import { useRef, useState } from "react";
import Zone from "@/components/ui/zone";
import Card from "./card";

const __CARDS__ = [
  { type: "digit", content: 1, color: "red", id: 1 },
  { type: "digit", content: 2, color: "blue", id: 2 },
  { type: "digit", content: 3, color: "green", id: 3 },
  { type: "digit", content: 4, color: "yellow", id: 4 },
  { type: "digit", content: 5, color: "red", id: 5 },
  { type: "digit", content: 6, color: "blue", id: 6 },
  { type: "digit", content: 7, color: "green", id: 7 },
  { type: "digit", content: 8, color: "yellow", id: 8 },
  // { type: "digit", content: 1, color: "red", id: 9 },
  // { type: "digit", content: 2, color: "blue", id: 10 },
  // { type: "digit", content: 3, color: "green", id: 11 },
  // { type: "digit", content: 4, color: "yellow", id: 12 },
  // { type: "digit", content: 1, color: "red", id: 13 },
  // { type: "digit", content: 2, color: "blue", id: 14 },
  // { type: "digit", content: 3, color: "green", id: 15 },
  // { type: "digit", content: 4, color: "yellow", id: 16 },
  // { type: "digit", content: 1, color: "red", id: 17 },
  // { type: "digit", content: 2, color: "blue", id: 18 },
  // { type: "digit", content: 3, color: "green", id: 19 },
  // { type: "digit", content: 4, color: "yellow", id: 20 },
];

export default function PlayerHand() {
  const container = useRef(null);

  const [cardStack, setCardStack] = useState<number[]>([1, 2, 3, 4]); // массив id карт в порядке z-index
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
      {__CARDS__.map(({ type, content, color, id }) => (
        <Card
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
    </Zone>
  );
}
