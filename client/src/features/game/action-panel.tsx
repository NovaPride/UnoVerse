import { Zone } from "@/components/ui";
import { useNavigate } from "react-router-dom";

const buttonClass =
  "bg-amber-50 pt-1 pr-4 pb-1 pl-4 transition hover:bg-amber-600";

export function ActionPanel() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("./test")
  }
  
  return (
    <Zone color="pink" gridArea="action-panel">
      <div className="flex h-full grow flex-col items-center">
        <button className={buttonClass} onClick={handleClick}>go to /test</button>
      </div>
    </Zone>
  );
}
