import unoVerseLogo from "@/assets/imgs/logo.png";
import { Background, Button, Input } from "@/components/ui";
import { useAppSelector } from "@/hooks/redux";
import { clientSocket } from "@/lib/client-socket";
import { getPlayer } from "@/redux/selectors/game-selector";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export function MainPage() {
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  const player = useAppSelector(getPlayer);
  const handleGenerateRoom = () => {
    navigate(`/game/${uuidv4()}`);
  };

  const changeLocalStorageName = () => {
    try {
      if (name.length < 3) {
        toast.warning(`Name should be at least 3 symbols long`);
        return;
      }
      localStorage.setItem("player-name", name);
      // const playerName = localStorage.getItem("player-name");

      const changedPlayer = structuredClone(player);
      changedPlayer.name = name;
      
      clientSocket.playerDataChange(changedPlayer);

      toast.success(`Name changed to ${name}`);
    } catch (err: unknown) {
      if (err instanceof Error)
        toast.error(`Something went wrong: ${err.message}`);
      return;
    }
  };

  return (
    <Background>
      <div className="flex justify-center items-center h-full ">
        <div className="flex justify-center items-center p-6 min-w-80 min-h-120  gap-1 flex-col rounded-2xl bg-gray-900/50">
          <img src={unoVerseLogo} alt="сосал?" className="max-w-80 mb-16" />
          <div className="flex flex-col gap-8">
            <div className=" flex gap-2">
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Type your name here"
              />
              <Button
                variant={"outline"}
                size={"default"}
                onClick={changeLocalStorageName}
              >
                Apply
              </Button>
            </div>
            <Button
              variant={"outline"}
              size={"default"}
              onClick={handleGenerateRoom}
            >
              Connect
            </Button>
          </div>
        </div>
      </div>
    </Background>
  );
}
