import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { uiState } from "../state/uiState";

export default function CardListToggleButton() {
  const [ui, setUi] = useRecoilState(uiState);
  return (
    <div
      style={{
        position: "absolute",
        top: 8,
        left: ui.cardList ? 0 : -64,
        width: 32,
        transition: "left 0.5s ease",
      }}
      onClick={() => {
        setUi({
          ...ui,
          cardList: !ui.cardList,
        });
      }}
    >
      {ui.cardList ? <FaAngleLeft size={32} /> : <FaAngleRight size={32} />}
    </div>
  );
}
