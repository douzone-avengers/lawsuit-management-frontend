import caseExpensesState, {
  CaseExpenseRowType,
} from "../../../../../states/case/info/expense/CaseExpensesState.tsx";
import { useRecoilValue, useSetRecoilState } from "recoil";
import caseExpenseSizeState from "../../../../../states/case/info/expense/CaseExpenseSizeState.tsx";
import { caseExpenseSearchUrlState } from "../../../../../states/case/info/expense/CaseExpenseSearchState.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import request, { RequestSuccessHandler } from "../../../../../lib/request.ts";

type Props = {
  item: CaseExpenseRowType & { editable: boolean };
};

function CaseExpenseDeleteButton({ item }: Props) {
  const setExpense = useSetRecoilState(caseExpensesState);
  const setSize = useSetRecoilState(caseExpenseSizeState);
  const url = useRecoilValue(caseExpenseSearchUrlState);

  const handleClick = () => {
    const handleRequestSuccess: RequestSuccessHandler = () => {
      const handleRequestSuccess2: RequestSuccessHandler = (res) => {
        const {
          expense,
          size,
        }: { expense: CaseExpenseRowType[]; size: number } = res.data["data"];
        setExpense(
          expense.map((item) => {
            return { ...item, editable: false };
          }),
        );
        setSize(size);
      };
      request("GET", url, {
        onSuccess: handleRequestSuccess2,
      });
    };
    request("PUT", `/expense/delete/${item.id}`, {
      onSuccess: handleRequestSuccess,
    });
  };

  return (
    <Button
      sx={{ marginLeft: 1, marginRight: 1 }}
      size="small"
      variant="outlined"
      onClick={handleClick}
    >
      <DeleteIcon />
    </Button>
  );
}

export default CaseExpenseDeleteButton;
