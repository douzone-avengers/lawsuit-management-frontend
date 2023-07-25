import Box from "@mui/material/Box";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers";
import { Button } from "@mui/material";
import request, { RequestSuccessHandler } from "../../lib/request.ts";
import { useRecoilValue, useSetRecoilState } from "recoil";
import caseReceptionsState, {
  CaseReceptionType,
} from "../../states/case/CaseReceptionsState.tsx";
import caseIdState from "../../states/case/CaseIdState.tsx";
import { Dayjs } from "dayjs";

function CaseReceptionSearchBox() {
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [start, setStart] = useState<Dayjs | null>(null);
  const [end, setEnd] = useState<Dayjs | null>(null);

  const caseId = useRecoilValue(caseIdState);
  const setCaseReceptions = useSetRecoilState(caseReceptionsState);

  const handleStatusChange = (e: SelectChangeEvent) => {
    setStatus(e.target.value as string);
  };

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setCategory(e.target.value as string);
  };

  const handleStart = (value: any) => {
    setStart(value);
  };

  const handleEnd = (value: any) => {
    setEnd(value);
  };

  const handleSubmitButtonClick = () => {
    if (caseId === null) {
      console.log("무엇인가 잘못되었습니다.");
      return;
    }

    const url = `/receptions?lawsuit=${caseId}`;

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const caseReceptions: CaseReceptionType[] = res.data["data"];
      setCaseReceptions(caseReceptions);
    };
    request("GET", url, {
      onSuccess: handleRequestSuccess,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "space-between",
        margin: "0 10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FormControl size="small" sx={{ width: 100 }}>
          <InputLabel>상태</InputLabel>
          <Select label="status" onChange={handleStatusChange} value={status}>
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="complete">완료</MenuItem>
            <MenuItem value="incomplete">미완료</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: 100 }}>
          <InputLabel>유형</InputLabel>
          <Select
            label="category"
            onChange={handleCategoryChange}
            value={category}
          >
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="scheduled">기일</MenuItem>
            <MenuItem value="fixed">불변</MenuItem>
          </Select>
        </FormControl>
        <DatePicker
          label="마감일(시작)"
          slotProps={{ textField: { size: "small" } }}
          value={start}
          onChange={handleStart}
        />
        <DatePicker
          label="마감일(종료)"
          slotProps={{ textField: { size: "small" } }}
          value={end}
          onChange={handleEnd}
        />
      </Box>
      <Button variant="contained" onClick={handleSubmitButtonClick}>
        검색
      </Button>
    </Box>
  );
}

export default CaseReceptionSearchBox;
