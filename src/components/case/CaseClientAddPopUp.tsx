import CloseButton from "../common/CloseButton.tsx";
import PopUp from "../common/PopUp.tsx";
import { useSetRecoilState } from "recoil";
import caseClientAddPopUpOpenState from "../../states/case/CaseClientAddPopUpOpenState.tsx";
import { Button, TextField } from "@mui/material";

function CaseClientAddPopUp() {
  const setCaseClientAddPopUpOpen = useSetRecoilState(
    caseClientAddPopUpOpenState,
  );
  const handleCloseButtonClick = () => {
    setCaseClientAddPopUpOpen(false);
  };
  return (
    <PopUp>
      <CloseButton onClick={handleCloseButtonClick} />
      <TextField size="small" />
      <Button size="large" variant="contained">
        등록
      </Button>
    </PopUp>
  );
}

export default CaseClientAddPopUp;
