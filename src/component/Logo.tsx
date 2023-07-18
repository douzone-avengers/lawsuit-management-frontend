import logo from "/img/logo.png";

type Props = {
  width: number;
  height: number;
};

export default function Logo({ width, height }: Props) {
  return (
    <div
      style={{
        width,
        height,
        background: `url(${logo})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    ></div>
  );
}
