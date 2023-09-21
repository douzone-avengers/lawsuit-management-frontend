import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import caseReceptionsState from "../../../../../states/case/info/reception/CaseReceptionsState.tsx";
import caseReceptionPreviousState from "../../../../../states/case/info/reception/CaseReceptionPreviousState.tsx";

function CaseReceptionCancelButton() {
  const setReceptions = useSetRecoilState(caseReceptionsState);
  const previousData = useRecoilValue(caseReceptionPreviousState);
  const handleReceptionCancelButtonClick = () => {
    setReceptions(previousData);
  };

  return (
    <Button
      sx={{ width: "100%", marginLeft: 1 }}
      size="small"
      variant="outlined"
      color="error"
      fullWidth
      onClick={handleReceptionCancelButtonClick}
    >
      <CloseIcon />
    </Button>
  );
}

export default CaseReceptionCancelButton;
