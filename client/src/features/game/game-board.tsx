interface GameBoardProps {
  children?: React.ReactNode;
}

export function GameBoard({ children }: GameBoardProps) {
  return (
    <div
      className="grid h-full gap-1 overflow-hidden rounded-2xl"
      style={{
        gridTemplate: `
          "opponent-hand opponent-hand opponent-hand" 1fr
          "draw-pile discard-pile action-panel" 3fr
          "player-hand player-hand player-hand" 1fr
          / 1fr 3fr 1fr
        `,
      }}
    >
      {children}
    </div>
  );
}
