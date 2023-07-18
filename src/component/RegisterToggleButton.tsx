import { FaPlus } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { uiState } from "../state/uiState";

type Props = {
  onClick: () => void;
};

export default function RegisterToggleButton({ onClick }: Props) {
  const [ui] = useRecoilState(uiState);
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        left: ui.cardList ? 0 : -64,
        bottom: 0,
        margin: 10,
        marginLeft: ui.cardList ? 10 : 0,
        alignItems: "center",
        justifyContent: "center",
        transition: "left 0.5s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: ui.registerForm ? "black" : "white",
          width: 32,
          height: 32,
          margin: "auto",
          borderRadius: "50%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={onClick}
        >
          <FaPlus size={24} color={ui.registerForm ? "white" : "black"} />
        </div>
      </div>
    </div>
  );
}
