import CaseExpenseState, {
  CaseExpenseRowType,
} from "../../../../../states/case/info/expense/CaseExpensesState.tsx";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { produce } from "immer";
import caseExpensePreviousState from "../../../../../states/case/info/expense/CaseExpensePreviousState.tsx";

type Props = {
  item: CaseExpenseRowType & { editable: boolean };
};

function CaseExpenseEditButton({ item }: Props) {
  const [expenses, setExpenses] = useRecoilState(CaseExpenseState);
  const setPreviousData = useSetRecoilState(caseExpensePreviousState);

  const handleClick = () => {
    setPreviousData(expenses);

    const newExpenses = produce(expenses, (draft) => {
      const expenses = draft.filter((item2) => item2.id === item.id)[0];
      expenses.editable = true;
    });
    setExpenses(newExpenses);
  };

  return (
    <Button
      sx={{ width: "100%", marginRight: 1 }}
      size="small"
      variant="outlined"
      fullWidth
      onClick={handleClick}
    >
      <EditIcon />
    </Button>
  );
}

export default CaseExpenseEditButton;
