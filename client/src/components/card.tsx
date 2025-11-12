type ColorTypes = "black" | "red" | "green" | "blue" | "yellow";

type DigitRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type SpecialContent =
  | "skip"
  | "reverse"
  | "draw-two"
  | "wild"
  | "wild-draw-four";

interface BaseCardProps {
  color: ColorTypes;
  size?: "normal" | "big";
  children?: React.ReactNode;
}

interface DigitCardProps extends BaseCardProps {
  type: "digit";
  content: DigitRange;
}

interface SpecialCardProps extends BaseCardProps {
  type: "special";
  content: SpecialContent;
}

type GameTableProps = DigitCardProps | SpecialCardProps;

export default function Card({
  color = "black",
  type = "digit",
  size = "normal",
  content,
  children,
}: GameTableProps) {
  const scale = { normal: 1, big: 1.5 }[size];
  return (
    <div
      className={`bg-uno-white border-uno-black aspect-56/88 h-88 overflow-hidden rounded-2xl border p-5`}
      style={{ transform: `scale(${scale})` }}
    >
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
              {type === "digit" ? content : "NOT_IMPLEMENTED_YET"}
            </p>
          </div>
          <div
            style={{ gridArea: "center-symbol" }}
            className={"flex items-center justify-center"}
          >
            <p className={"text-uno-white text-7xl font-semibold"}>
              {type === "digit" ? content : "NOT_IMPLEMENTED_YET"}
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
              {type === "digit" ? content : "NOT_IMPLEMENTED_YET"}
            </p>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
