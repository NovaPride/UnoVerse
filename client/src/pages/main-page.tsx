import { Background } from "@/components/ui/background";
import { Button } from "@/components/ui/button";

export function MainPage() {
  return (
    <Background>
      <div className="flex justify-center items-center h-full ">
        <div className="flex justify-center items-center p-6 min-w-80 min-h-120  gap-1 flex-col rounded-2xl bg-gray-900/50">
          <Button variant={"outline"} size={"default"}>
            asd
          </Button>
        </div>
      </div>
    </Background>
  );
}
