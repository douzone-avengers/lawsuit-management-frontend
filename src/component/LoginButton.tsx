import { useRecoilState } from "recoil";
import { uiState } from "../state/uiState";

export default function LoginButton() {
  const [ui, setUi] = useRecoilState(uiState);
  const selected = ui.loginForm;

  return (
    <div
      style={{
        display: "flex",
        borderLeft: "1px solid black",
        height: "100%",
        fontWeight: 700,
        color: selected ? "white" : "black",
        background: selected ? "black" : "white",
      }}
      onClick={() => {
        setUi({
          ...ui,
          loginForm: true,
        });
      }}
    >
      <div
        style={{
          width: 96,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>로 그 인</div>
      </div>
    </div>
  );
}
