import caseExpensesState, {
  CaseExpenseRowType,
} from "../../../../../states/case/info/expense/CaseExpensesState.tsx";
import { TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { produce } from "immer";
import Box from "@mui/material/Box";
import { ChangeEvent } from "react";

type Props = {
  item: CaseExpenseRowType & { editable: boolean };
  handleClickRow: any;
};

function CaseExpenseContentsCell({ item, handleClickRow }: Props) {
  const [expense, setExpense] = useRecoilState(caseExpensesState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (item.editable) {
      const newContents = e.target.value;
      const newExpense = produce(expense, (draft) => {
        const expense = draft.filter((item2) => item2.id === item.id)[0];
        expense.contents = newContents;
      });
      setExpense(newExpense);
    }
  };

  return item.editable ? (
    <TextField
      size="small"
      value={item.contents}
      onChange={handleChange}
      multiline
      rows={1}
      fullWidth
    />
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        height: 40,
        cursor: "pointer",
      }}
      onClick={handleClickRow}
    >
      {item.contents}
    </Box>
  );
}

export default CaseExpenseContentsCell;
