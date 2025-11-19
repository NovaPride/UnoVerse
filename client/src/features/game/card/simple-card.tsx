import {
  type Card,
  type DigitRange,
  type SpecialContent,
} from "@shared/types/game";

type SimpleCardProps = Omit<Card, "id"> & {
  scale: number;
};

//todo refuck
const getDisplayContent = (
  type: "digit" | "special",
  content: DigitRange | SpecialContent,
) => {
  if (type === "digit") return content.toString();
  switch (content) {
    case "skip":
      return "⊘";
    case "reverse":
      return "↺";
    case "draw-two":
      return "+2";
    case "wild":
      return "W";
    case "wild-draw-four":
      return "+4";
    default:
      return "UNK";
  }
};

export function SimpleCard({
  color = "black",
  type = "digit",
  content,
  scale = 1,
}: SimpleCardProps) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: `calc(224px * ${scale})`,
        height: `calc(352px * ${scale})`,
      }}
    >
      <div
        className={`bg-uno-white border-uno-black aspect-56/88 h-88 shrink-0 grow-0 overflow-hidden rounded-2xl border p-5`}
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_8px_rgba(0,0,0,0.69)]" />
        <div
          className={`bg-uno-${color} relative h-full overflow-hidden rounded-4xl`}
        >
          <div
            className={`bg-uno-white absolute top-1/2 aspect-square w-full rounded-full`}
            style={{
              transform: "skew(0deg, -33deg) scale(1.1, 1.25) translateY(-40%)",
            }}
          />
          <div
            className={`bg-uno-${color} absolute top-1/2 aspect-square w-full rounded-full`}
            style={{
              transform: "skew(0deg, -35deg) scale(1, 1.16) translateY(-43%)",
            }}
          />
          <div
            className="absolute grid h-full w-full overflow-hidden rounded-2xl"
            style={{
              gridTemplate: `
              "top-corner-symbol top-corner-symbol . . ." 1fr
              ". center-symbol center-symbol center-symbol ." 2fr
              ". . . bottom-corner-symbol bottom-corner-symbol" 1fr
              / 1fr 1fr 2fr 1fr 1fr
            `,
            }}
          >
            <div
              style={{
                gridArea: "top-corner-symbol",
              }}
              className={"flex items-center justify-center"}
            >
              <p className={"text-uno-white text-5xl font-semibold"}>
                {getDisplayContent(type, content)}
              </p>
            </div>
            <div
              style={{ gridArea: "center-symbol" }}
              className={"flex items-center justify-center"}
            >
              <p className={"text-uno-white text-7xl font-semibold"}>
                {getDisplayContent(type, content)}
              </p>
            </div>
            <div
              style={{
                gridArea: "bottom-corner-symbol",
                transform: "rotate(180deg)",
              }}
              className={"flex items-center justify-center"}
            >
              <p className={"text-uno-white text-5xl font-semibold"}>
                {getDisplayContent(type, content)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
