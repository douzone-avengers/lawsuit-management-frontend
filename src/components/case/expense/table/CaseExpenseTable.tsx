import { Button, Divider, useTheme } from "@mui/material";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import caseIdState from "../../../../states/case/CaseIdState.tsx";
import { useRecoilState, useRecoilValue } from "recoil";
import request, { RequestSuccessHandler } from "../../../../lib/request.ts";
import caseExpenseState, {
  CaseExpenseRowType,
} from "../../../../states/case/info/expense/CaseExpenseState.tsx";
import caseReceptionPageState from "../../../../states/case/info/reception/CaseReceptionPageState.tsx";
import caseReceptionSizeState from "../../../../states/case/info/reception/CaseReceptionSizeState.tsx";
import { caseExpenseSearchUrlState } from "../../../../states/case/info/expense/CaseExpenseSearchState.tsx";
import CaseExpenseHeaderRow from "./row/CaseExpenseHeaderRow.tsx";
import CaseExpenseDataRow from "./row/CaseExpenseDataRow.tsx";
import { updateUrl } from "../../reception/table/CaseReceptionTable.tsx";

function CaseExpenseTable() {
  const theme = useTheme();
  const caseId = useRecoilValue(caseIdState);
  const [expense, setExpense] = useRecoilState(caseExpenseState);
  const [page, setPage] = useRecoilState(caseReceptionPageState);
  const [size, setSize] = useRecoilState(caseReceptionSizeState);

  const url = useRecoilValue(caseExpenseSearchUrlState);

  useEffect(() => {
    if (caseId === null) {
      return;
    }

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const { expense, size }: { expense: CaseExpenseRowType[]; size: number } =
        res.data["data"];

      setExpense(
        expense.map((item) => {
          return { ...item, editable: false };
        }),
      );
      setSize(size);
    };

    request("GET", url, {
      onSuccess: handleRequestSuccess,
    });
  }, [caseId]);

  return (
    <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <Box sx={{ marginBottom: 2 }}></Box>
      <Divider />
      <CaseExpenseHeaderRow />
      <Divider />
      {expense.map((item) => (
        <CaseExpenseDataRow key={item.id} item={item} />
      ))}
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
                  expense,
                  size,
                }: { expense: CaseExpenseRowType[]; size: number } =
                  res.data["data"];
                setExpense(
                  expense.map((item) => {
                    return { ...item, editable: false };
                  }),
                );
                setSize(size);
              };

              request("GET", updateUrl(url, page), {
                onSuccess: handleRequestSuccess,
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
          disabled={size / 5 <= page + 1}
          onClick={() => {
            setPage((prevPage) => {
              const page = prevPage + 1;

              const handleRequestSuccess: RequestSuccessHandler = (res) => {
                const {
                  expense,
                  size,
                }: { expense: CaseExpenseRowType[]; size: number } =
                  res.data["data"];
                setExpense(
                  expense.map((item) => {
                    return { ...item, editable: false };
                  }),
                );
                setSize(size);
              };

              request("GET", updateUrl(url, page), {
                onSuccess: handleRequestSuccess,
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
