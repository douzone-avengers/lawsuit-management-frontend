import Button from "@mui/material/Button";
import { useSetRecoilState } from "recoil";
import adviceRegisterPopUpOpenState from "../../states/advice/AdviceRegisterPopUpOpenState";

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
