import unoVerseLogo from "@/assets/imgs/logo.png";
import { Background, Button } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export function MainPage() {
  const navigate = useNavigate();

  const handleGenerateRoom = () => {
    navigate(`/game/${uuidv4()}`);
  };

  return (
    <Background>
      <div className="flex justify-center items-center h-full ">
        <div className="flex justify-center items-center p-6 min-w-80 min-h-120  gap-1 flex-col rounded-2xl bg-gray-900/50">
          <img src={unoVerseLogo} alt="сосал?" className="max-w-80 mb-16" />
          <div className="flex">
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
