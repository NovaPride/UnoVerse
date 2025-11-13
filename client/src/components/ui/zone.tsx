import clsx from "clsx";
import type { Ref } from "react";

const isDebug = true;

type ColorVariant = "red" | "green" | "yellow" | "pink" | "blue";
interface ZoneProps {
  color?: ColorVariant;
  gridArea: string;
  ref?: Ref<HTMLDivElement>;
  children?: React.ReactNode;
}

function Zone({ color = "red", gridArea, ref, children }: ZoneProps) {
  return (
    <div
      ref={ref ? ref : null}
      style={{ gridArea }}
      className={clsx(
        "flex items-center justify-center",
        isDebug && `bg-${color}-600/10`,
      )}
    >
      {children}
    </div>
  );
}

export default Zone;
