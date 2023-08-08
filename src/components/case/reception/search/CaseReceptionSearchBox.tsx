import Box from "@mui/material/Box";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers";
import { Button, TextField } from "@mui/material";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ChangeEvent } from "react";
import { updateUrl } from "../table/CaseReceptionTable.tsx";
import caseReceptionSearchState, {
  caseReceptionSearchUrlState,
} from "../../../../states/case/info/reception/CaseReceptionSearchState.tsx";
import caseReceptionPageState from "../../../../states/case/info/reception/CaseReceptionPageState.tsx";
import caseReceptionSizeState from "../../../../states/case/info/reception/CaseReceptionSizeState.tsx";
import caseIdState from "../../../../states/case/CaseIdState.tsx";
import caseReceptionsState, {
  CaseReceptionRowType,
} from "../../../../states/case/info/reception/CaseReceptionsState.tsx";
import request, { RequestSuccessHandler } from "../../../../lib/request.ts";

function CaseReceptionSearchBox() {
  const [receptionSearch, setReceptionSearch] = useRecoilState(
    caseReceptionSearchState,
  );
  const setPage = useSetRecoilState(caseReceptionPageState);
  const url = useRecoilValue(caseReceptionSearchUrlState);
  const setSize = useSetRecoilState(caseReceptionSizeState);

  const caseId = useRecoilValue(caseIdState);
  const setCaseReceptions = useSetRecoilState(caseReceptionsState);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReceptionSearch({
      ...receptionSearch,
      contents: e.target.value,
    });
  };

  const handleStatusChange = (e: SelectChangeEvent) => {
    setReceptionSearch({
      ...receptionSearch,
      status: e.target.value as string,
    });
  };

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setReceptionSearch({
      ...receptionSearch,
      category: e.target.value as string,
    });
  };

  const handleStartReceivedAt = (start: any) => {
    setReceptionSearch({
      ...receptionSearch,
      startReceivedAt: start,
    });
  };

  const handleEndReceivedAt = (end: any) => {
    setReceptionSearch({
      ...receptionSearch,
      endReceivedAt: end,
    });
  };

  const handleStartDeadline = (start: any) => {
    setReceptionSearch({
      ...receptionSearch,
      startDeadline: start,
    });
  };

  const handleEndDeadline = (end: any) => {
    setReceptionSearch({
      ...receptionSearch,
      endDeadLine: end,
    });
  };

  const handleSubmitButtonClick = () => {
    if (caseId === null) {
      // TODO
      return;
    }
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const {
        receptions,
        size,
      }: { receptions: CaseReceptionRowType[]; size: number } = res.data;
      setCaseReceptions(
        receptions.map((item) => {
          return { ...item, editable: false };
        }),
      );
      setSize(size);
      setPage(0);
    };

    const newUrl = updateUrl(url, 0);
    request("GET", newUrl, {
      onSuccess: handleRequestSuccess,
      useMock: false,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        margin: "0 10px",
      }}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          sx={{ flexGrow: 1 }}
          size="small"
          value={receptionSearch.contents}
          onChange={handleTextChange}
        />
        <Button variant="contained" onClick={handleSubmitButtonClick}>
          검색
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "left",
        }}
      >
        <FormControl size="small" sx={{ width: 100 }}>
          <InputLabel>상태</InputLabel>
          <Select
            label="status"
            onChange={handleStatusChange}
            value={receptionSearch.status}
          >
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
            value={receptionSearch.category}
          >
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="scheduled">기일</MenuItem>
            <MenuItem value="fixed">불변</MenuItem>
          </Select>
        </FormControl>
        <DatePicker
          label="접수일(시작)"
          slotProps={{ textField: { size: "small" } }}
          value={receptionSearch.startReceivedAt}
          onChange={handleStartReceivedAt}
        />
        <Box>–</Box>
        <DatePicker
          label="접수일(종료)"
          slotProps={{ textField: { size: "small" } }}
          value={receptionSearch.endReceivedAt}
          onChange={handleEndReceivedAt}
        />
        <DatePicker
          label="마감일(시작)"
          slotProps={{ textField: { size: "small" } }}
          value={receptionSearch.startDeadline}
          onChange={handleStartDeadline}
        />
        <Box>–</Box>
        <DatePicker
          label="마감일(종료)"
          slotProps={{ textField: { size: "small" } }}
          value={receptionSearch.endDeadLine}
          onChange={handleEndDeadline}
        />
      </Box>
    </Box>
  );
}

export default CaseReceptionSearchBox;
