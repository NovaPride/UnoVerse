import unoVerseLogo from "@/assets/imgs/logo.png";
import { Background, Button, Input } from "@/components/ui";
import { clientSocket } from "@/lib/client-socket";
import { useState } from "react";

export function MainPage() {
  const [input, setInput] = useState<string>("");

  const handleGenerateRoom = () => {
    if (!input) {
      console.log("Nope");
      return;
    }

    clientSocket.createGame(input);
  };

  return (
    <Background>
      <div className="flex justify-center items-center h-full ">
        <div className="flex justify-center items-center p-6 min-w-80 min-h-120  gap-1 flex-col rounded-2xl bg-gray-900/50">
          <img src={unoVerseLogo} alt="сосал?" className="max-w-80 mb-16" />
          <div className="flex">
            <Input
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
              }}
              placeholder="RoomID"
              className="grow"
            />
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
