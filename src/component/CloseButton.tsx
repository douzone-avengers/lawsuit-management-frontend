import { FaX } from "react-icons/fa6";

type Props = {
  size?: number;
  top?: number | string;
  right?: number | string;
  onClick?: () => void;
};

export default function CloseButton({
  size = 0,
  top = 0,
  right = 0,
  onClick,
}: Props) {
  return (
    <div style={{ position: "absolute", top, right }} onClick={onClick}>
      <FaX size={size} />
    </div>
  );
}
