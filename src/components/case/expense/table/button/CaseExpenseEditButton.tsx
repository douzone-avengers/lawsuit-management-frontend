import CaseExpenseState, {
  CaseExpenseRowType,
} from "../../../../../states/case/info/expense/CaseExpenseState.tsx";
import { useRecoilState } from "recoil";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { produce } from "immer";

type Props = {
  item: CaseExpenseRowType & { editable: boolean };
};

function CaseExpenseEditButton({ item }: Props) {
  const [expense, setExpense] = useRecoilState(CaseExpenseState);

  const handleClick = () => {
    const newExpense = produce(expense, (draft) => {
      const expense = draft.filter((item2) => item2.id === item.id)[0];
      expense.editable = true;
    });
    setExpense(newExpense);
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
