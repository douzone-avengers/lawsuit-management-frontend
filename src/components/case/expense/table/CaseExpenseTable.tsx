import { Button, Divider, useTheme } from "@mui/material";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import caseIdState from "../../../../states/case/CaseIdState.tsx";
import { useRecoilState, useRecoilValue } from "recoil";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../../../lib/requestDeprecated.ts";
import caseExpensesState, {
  CaseExpenseRowType,
} from "../../../../states/case/info/expense/CaseExpensesState.tsx";
import { caseExpenseSearchUrlState } from "../../../../states/case/info/expense/CaseExpenseSearchState.tsx";
import CaseExpenseHeaderRow from "./row/CaseExpenseHeaderRow.tsx";
import CaseExpenseDataRow from "./row/CaseExpenseDataRow.tsx";
import { updateUrl } from "../../reception/table/CaseReceptionTable.tsx";
import caseExpenseSizeState from "../../../../states/case/info/expense/CaseExpenseSizeState.tsx";
import caseExpensePageState from "../../../../states/case/info/expense/CaseExpensePageState.tsx";
import caseExpenseSortKeyState from "../../../../states/case/info/expense/CaseExpenseSortKeyState.tsx";
import caseExpenseSortOrderState from "../../../../states/case/info/expense/CaseExpenseSortOrderState.tsx";

function CaseExpenseTable() {
  const theme = useTheme();
  const caseId = useRecoilValue(caseIdState);
  const [expenses, setExpenses] = useRecoilState(caseExpensesState);
  const [page, setPage] = useRecoilState(caseExpensePageState);
  const [size, setSize] = useRecoilState(caseExpenseSizeState);
  const [sortKey, setSortKey] = useRecoilState(caseExpenseSortKeyState);
  const [sortOrder, setSortOrder] = useRecoilState(caseExpenseSortOrderState);

  const url = useRecoilValue(caseExpenseSearchUrlState);
  const isNextDisabled = (page + 1) * 5 >= size;

  useEffect(() => {
    if (caseId === null) {
      return;
    }

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const {
        expenses,
        size,
      }: { expenses: CaseExpenseRowType[]; size: number } = res.data;

      setExpenses(
        expenses.map((item) => {
          return { ...item, editable: false };
        }),
      );
      setSize(size);
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", url, {
      useMock: false,
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  }, [caseId, sortKey, sortOrder]);

  return (
    <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <Box sx={{ marginBottom: 2 }}></Box>
      <Divider />
      <CaseExpenseHeaderRow
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <Divider />
      {expenses.length > 0 ? (
        expenses.map((item) => <CaseExpenseDataRow key={item.id} item={item} />)
      ) : (
        <Box
          sx={{
            width: "100%",
            height: 120,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          지출정보가 존재하지 않습니다.
        </Box>
      )}
      <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          disabled={page === 0}
          onClick={() => {
            setPage((prevPage) => {
              const page = prevPage - 1;

              const handleRequestSuccess: RequestSuccessHandler = (res) => {
                const {
                  expenses,
                  size,
                }: { expenses: CaseExpenseRowType[]; size: number } = res.data;
                setExpenses(
                  expenses.map((item) => {
                    return { ...item, editable: false };
                  }),
                );
                setSize(size);
              };

              requestDeprecated("GET", updateUrl(url, page), {
                onSuccess: handleRequestSuccess,
                useMock: false,
              });

              return page;
            });
          }}
        >
          prev
        </Button>
        <Button disabled>
          <Box sx={{ color: theme.palette.primary.main }}>{page + 1}</Box>
        </Button>
        <Button
          disabled={isNextDisabled}
          onClick={() => {
            setPage((prevPage) => {
              const page = prevPage + 1;

              const handleRequestSuccess: RequestSuccessHandler = (res) => {
                const {
                  expenses,
                  size,
                }: { expenses: CaseExpenseRowType[]; size: number } = res.data;
                setExpenses(
                  expenses.map((item) => {
                    return { ...item, editable: false };
                  }),
                );
                setSize(size);
              };

              requestDeprecated("GET", updateUrl(url, page), {
                onSuccess: handleRequestSuccess,
                useMock: false,
              });

              return page;
            });
          }}
        >
          next
        </Button>
      </Box>
    </Box>
  );
}

export default CaseExpenseTable;
