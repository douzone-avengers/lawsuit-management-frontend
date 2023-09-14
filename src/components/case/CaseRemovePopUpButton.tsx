import Button from "@mui/material/Button";
import { useSetRecoilState } from "recoil";
import caseRemovePopUpOpenState from "../../states/case/CaseRemovePopUpOpenState.tsx";

function CaseRemovePopUpButton() {
  const setCaseRemovePopUp = useSetRecoilState(caseRemovePopUpOpenState);

  const handleCaseRemoveButtonClick = () => {
    setCaseRemovePopUp(true);
  };

  return (
    <Button
      variant={"outlined"}
      color="error"
      onClick={handleCaseRemoveButtonClick}
    >
      삭제
    </Button>
  );
}

export default CaseRemovePopUpButton;
