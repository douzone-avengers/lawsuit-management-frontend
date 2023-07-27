import { Button } from "@mui/material";
import { useSetRecoilState } from "recoil";
import caseClientAddPopUpOpenState from "../../states/case/CaseClientAddPopUpOpenState.tsx";

function CaseClientAddPopUpOpenButton() {
  const setCaseClientAddPopUpOpen = useSetRecoilState(
    caseClientAddPopUpOpenState,
  );
  const handleClick = () => {
    setCaseClientAddPopUpOpen(true);
  };
  return (
    <Button size="large" variant="contained" onClick={handleClick}>
      추가
    </Button>
  );
}

export default CaseClientAddPopUpOpenButton;
