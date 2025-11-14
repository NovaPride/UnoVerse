import { Zone } from "@/components/ui/zone";
import { clientDrawCard } from "@/redux/slices/game-slice";

import { useDispatch } from "react-redux";

const buttonClass =
  "bg-amber-50 pt-1 pr-4 pb-1 pl-4 transition hover:bg-amber-600";

export function ActionPanel() {
  const dispatch = useDispatch();

  const handleClick1 = () => {
    dispatch(clientDrawCard());
  };

  return (
    <Zone color="pink" gridArea="action-panel">
      <div className="flex h-full grow flex-col items-center">
        <button onClick={handleClick1} className={buttonClass}>
          draw card
        </button>
      </div>
    </Zone>
  );
}
