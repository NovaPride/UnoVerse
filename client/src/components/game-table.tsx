interface GameTableProps {
  children?: React.ReactNode;
}

export default function GameTable({ children }: GameTableProps) {
  return (
    <main className="h-screen w-screen bg-[rgb(92,64,51)] p-4">
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.69)]" />
      <div
        className="grid h-full gap-1 overflow-hidden rounded-2xl"
        style={{
          gridTemplate: `
          "enemy-hand enemy-hand enemy-hand" 1fr
          "deck playing-field controls" 3fr
          "player-hand player-hand player-hand" 1fr
          / 1fr 3fr 1fr
        `,
        }}
      >
        {children}
      </div>
    </main>
  );
}
