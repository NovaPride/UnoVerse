import GameTable from "@/components/game/game-table";
import PlayerHand from "@/components/game/player-hand";
import Zone from "@/components/ui/zone";

function GamePage() {
  return (
    <GameTable>
      <Zone color="red" gridArea="enemy-hand"></Zone>
      <Zone color="green" gridArea="deck"></Zone>
      <Zone color="yellow" gridArea="playing-field"></Zone>
      <Zone color="pink" gridArea="controls"></Zone>
      <PlayerHand></PlayerHand>
    </GameTable>
  );
}

export default GamePage;
