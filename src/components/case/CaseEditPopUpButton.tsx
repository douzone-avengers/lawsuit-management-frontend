import { useSetRecoilState } from "recoil";
import caseEditPopUpOpenState from "../../states/case/CaseEditPopUpOpenState.tsx";
import Button from "@mui/material/Button";

function CaseEditPopUpButton() {
  const setCaseEditPopUp = useSetRecoilState(caseEditPopUpOpenState);

  const handleCaseEditButtonClick = () => {
    setCaseEditPopUp(true);
  };

  return (
    <Button variant={"outlined"} onClick={handleCaseEditButtonClick}>
      수정
    </Button>
  );
}

export default CaseEditPopUpButton;
