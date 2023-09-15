import { ChangeEvent, useState } from "react";
import caseIdState from "../../../../../states/case/CaseIdState.tsx";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { caseExpenseSearchUrlState } from "../../../../../states/case/info/expense/CaseExpenseSearchState.tsx";
import caseExpenseAddPopUpOpenState from "../../../../../states/case/info/expense/CaseExpenseAddPopUpOpenState.tsx";
import caseExpensesState, {
  CaseExpenseRowType,
} from "../../../../../states/case/info/expense/CaseExpensesState.tsx";
import caseExpenseSizeState from "../../../../../states/case/info/expense/CaseExpenseSizeState.tsx";
import dayjs, { Dayjs } from "dayjs";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../../../lib/requestDeprecated.ts";
import PopUp from "../../../../common/PopUp.tsx";
import CloseButton from "../../../../common/CloseButton.tsx";
import { DatePicker } from "@mui/x-date-pickers";
import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import caseInfoState, {
  CaseInfoType,
} from "../../../../../states/case/info/caseInfoState.tsx";

function CaseExpenseAddPopUp() {
  const [speningAt, setSpeningAt] = useState(new Date().toISOString());
  const [contents, setContents] = useState("");
  const [amount, setAmount] = useState(0);

  const caseId = useRecoilValue(caseIdState);
  const setCaseInfo = useSetRecoilState(caseInfoState);

  const url = useRecoilValue(caseExpenseSearchUrlState);

  const setExpenseAddPopUpOpen = useSetRecoilState(
    caseExpenseAddPopUpOpenState,
  );
  const setExpenses = useSetRecoilState(caseExpensesState);
  const setSize = useSetRecoilState(caseExpenseSizeState);

  const handleCloseButtonClick = () => {
    setExpenseAddPopUpOpen(false);
  };

  const handleSpeningAtChange = (e: Dayjs | null) => {
    setSpeningAt(e?.toDate().toISOString() ?? "");
  };

  const handleContentsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleSubmitClick = () => {
    const handleRequestSuccess: RequestSuccessHandler = () => {
      const handleRequestSuccess2: RequestSuccessHandler = (res) => {
        const {
          expenses,
          size,
        }: { expenses: CaseExpenseRowType[]; size: number } = res.data;
        setExpenses(
          expenses.map((item) => {
            return { ...item, editable: false, isSelected: false };
          }),
        );
        setSize(size);
        setExpenseAddPopUpOpen(false);

        const handleRequestSuccess3: RequestSuccessHandler = (res) => {
          const body: CaseInfoType = res.data;
          setCaseInfo(body);
        };

        requestDeprecated("GET", `/lawsuits/${caseId}/basic`, {
          onSuccess: handleRequestSuccess3,
        });
      };

      requestDeprecated("GET", url, {
        onSuccess: handleRequestSuccess2,
      });
    };

    requestDeprecated("POST", `/expenses`, {
      body: {
        lawsuitId: caseId,
        speningAt,
        contents,
        amount,
      },
      onSuccess: handleRequestSuccess,
    });
  };

  return (
    <PopUp width={400}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box></Box>
        <Typography variant="h5" sx={{ margin: "0 0 0 23px" }}>
          지출 등록
        </Typography>
        <Box>
          <CloseButton onClick={handleCloseButtonClick} />
        </Box>
      </Box>

      <DatePicker
        format="YYYY-MM-DD"
        slotProps={{ textField: { size: "small" } }}
        defaultValue={dayjs(speningAt)}
        label="등록일"
        onChange={handleSpeningAtChange}
      />
      <TextField
        size="medium"
        label="내용"
        multiline
        rows={7}
        value={contents}
        onChange={handleContentsChange}
      ></TextField>
      <TextField
        size="small"
        label="금액"
        value={amount}
        onChange={handleAmountChange}
      ></TextField>
      <Button size="large" variant="contained" onClick={handleSubmitClick}>
        등록
      </Button>
    </PopUp>
  );
}

export default CaseExpenseAddPopUp;
