import Button from "@mui/material/Button";
import { useSetRecoilState } from "recoil";
import adviceRemovePopUpOpenState from "../../../states/advice/AdviceRemovePopUpOpenState.tsx";

function AdviceRemovePopUpButton() {
  const setAdviceRemovePopUp = useSetRecoilState(adviceRemovePopUpOpenState);

  const handleClick = () => {
    setAdviceRemovePopUp(true);
  };
  return (
    <Button size="large" variant="contained" onClick={handleClick}>
      수정
    </Button>
  );
}

export default AdviceRemovePopUpButton;
