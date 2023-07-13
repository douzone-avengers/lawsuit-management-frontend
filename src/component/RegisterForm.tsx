import { useRecoilState } from "recoil";
import { uiState } from "../state/uiState";
import Popup from "./Popup";

export default function RegisterForm() {
  const [ui, setUi] = useRecoilState(uiState);
  return (
    <Popup
      onCloseButtonClick={() => {
        setUi({
          ...ui,
          registerForm: false,
        });
      }}
      width={100}
      height={100}
    >
      TODO
    </Popup>
  );
}
