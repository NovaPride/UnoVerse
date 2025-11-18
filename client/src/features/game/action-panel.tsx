import { Zone } from "@/components/ui";
import { useAppSelector } from "@/hooks/redux";
import { getPlayer, getRoom } from "@/redux/selectors/game-selector";
import type { Player, Room } from "@shared/types/game";
import { useNavigate } from "react-router-dom";

const buttonClass =
  "bg-amber-50 pt-1 pr-4 pb-1 pl-4 transition hover:bg-amber-600";

export function ActionPanel() {
  const roomInfo: Room = useAppSelector(getRoom);
  const player: Player = useAppSelector(getPlayer);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("./test");
  };

  const currentPlayersCount = roomInfo?.players?.length;

  return (
    <Zone color="pink" gridArea="action-panel">
      <div className="flex h-full grow flex-col items-center">
        <button className={buttonClass} onClick={handleClick}>
          go to /test
        </button>

        <label htmlFor="" className="text-xl mt-4 font-semibold text-white">
          Players count: {currentPlayersCount}
        </label>
        <label htmlFor="" className="text-xl mt-4 font-semibold text-white">
          You: {player?.name}
        </label>
        <label htmlFor="" className="text-xl mt-4 font-semibold text-white">
          Others:
          <ul>
            {roomInfo.players
              .filter((elem) => elem.id !== player.id)
              .map(({ id, name }) => (
                <li key={id}>{name}</li>
              ))}
          </ul>
        </label>
        {currentPlayersCount === 2 && (
          <button className={buttonClass}>start game</button>
        )}
      </div>
    </Zone>
  );
}
