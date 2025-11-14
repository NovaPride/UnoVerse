import { Zone } from "@/components/ui/zone";

const buttonClass =
  "bg-amber-50 pt-1 pr-4 pb-1 pl-4 transition hover:bg-amber-600";

export function ActionPanel() {
  return (
    <Zone color="pink" gridArea="action-panel">
      <div className="flex h-full grow flex-col items-center">
        <button className={buttonClass}>.</button>
      </div>
    </Zone>
  );
}
