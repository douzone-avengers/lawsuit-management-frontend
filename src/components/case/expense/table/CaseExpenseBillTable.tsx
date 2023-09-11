import Box from "@mui/material/Box";
import { Divider, useTheme } from "@mui/material";
import CaseExpenseBillHeaderRow from "./row/CaseExpenseBillHeaderRow.tsx";
import { useRecoilState, useRecoilValue } from "recoil";
import CaseExpenseBillDataRow from "./row/CaseExpenseBillDataRow.tsx";
import Button from "@mui/material/Button";
import caseExpenseIdState from "../../../../states/case/info/expense/CaseExpenseIdState.tsx";
import { useEffect, useState } from "react";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../../../lib/requestDeprecated.ts";
import caseExpensesState from "../../../../states/case/info/expense/CaseExpensesState.tsx";
import caseExpenseBillState, {
  CaseExpenseBillRowType,
} from "../../../../states/case/info/expense/CaseExpenseBillState.tsx";

function CaseExpenseBillTable() {
  const theme = useTheme();
  const expenses = useRecoilValue(caseExpensesState);
  const [expenseId, setExpenseId] = useRecoilState(caseExpenseIdState);
  const [expenseBill, setExpenseBill] = useRecoilState(caseExpenseBillState);

  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (expenses.length > 0) {
      setExpenseId(expenses[0].id);
    }
  }, [expenses]);

  useEffect(() => {
    if (!trigger) {
      return;
    }
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const expenseBill: CaseExpenseBillRowType[] = res.data;

      setExpenseBill(
        expenseBill.map((item) => {
          return { ...item, editable: false };
        }),
      );

      setTrigger(false);
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/expenses/${expenseId}/bill`, {
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  }, [trigger]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "30%",
        height: "326.87px",
        flexDirection: "column",
      }}
    >
      <Box sx={{ marginBottom: 2 }}></Box>
      <Divider />
      <CaseExpenseBillHeaderRow setTrigger={setTrigger} />
      <Divider />
      {expenseBill.length > 0 ? (
        expenseBill.map((item) => (
          <CaseExpenseBillDataRow key={item.id} item={item} />
        ))
      ) : (
        <Box
          sx={{
            width: "100%",
            height: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          자료가 없습니다.
        </Box>
      )}
      {expenseBill.length > 0 &&
        Array.from({ length: 5 - expenseBill.length }).map((_, index) => (
          <Box key={index} sx={{ width: "100%", height: 40 }}></Box>
        ))}
      <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button>prev</Button>
        <Button disabled>
          <Box sx={{ color: theme.palette.primary.main }}></Box>
        </Button>
        <Button>next</Button>
      </Box>
      <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
    </Box>
  );
}

export default CaseExpenseBillTable;
