import "../styles/accessory.css";

interface Props {
  invert: string;
  animate: boolean;
}

export default function Accessory({ invert, animate }: Props) {
  let bars = [
    "60px",
    "80px",
    "100px",
    "110px",
    "90px",
    "70px",
    "120px",
    "85px",
    "95px",
    "105px",
    "75px",
    "115px",
  ];
  bars = invert === "true" ? bars.reverse() : bars;

  return (
    <>
      <div
        className={
          invert === "true"
            ? `accessory invert ${animate ? "animate" : ""}`
            : `accessory ${animate ? "animate" : ""}`
        }
      >
        {bars.map((width, index) => (
          <div
            key={index}
            className={`bars ${animate ? "animate" : ""}`}
            style={{
              width: animate ? `calc(50% + ${width}` : width,
            }}
          ></div>
        ))}
      </div>
    </>
  );
}
