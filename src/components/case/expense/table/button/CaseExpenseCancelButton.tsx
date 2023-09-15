import caseExpensesState from "../../../../../states/case/info/expense/CaseExpensesState.tsx";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useRecoilValue, useSetRecoilState } from "recoil";
import caseExpensePreviousState from "../../../../../states/case/info/expense/CaseExpensePreviousState.tsx";

function CaseExpenseCancelButton() {
  const setExpenses = useSetRecoilState(caseExpensesState);
  const previousData = useRecoilValue(caseExpensePreviousState);

  const handleExpenseCancelButtonClick = () => {
    setExpenses(previousData);
  };

  return (
    <Button
      sx={{ width: "100%", marginLeft: 1 }}
      size="small"
      variant="outlined"
      color="error"
      fullWidth
      onClick={handleExpenseCancelButtonClick}
    >
      <CloseIcon />
    </Button>
  );
}

export default CaseExpenseCancelButton;
