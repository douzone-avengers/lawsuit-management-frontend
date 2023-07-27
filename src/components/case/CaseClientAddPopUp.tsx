import CloseButton from "../common/CloseButton.tsx";
import PopUp from "../common/PopUp.tsx";
import { useSetRecoilState } from "recoil";
import caseClientAddPopUpOpenState from "../../states/case/CaseClientAddPopUpOpenState.tsx";
import { AppBar, Button, TextField } from "@mui/material";

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
      <AppBar
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 1,
          paddingBottom: 1,
        }}
        position="static"
      >
        당사자 추가
      </AppBar>
      <TextField size="small" />
      <Button size="large" variant="contained">
        추가
      </Button>
    </PopUp>
  );
}

export default CaseClientAddPopUp;
