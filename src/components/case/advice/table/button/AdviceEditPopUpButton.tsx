import Button from "@mui/material/Button";
import { useSetRecoilState } from "recoil";
import AdviceEditPopUpOpenState from "../../../../../states/advice/adviceEditPopUpOpenState.tsx";

function AdviceEditPopUpButton() {
  const setAdviceEditPopUp = useSetRecoilState(AdviceEditPopUpOpenState);

  const handleClick = () => {
    setAdviceEditPopUp(true);
  };
  return (
    <Button size="large" variant="contained" onClick={handleClick}>
      수정
    </Button>
  );
}

export default AdviceEditPopUpButton;
