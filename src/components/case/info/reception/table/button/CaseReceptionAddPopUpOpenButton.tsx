import { Button } from "@mui/material";
import { useSetRecoilState } from "recoil";
import caseReceptionAddPopUpOpenState from "../../../../../../states/case/info/reception/CaseReceptionAddPopUpOpenState.tsx";

function CaseReceptionAddPopUpOpenButton() {
  const setReceptionAddPopUpOpen = useSetRecoilState(
    caseReceptionAddPopUpOpenState,
  );

  const handleClick = () => {
    setReceptionAddPopUpOpen(true);
  };

  return (
    <Button size="large" variant="contained" fullWidth onClick={handleClick}>
      등록
    </Button>
  );
}

export default CaseReceptionAddPopUpOpenButton;
