import caseExpensesState, {
  CaseExpenseRowType,
} from "../../../../../states/case/info/expense/CaseExpensesState.tsx";
import { useRecoilState } from "recoil";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import Box from "@mui/material/Box";

type Props = {
  item: CaseExpenseRowType & { editable: boolean };
};

function CaseExpenseSpeningAtCell({ item }: Props) {
  const [expenses, setExpenses] = useRecoilState(caseExpensesState);

  const handleChange = (e: Dayjs | null) => {
    if (item.editable) {
      console.dir("before");
      console.dir(expenses);
      // const newExpenses = produce(expenses, (draft) => {
      //   const expenses = draft.filter((item2) => item2.id === item.id)[0];
      //   expenses.speningAt = e?.toDate().toISOString() ?? "";
      // });

      const newExpenses = expenses.map((expense) =>
        expense.id === item.id
          ? { ...expense, speningAt: "2010-03-13" } // 새로운 날짜로 수정
          : expense,
      );

      console.dir("after");
      console.dir(newExpenses);
      setExpenses(newExpenses);
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
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        cursor: "pointer",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        paddingTop: 1,
        textAlign: "center",
      }}
    >
      {item.speningAt}
    </Box>
  );
}

export default CaseExpenseSpeningAtCell;
