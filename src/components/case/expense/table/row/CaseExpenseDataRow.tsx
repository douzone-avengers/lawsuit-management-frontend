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
} from "../../../../../states/case/info/expense/expenseBill/CaseExpenseBillState.tsx";
import { produce } from "immer";
import caseExpenseIdState from "../../../../../states/case/info/expense/CaseExpenseIdState.tsx";
import caseExpenseBillPageState, {
  caseExpenseBillUrlState,
} from "../../../../../states/case/info/expense/expenseBill/CaseExpenseBillPageState.tsx";
import { useEffect } from "react";
import caseExpenseBillSizeState from "../../../../../states/case/info/expense/expenseBill/CaseExpenseBillSizeState.tsx";

type Props = {
  item: CaseExpenseRowType & { editable: boolean; isSelected: boolean };
  caseId: number | null;
};

function CaseExpenseDataRow({ item, caseId }: Props) {
  const isEmployee = useRecoilValue(isEmployeeState);

  const [expenses, setExpenses] = useRecoilState(CaseExpensesState);
  const setExpenseBill = useSetRecoilState(caseExpenseBillState);
  const [expenseId, setExpenseId] = useRecoilState(caseExpenseIdState);
  const [page, setPage] = useRecoilState(caseExpenseBillPageState);
  const setSize = useSetRecoilState(caseExpenseBillSizeState);
  const url = useRecoilValue(caseExpenseBillUrlState);

  useEffect(() => {
    if (expenseId === null) {
      return;
    }

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const {
        expenseBill,
        size,
      }: { expenseBill: CaseExpenseBillRowType[]; size: number } = res.data;

      setExpenseBill(
        expenseBill.map((item) => {
          return { ...item, editable: false };
        }),
      );
      setSize(size);
    };

    requestDeprecated("GET", url, {
      onSuccess: handleRequestSuccess,
    });
  }, [expenseId, page]);

  const handleClickRow = (expenseId: number) => {
    const newExpenses = produce(expenses, (draft) => {
      for (const d of draft) {
        d.isSelected = false;
      }
      const expense = draft.filter((item2) => item2.id === expenseId)[0];
      expense.isSelected = true;
    });

    setExpenses(newExpenses);
    setExpenseId(expenseId);
    setPage(0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: 40,
        minWidth: "715.69px",
        background: item.isSelected ? "#DCE8F6" : "none",
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
