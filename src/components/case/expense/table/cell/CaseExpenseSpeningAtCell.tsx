import caseExpensesState, {
  CaseExpenseRowType,
} from "../../../../../states/case/info/expense/CaseExpensesState.tsx";
import { useRecoilState } from "recoil";
import * as dayjs from "dayjs";
import { Dayjs } from "dayjs";
import { produce } from "immer";
import { DatePicker } from "@mui/x-date-pickers";
import Box from "@mui/material/Box";
import { toDateValue } from "../../../../../lib/convert.ts";

type Props = {
  item: CaseExpenseRowType & { editable: boolean };
};

function CaseExpenseSpeningAtCell({ item }: Props) {
  const [expense, setExpense] = useRecoilState(caseExpensesState);

  const handleChange = (e: Dayjs | null) => {
    if (item.editable) {
      const newExpense = produce(expense, (draft) => {
        const expense = draft.filter((item2) => item2.id === item.id)[0];
        expense.speningAt = e?.toDate().toISOString() ?? "";
      });
      setExpense(newExpense);
    }
  };

  return item.editable ? (
    <DatePicker
      key={item.id}
      disabled={!item.editable}
      format="YYYY-MM-DD"
      slotProps={{ textField: { size: "small" } }}
      defaultValue={dayjs(item.speningAt)}
      onChange={handleChange}
      sx={{ width: "100%" }}
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
      {toDateValue(item.speningAt)}
    </Box>
  );
}

export default CaseExpenseSpeningAtCell;
