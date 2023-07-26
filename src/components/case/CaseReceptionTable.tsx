import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import caseReceptionsState, {
  CaseReceptionType,
} from "../../states/case/CaseReceptionsState.tsx";
import request, { RequestSuccessHandler } from "../../lib/request.ts";
import caseIdState from "../../states/case/CaseIdState.tsx";
import { Button, Checkbox, TextField, useTheme } from "@mui/material";
import caseReceptionPageState from "../../states/case/CaseReceptionPageState.tsx";
import caseReceptionSizeState from "../../states/case/CaseReceptionSizeState.tsx";
import { caseReceptionSearchUrlState } from "../../states/case/CaseReceptionSearchState.tsx";
import { DatePicker } from "@mui/x-date-pickers";
import * as dayjs from "dayjs";

export function updateUrl(url: string, newPage: number): string {
  return url.replace(/(page=)\d+/, `$1${newPage}`);
}

function CaseReceptionTable() {
  const theme = useTheme();
  const caseId = useRecoilValue(caseIdState);
  const [caseReceptions, setCaseReceptions] =
    useRecoilState(caseReceptionsState);
  const [page, setPage] = useRecoilState(caseReceptionPageState);
  const [size, setSize] = useRecoilState(caseReceptionSizeState);
  const url = useRecoilValue(caseReceptionSearchUrlState);

  useEffect(() => {
    setPage(0);

    if (caseId === null) {
      return;
    }

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const {
        receptions,
        size,
      }: { receptions: CaseReceptionType[]; size: number } = res.data["data"];
      setCaseReceptions(receptions);
      setSize(size);
    };
    request("GET", url, {
      onSuccess: handleRequestSuccess,
    });
  }, [caseId]);

  return (
    <Box>
      {caseReceptions.map((item) => (
        <Box
          key={item.id}
          sx={{ display: "flex", gap: 1, alignItems: "center" }}
        >
          <Checkbox checked={item.isDone} />
          <TextField size="small" disabled={true} value={item.contents} />
          <TextField size="small" disabled={true} value={item.receptionType} />
          <DatePicker
            disabled={true}
            format="YYYY-MM-DD"
            slotProps={{ textField: { size: "small" } }}
            defaultValue={dayjs(item.receivedAt)}
          />
          <DatePicker
            disabled={true}
            format="YYYY-MM-DD"
            slotProps={{ textField: { size: "small" } }}
            defaultValue={dayjs(item.deadline)}
          />
        </Box>
      ))}
      <Box sx={{ display: "flex" }}>
        <Button
          disabled={page === 0}
          onClick={() => {
            setPage((prevPage) => {
              const page = prevPage - 1;

              const handleRequestSuccess: RequestSuccessHandler = (res) => {
                const {
                  receptions,
                  size,
                }: { receptions: CaseReceptionType[]; size: number } =
                  res.data["data"];
                setCaseReceptions(receptions);
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
                  receptions,
                  size,
                }: { receptions: CaseReceptionType[]; size: number } =
                  res.data["data"];
                setCaseReceptions(receptions);
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

export default CaseReceptionTable;
