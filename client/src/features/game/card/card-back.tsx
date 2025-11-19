type CardBackProps = {
  size?: "normal" | "big";
};

export function CardBack({ size = "normal" }: CardBackProps) {
  const scale = { normal: 0.69, big: 1 }[size];

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
          className={`bg-uno-black relative h-full overflow-hidden rounded-4xl`}
        >
          <div
            className={`bg-uno-red absolute top-1/2 aspect-square w-full rounded-full`}
            style={{
              transform: "skew(0deg, -33deg) scale(1.1, 1.25) translateY(-40%)",
            }}
          />
          <div
            className={`bg-uno-red absolute top-1/2 aspect-square w-full rounded-full`}
            style={{
              transform: "skew(0deg, -35deg) scale(1, 1.16) translateY(-43%)",
            }}
          />
          <div className="absolute flex items-center justify-center h-full w-full overflow-hidden rounded-2xl">
            <div className={"flex items-center justify-center"}>
              <p
                className={"text-uno-black text-6xl font-bold absolute"}
                style={{
                  transform:
                    "skew(35deg, -35deg) rotate(15deg) scale(1, 1.16) translate(-7px, 6px)",
                }}
              >
                UNO
              </p>
              <p
                className={"text-uno-yellow text-6xl font-bold"}
                style={{
                  transform:
                    "skew(35deg, -35deg) rotate(15deg) scale(1, 1.16) ",
                }}
              >
                UNO
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
