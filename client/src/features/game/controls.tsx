import Zone from "@/components/ui/zone";
import { clientDrawCard } from "@/redux/slices/game-slice";

import { useDispatch } from "react-redux";

const buttonClass =
  "bg-amber-50 pt-1 pr-4 pb-1 pl-4 transition hover:bg-amber-600";

export default function Controls() {
  const dispatch = useDispatch();

  const handleClick1 = () => {
    dispatch(clientDrawCard());
  };

  return (
    <Zone color="pink" gridArea="controls">
      <div className="flex h-full grow flex-col items-center">
        <button onClick={handleClick1} className={buttonClass}>
          dispatch card
        </button>
        <button className={buttonClass}>123</button>
        <button className={buttonClass}>123123</button>
        <button className={buttonClass}>312312</button>
        <button className={buttonClass}>3123</button>
      </div>
    </Zone>
  );
}
