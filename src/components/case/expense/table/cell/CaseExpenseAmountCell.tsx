import CaseExpenseState, {
  CaseExpenseRowType,
} from "../../../../../states/case/info/expense/CaseExpensesState.tsx";
import { useRecoilState } from "recoil";
import { ChangeEvent } from "react";
import { produce } from "immer";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { delimiter } from "../../../../../lib/convert.ts";

type Props = {
  item: CaseExpenseRowType & { editable: boolean };
};

function CaseExpenseAmountCell({ item }: Props) {
  const [expenses, setExpenses] = useRecoilState(CaseExpenseState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (item.editable) {
      const newAmount = e.target.value;
      const newExpenses = produce(expenses, (draft) => {
        const expenses = draft.filter((item2) => item2.id === item.id)[0];
        expenses.amount = Number(newAmount);
      });
      setExpenses(newExpenses);
    }
  };

  return item.editable ? (
    <TextField
      size="small"
      value={item.amount}
      onChange={handleChange}
      fullWidth
      sx={{
        Input: {
          textAlign: "center",
        },
      }}
    />
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        cursor: "pointer",
      }}
    >
      {delimiter(item.amount)}
    </Box>
  );
}

export default CaseExpenseAmountCell;
