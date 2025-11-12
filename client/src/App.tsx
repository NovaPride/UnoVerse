import { useEffect, useState } from "react";

import clsx from "clsx";
import GameTable from "@/components/game-table";
import Card from "@/components/card";

function App() {
  // const [test, setTest] = useState<number[]>();

  // useEffect(() => {
  //   fetch("http://localhost:8080/api")
  //     .then((data) => data.json())
  //     .then((data) => {
  //       setTest(data.test);
  //     });
  // }, []);

  return (
    <GameTable>
      <Zone color="red" gridArea="enemy-hand"></Zone>
      <Zone color="green" gridArea="deck"></Zone>
      <Zone color="yellow" gridArea="playing-field"></Zone>
      <Zone color="pink" gridArea="controls"></Zone>
      <Zone color="blue" gridArea="player-hand">
        <Card type="digit" content={1} color="red" />
        <Card type="digit" content={2} color="blue" />
        <Card type="digit" content={3} color="green" />
        <Card type="digit" content={4} color="yellow" />
      </Zone>
    </GameTable>
  );
}

export default App;

const isDebug = true;

type ColorVariant = "red" | "green" | "yellow" | "pink" | "blue";
interface ZoneProps {
  color?: ColorVariant;
  gridArea: string;
  children?: React.ReactNode;
}

function Zone({ color = "red", gridArea, children }: ZoneProps) {
  return (
    <div
      style={{ gridArea }}
      className={clsx(
        "flex items-center justify-center",
        isDebug && `bg-${color}-600/10`,
      )}
    >
      {children}
    </div>
  );
}
