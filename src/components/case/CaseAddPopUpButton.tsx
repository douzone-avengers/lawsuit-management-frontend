import { useSetRecoilState } from "recoil";
import caseAddPopUpOpenState from "../../states/case/CaseAddPopUpOpenState.tsx";
import Button from "@mui/material/Button";

function CaseAddPopUpButton() {
  const setCaseAddPopUp = useSetRecoilState(caseAddPopUpOpenState);

  const handleCaseAddButtonClick = () => {
    setCaseAddPopUp(true);
  };

  return (
    <Button
      variant="contained"
      sx={{ position: "fixed", bottom: 24, right: 24 }}
      onClick={handleCaseAddButtonClick}
    >
      사건 추가
    </Button>
  );
}

export default CaseAddPopUpButton;
