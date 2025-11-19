import { __ZONE_ENABLE_DEBUG__ } from "@/lib/constants";
import clsx from "clsx";
import type { Ref } from "react";

type ColorVariant = "red" | "green" | "yellow" | "pink" | "blue";
interface ZoneProps {
  color?: ColorVariant;
  gridArea: string;
  ref?: Ref<HTMLDivElement>;
  children?: React.ReactNode;
}

export function Zone({ color = "red", gridArea, ref, children }: ZoneProps) {
  return (
    <div
      ref={ref ? ref : null}
      style={{ gridArea }}
      className={clsx(
        "flex h-full grow items-center justify-center",
        __ZONE_ENABLE_DEBUG__ && `bg-${color}-600/12`,
      )}
    >
      {children}
    </div>
  );
}
