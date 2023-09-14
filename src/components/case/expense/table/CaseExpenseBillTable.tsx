import Box from "@mui/material/Box";
import { CircularProgress, Divider, useTheme } from "@mui/material";
import CaseExpenseBillHeaderRow from "./row/CaseExpenseBillHeaderRow.tsx";
import { useRecoilState, useRecoilValue } from "recoil";
import CaseExpenseBillDataRow from "./row/CaseExpenseBillDataRow.tsx";
import Button from "@mui/material/Button";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../../lib/requestDeprecated.ts";
import caseExpenseBillState, {
  CaseExpenseBillRowType,
} from "../../../../states/case/info/expense/expenseBill/CaseExpenseBillState.tsx";
import caseExpenseBillPageState, {
  caseExpenseBillUrlState,
} from "../../../../states/case/info/expense/expenseBill/CaseExpenseBillPageState.tsx";
import caseExpenseBillSizeState from "../../../../states/case/info/expense/expenseBill/CaseExpenseBillSizeState.tsx";
import { updateUrl } from "../../reception/table/CaseReceptionTable.tsx";
import { useEffect } from "react";
import caseExpenseIdState from "../../../../states/case/info/expense/CaseExpenseIdState.tsx";
import caseExpenseBillIsLoadedState from "../../../../states/case/info/expense/expenseBill/CaseExpenseBillIsLoadedState.tsx";

function CaseExpenseBillTable() {
  const theme = useTheme();
  const [expenseBill, setExpenseBill] = useRecoilState(caseExpenseBillState);
  const expenseId = useRecoilValue(caseExpenseIdState);
  const [page, setPage] = useRecoilState(caseExpenseBillPageState);
  const [size, setSize] = useRecoilState(caseExpenseBillSizeState);
  const [isLoaded, setIsLoaded] = useRecoilState(caseExpenseBillIsLoadedState);
  const isNextDisabled = (page + 1) * 5 >= size;
  const url = useRecoilValue(caseExpenseBillUrlState);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    setExpenseBill([]);
    setPage(0);
  }, [expenseId]);

  useEffect(() => {
    if (page > 0 && (page + 1) * 5 > size) {
      setPage(page - 1);
    }
  }, [size]);

  const handlePageChange = (newPage: number) => {
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
      setPage(newPage); // 페이지 업데이트
    };

    requestDeprecated("GET", updateUrl(url, newPage), {
      onSuccess: handleRequestSuccess,
    });
  };

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
      <CaseExpenseBillHeaderRow />
      <Divider />
      {isLoaded ? (
        expenseBill.length > 0 ? (
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
        )
      ) : (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
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
        <Button
          disabled={page === 0}
          onClick={() => {
            handlePageChange(page - 1);
          }}
        >
          prev
        </Button>
        <Button disabled>
          <Box sx={{ color: theme.palette.primary.main }}>{page + 1}</Box>
        </Button>
        <Button
          disabled={isNextDisabled}
          onClick={() => handlePageChange(page + 1)}
        >
          next
        </Button>
      </Box>
      <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
    </Box>
  );
}

export default CaseExpenseBillTable;
