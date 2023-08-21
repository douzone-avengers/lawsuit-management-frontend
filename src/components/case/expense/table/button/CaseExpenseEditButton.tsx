import CaseExpenseState, {
  CaseExpenseRowType,
} from "../../../../../states/case/info/expense/CaseExpensesState.tsx";
import { useRecoilState } from "recoil";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { produce } from "immer";

type Props = {
  item: CaseExpenseRowType & { editable: boolean };
};

function CaseExpenseEditButton({ item }: Props) {
  const [expenses, setExpenses] = useRecoilState(CaseExpenseState);

  const handleClick = () => {
    const newExpenses = produce(expenses, (draft) => {
      const expenses = draft.filter((item2) => item2.id === item.id)[0];
      expenses.editable = true;
    });
    setExpenses(newExpenses);
  };

  return (
    <Button
      sx={{ marginLeft: 1, marginRight: 1 }}
      size="small"
      variant="outlined"
      onClick={handleClick}
    >
      <EditIcon />
    </Button>
  );
}

export default CaseExpenseEditButton;
