import { CaseExpenseRowType } from "../../../../../states/case/info/expense/CaseExpensesState.tsx";
import { useSetRecoilState } from "recoil";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import caseExpenseRemovePopUpOpenState from "../../../../../states/case/info/expense/CaseExpenseRemovePopUpOpenState.tsx";
import caseExpenseIdState from "../../../../../states/case/info/expense/CaseExpenseIdState.tsx";

type Props = {
  item: CaseExpenseRowType & { editable: boolean };
};

function CaseExpenseDeleteButton({ item }: Props) {
  const setCaseExpenseId = useSetRecoilState(caseExpenseIdState);
  const setExpenseRemovePopUpOpen = useSetRecoilState(
    caseExpenseRemovePopUpOpenState,
  );

  const handleExpenseRemoveButtonClick = () => {
    setCaseExpenseId(item.id);
    setExpenseRemovePopUpOpen(true);
  };

  return (
    <Button
      sx={{ width: "100%", marginLeft: 1 }}
      size="small"
      variant="outlined"
      color="error"
      fullWidth
      onClick={handleExpenseRemoveButtonClick}
    >
      <DeleteIcon />
    </Button>
  );
}

export default CaseExpenseDeleteButton;
