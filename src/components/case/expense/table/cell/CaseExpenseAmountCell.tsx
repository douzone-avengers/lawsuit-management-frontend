import CaseExpenseState, {
  CaseExpenseRowType,
} from "../../../../../states/case/info/expense/CaseExpenseState.tsx";
import { useRecoilState } from "recoil";
import { ChangeEvent } from "react";
import { produce } from "immer";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";

type Props = {
  item: CaseExpenseRowType & { editable: boolean };
};

function CaseExpenseAmountCell({ item }: Props) {
  const [expense, setExpense] = useRecoilState(CaseExpenseState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (item.editable) {
      const newAmount = e.target.value;
      const newExpense = produce(expense, (draft) => {
        const expense = draft.filter((item2) => item2.id === item.id)[0];
        expense.amount = Number(newAmount);
      });
      setExpense(newExpense);
    }
  };

  return item.editable ? (
    <TextField
      size="small"
      value={item.amount}
      onChange={handleChange}
      fullWidth
    />
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
      }}
    >
      {item.amount}
    </Box>
  );
}

export default CaseExpenseAmountCell;
