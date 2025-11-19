interface BackgroundProps {
  children?: React.ReactNode;
}

export function Background({ children }: BackgroundProps) {
  return (
    <main className="h-screen w-screen bg-[rgb(92,64,51)] p-4">
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.69)]" />
      {children}
    </main>
  );
}
