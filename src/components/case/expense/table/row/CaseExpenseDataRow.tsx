import Box from "@mui/material/Box";
import CaseExpensesState, {
  CaseExpenseRowType,
} from "../../../../../states/case/info/expense/CaseExpensesState.tsx";
import CaseExpenseContentsCell from "../cell/CaseExpenseContentsCell.tsx";
import CaseExpenseSpeningAtCell from "../cell/CaseExpenseSpeningAtCell.tsx";
import CaseExpenseAmountCell from "../cell/CaseExpenseAmountCell.tsx";
import CaseExpenseEditConfirmButton from "../button/CaseExpenseEditConfirmButton.tsx";
import CaseExpenseEditButton from "../button/CaseExpenseEditButton.tsx";
import CaseExpenseDeleteButton from "../button/CaseExpenseDeleteButton.tsx";
import { useRecoilValue } from "recoil";
import { isEmployeeState } from "../../../../../states/user/UserState.ts";
import { useRecoilState, useSetRecoilState } from "recoil";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../../../lib/requestDeprecated.ts";
import caseExpenseBillState, {
  CaseExpenseBillRowType,
} from "../../../../../states/case/info/expense/CaseExpenseBillState.tsx";
import { produce } from "immer";

type Props = {
  item: CaseExpenseRowType & { editable: boolean; isSelected: boolean };
  caseId: number | null;
};

function CaseExpenseDataRow({ item, caseId }: Props) {
  const isEmployee = useRecoilValue(isEmployeeState);

  const [expenses, setExpenses] = useRecoilState(CaseExpensesState);
  const setExpenseBill = useSetRecoilState(caseExpenseBillState);

  const handleClickRow = (expenseId: number) => {
    const newExpenses = produce(expenses, (draft) => {
      for (const d of draft) {
        d.isSelected = false;
      }
      const expense = draft.filter((item2) => item2.id === item.id)[0];
      expense.isSelected = true;
    });
    setExpenses(newExpenses);

    if (expenseId === null) {
      return;
    }

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const expenseBill: CaseExpenseBillRowType[] = res.data;

      setExpenseBill(
        expenseBill.map((item) => {
          return { ...item, editable: false };
        }),
      );
    };

    requestDeprecated("GET", `/expenses/${expenseId}/bill`, {
      onSuccess: handleRequestSuccess,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: 40,
        minWidth: "715.69px",
        background: item.isSelected ? "lightgray" : "none",
      }}
    >
      <Box
        sx={{ width: 200, minWidth: 150 }}
        onClick={() => handleClickRow(item.id)}
      >
        <CaseExpenseSpeningAtCell item={item} />
      </Box>
      <Box
        sx={{ width: 500, minWidth: 200 }}
        onClick={() => handleClickRow(item.id)}
      >
        <CaseExpenseContentsCell item={item} />
      </Box>
      <Box
        sx={{ width: 200, minWidth: 100 }}
        onClick={() => handleClickRow(item.id)}
      >
        <CaseExpenseAmountCell item={item} />
      </Box>
      {isEmployee && (
        <Box sx={{ display: "flex", width: 150, minWidth: 150 }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {item.editable ? (
              <CaseExpenseEditConfirmButton item={item} caseId={caseId} />
            ) : (
              <CaseExpenseEditButton item={item} />
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CaseExpenseDeleteButton item={item} />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default CaseExpenseDataRow;
