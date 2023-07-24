import Button from "@mui/material/Button";
import { useSetRecoilState } from "recoil";
import adviceRegisterPopUpOpenState from "./AdviceRegisterPopUpOpenState.tsx";

// function ClientRegisterPopUpButton() {
//   const setClientRegisterPopUp = useSetRecoilState(clientRegisterPopUpState);
//   const handleClick = () => {
//     setClientRegisterPopUp(true);
//     };

function AdviceRegisterPopUpButton() {
  const setAdviceRegisterPopUp = useSetRecoilState(
    adviceRegisterPopUpOpenState,
  );
  const handleClick = () => {
    setAdviceRegisterPopUp(true);
  };

  return (
    <Button size="large" variant="contained" onClick={handleClick}>
      상담 등록
    </Button>
  );
}

export default AdviceRegisterPopUpButton;
