import { Zone } from "@/components/ui/zone";
import { ActionPanel } from "@/features/game/action-panel";
import { DiscardPile } from "@/features/game/discard-pile";
import { DrawPile } from "@/features/game/draw-pile";
import { GameBoard } from "@/features/game/game-board";
import { PlayerHand } from "@/features/game/player-hand";
import { useAppDispatch } from "@/hooks/redux";
import { clientDrawCard } from "@/redux/slices/game-slice";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";

// import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";

export function GamePage() {
  const dispatch = useAppDispatch();

  const handleDragEnd = (event: DragEndEvent) => {
    const from = event.active.data.current?.sourceContainer;
    const to = event.over?.id;
    // console.log(from, to);

    if (!to) return;

    if (from === "draw-pile" && to === "player-hand-drop-zone") {
      dispatch(clientDrawCard());
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <GameBoard>
        <Zone color="red" gridArea="opponent-hand"></Zone>
        <DrawPile />
        <DiscardPile />
        <ActionPanel />
        <PlayerHand />
      </GameBoard>
    </DndContext>
  );
}
