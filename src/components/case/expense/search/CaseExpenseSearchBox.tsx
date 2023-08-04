import "react-day-picker/dist/style.css";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { ChangeEvent, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import caseExpensePageState from "../../../../states/case/info/expense/CaseExpensePageState.tsx";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import caseExpenseSearchState, {
  caseExpenseSearchUrlState,
} from "../../../../states/case/info/expense/CaseExpenseSearchState.tsx";
import caseExpenseSizeState from "../../../../states/case/info/expense/CaseExpenseSizeState.tsx";
import caseExpenseState, {
  CaseExpenseRowType,
} from "../../../../states/case/info/expense/CaseExpenseState.tsx";
import caseIdState from "../../../../states/case/CaseIdState.tsx";
import request, { RequestSuccessHandler } from "../../../../lib/request.ts";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import { updateUrl } from "../../reception/table/CaseReceptionTable.tsx";

function CaseExpenseSearchBox() {
  const [expenseSearch, setExpenseSearch] = useRecoilState(
    caseExpenseSearchState,
  );
  const setPage = useSetRecoilState(caseExpensePageState);
  const url = useRecoilValue(caseExpenseSearchUrlState);
  const setSize = useSetRecoilState(caseExpenseSizeState);

  const caseId = useRecoilValue(caseIdState);
  const setCaseExpense = useSetRecoilState(caseExpenseState);
  const [selectedStartDate, setSelectedStartDate] = useState<string>("");
  // const [startValue, setStartValue] = useState<string>("");
  // const [endValue, setEndValue] = useState<string>("");

  const handleStartSpeningAt = (start: any) => {
    setSelectedStartDate(start);
    setExpenseSearch({
      ...expenseSearch,
      startSpeningAt: start,
    });
  };

  const handleEndSpeningAt = (end: any) => {
    setExpenseSearch({
      ...expenseSearch,
      endSpeningAt: end,
    });
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExpenseSearch({
      ...expenseSearch,
      contents: e.target.value,
    });
  };

  const handleStartAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExpenseSearch({
      ...expenseSearch,
      startAmount: Number(e.target.value),
    });
  };

  const handleEndAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExpenseSearch({
      ...expenseSearch,
      endAmount: Number(e.target.value),
    });
  };

  const handleStartAmountClick = () => {
    setExpenseSearch({
      ...expenseSearch,
      startAmount: 0,
    });
  };

  const handleEndAmountClick = () => {
    setExpenseSearch({
      ...expenseSearch,
      endAmount: 0,
    });
  };

  const handleResetClick = () => {
    setSelectedStartDate("");
    setExpenseSearch({
      ...expenseSearch,
      startSpeningAt: null,
      endSpeningAt: null,
      contents: "",
      startAmount: 0,
      endAmount: 0,
    });
  };

  const handleSubmitButtonClick = () => {
    if (caseId === null) {
      // TODO
      return;
    }

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const { expense, size }: { expense: CaseExpenseRowType[]; size: number } =
        res.data["data"];
      setCaseExpense(
        expense.map((item) => {
          return { ...item, editable: false };
        }),
      );
      setSize(size);
      setPage(0);
    };

    // updateUrl은 CaseReceptionTable에 있는 updateUrl
    const newUrl = updateUrl(url, 0);
    request("GET", newUrl, {
      onSuccess: handleRequestSuccess,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        flexDirection: "row",
        margin: "0 10px 0 10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          width: "27%",
        }}
      >
        <DatePicker
          label="시작일"
          value={expenseSearch.startSpeningAt}
          format="YYYY-MM-DD"
          formatDensity="spacious"
          onChange={handleStartSpeningAt}
        />
        <Box>–</Box>
        <DatePicker
          label="마지막일"
          value={expenseSearch.endSpeningAt}
          format="YYYY-MM-DD"
          minDate={selectedStartDate}
          formatDensity="spacious"
          onChange={handleEndSpeningAt}
        />
      </Box>
      <Box sx={{ display: "flex", width: "30%" }}>
        <TextField
          label="지출 내용"
          sx={{ width: "100%" }}
          value={expenseSearch.contents}
          onChange={handleTextChange}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
          width: "27%",
        }}
      >
        <TextField
          label="시작 금액"
          value={expenseSearch.startAmount}
          onChange={handleStartAmountChange}
          InputProps={{
            onClick: handleStartAmountClick,
          }}
        />
        <Box>–</Box>
        <TextField
          label="마지막 금액"
          value={expenseSearch.endAmount}
          onChange={handleEndAmountChange}
          InputProps={{
            onClick: handleEndAmountClick,
          }}
        />
      </Box>

      <Box sx={{ width: "3%" }}>
        <IconButton
          sx={{ width: "100%", height: "100%" }}
          onClick={handleResetClick}
        >
          <RefreshIcon color="primary" />
        </IconButton>
      </Box>
      <Box sx={{ width: "11%" }}>
        <Button
          variant="outlined"
          sx={{ width: "100%", height: "100%" }}
          onClick={handleSubmitButtonClick}
        >
          조회
        </Button>
      </Box>
    </Box>
  );
}

export default CaseExpenseSearchBox;
