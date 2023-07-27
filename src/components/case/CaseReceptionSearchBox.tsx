import Box from "@mui/material/Box";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers";
import { Button } from "@mui/material";
import request, { RequestSuccessHandler } from "../../lib/request.ts";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import caseReceptionsState, {
  CaseReceptionRowType,
} from "../../states/case/CaseReceptionsState.tsx";
import caseIdState from "../../states/case/CaseIdState.tsx";
import caseReceptionSearchState, {
  caseReceptionSearchUrlState,
} from "../../states/case/CaseReceptionSearchState.tsx";
import caseReceptionSizeState from "../../states/case/CaseReceptionSizeState.tsx";
import caseReceptionPageState from "../../states/case/CaseReceptionPageState.tsx";
import { updateUrl } from "./CaseReceptionTable.tsx";

function CaseReceptionSearchBox() {
  const [receptionSearch, setReceptionSearch] = useRecoilState(
    caseReceptionSearchState,
  );
  const setPage = useSetRecoilState(caseReceptionPageState);
  const url = useRecoilValue(caseReceptionSearchUrlState);
  const setSize = useSetRecoilState(caseReceptionSizeState);

  const caseId = useRecoilValue(caseIdState);
  const setCaseReceptions = useSetRecoilState(caseReceptionsState);

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

  const handleStart = (start: any) => {
    setReceptionSearch({
      ...receptionSearch,
      startDeadline: start,
    });
  };

  const handleEnd = (end: any) => {
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
      }: { receptions: CaseReceptionRowType[]; size: number } =
        res.data["data"];
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
          label="마감일(시작)"
          slotProps={{ textField: { size: "small" } }}
          value={receptionSearch.startDeadline}
          onChange={handleStart}
        />
        <DatePicker
          label="마감일(종료)"
          slotProps={{ textField: { size: "small" } }}
          value={receptionSearch.endDeadLine}
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
