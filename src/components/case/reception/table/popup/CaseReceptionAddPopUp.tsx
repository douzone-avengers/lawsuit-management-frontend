import { useRecoilValue, useSetRecoilState } from "recoil";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { ChangeEvent, useState } from "react";
import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import * as dayjs from "dayjs";
import { Dayjs } from "dayjs";
import caseIdState from "../../../../../states/case/CaseIdState.tsx";
import { caseReceptionSearchUrlState } from "../../../../../states/case/info/reception/CaseReceptionSearchState.tsx";
import caseReceptionAddPopUpOpenState from "../../../../../states/case/info/reception/CaseReceptionAddPopUpOpenState.tsx";
import caseReceptionsState, {
  CaseReceptionRowType,
} from "../../../../../states/case/info/reception/CaseReceptionsState.tsx";
import caseReceptionSizeState from "../../../../../states/case/info/reception/CaseReceptionSizeState.tsx";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../../../lib/requestDeprecated.ts";
import PopUp from "../../../../common/PopUp.tsx";
import CloseButton from "../../../../common/CloseButton.tsx";

function CaseReceptionAddPopUp() {
  const [status, setStatus] = useState("incomplete");
  const [category, setCategory] = useState("scheduled");
  const [contents, setContents] = useState("");
  const [receivedAt, setReceivedAt] = useState(new Date().toISOString());
  const [deadline, setDeadline] = useState(new Date().toISOString());

  const caseId = useRecoilValue(caseIdState);

  const url = useRecoilValue(caseReceptionSearchUrlState);

  const setReceptionAddPopUpOpen = useSetRecoilState(
    caseReceptionAddPopUpOpenState,
  );
  const setReceptions = useSetRecoilState(caseReceptionsState);
  const setSize = useSetRecoilState(caseReceptionSizeState);

  const handleCloseButtonClick = () => {
    setReceptionAddPopUpOpen(false);
  };

  const handleStatusChange = (e: SelectChangeEvent) => {
    setStatus(e.target.value);
  };

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setCategory(e.target.value);
  };

  const handleContentsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
  };

  const handleReceivedAtChange = (e: Dayjs | null) => {
    setReceivedAt(e?.toDate().toISOString() ?? "");
  };

  const handleDeadlineChange = (e: Dayjs | null) => {
    setDeadline(e?.toDate().toISOString() ?? "");
  };

  const handleSubmitClick = () => {
    const handleRequestSuccess: RequestSuccessHandler = () => {
      const handleRequestSuccess2: RequestSuccessHandler = (res) => {
        const {
          receptions,
          size,
        }: { receptions: CaseReceptionRowType[]; size: number } = res.data;
        setReceptions(
          receptions.map((item) => {
            return { ...item, editable: false };
          }),
        );
        setSize(size);
        setReceptionAddPopUpOpen(false);
      };

      requestDeprecated("GET", url, {
        onSuccess: handleRequestSuccess2,
        useMock: false,
      });
    };

    requestDeprecated("POST", `/receptions`, {
      body: {
        lawsuitId: caseId,
        status: status,
        category,
        contents,
        receivedAt,
        deadline,
      },
      onSuccess: handleRequestSuccess,
      useMock: false,
    });
  };

  return (
    <PopUp>
      <CloseButton onClick={handleCloseButtonClick} />
      <FormControl size="small">
        <InputLabel>상태</InputLabel>
        <Select label="status" onChange={handleStatusChange} value={status}>
          <MenuItem value="complete">완료</MenuItem>
          <MenuItem value="incomplete">미완료</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small">
        <InputLabel>유형</InputLabel>
        <Select
          label="category"
          onChange={handleCategoryChange}
          value={category}
        >
          <MenuItem value="scheduled">기일</MenuItem>
          <MenuItem value="fixed">불변</MenuItem>
        </Select>
      </FormControl>
      <TextField
        size="small"
        label="내용"
        value={contents}
        onChange={handleContentsChange}
      />
      <DatePicker
        format="YYYY-MM-DD"
        slotProps={{ textField: { size: "small" } }}
        defaultValue={dayjs(receivedAt)}
        label="접수일"
        onChange={handleReceivedAtChange}
      />
      <DatePicker
        format="YYYY-MM-DD"
        slotProps={{ textField: { size: "small" } }}
        defaultValue={dayjs(deadline)}
        label="마감일"
        onChange={handleDeadlineChange}
      />
      <Button size="large" variant="contained" onClick={handleSubmitClick}>
        등록
      </Button>
    </PopUp>
  );
}

export default CaseReceptionAddPopUp;
