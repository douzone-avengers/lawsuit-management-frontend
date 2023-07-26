import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import caseReceptionsState, {
  CaseReceptionRowType,
} from "../../states/case/CaseReceptionsState.tsx";
import request, { RequestSuccessHandler } from "../../lib/request.ts";
import caseIdState from "../../states/case/CaseIdState.tsx";
import { Button, Divider, useTheme } from "@mui/material";
import caseReceptionPageState from "../../states/case/CaseReceptionPageState.tsx";
import caseReceptionSizeState from "../../states/case/CaseReceptionSizeState.tsx";
import { caseReceptionSearchUrlState } from "../../states/case/CaseReceptionSearchState.tsx";
import DeleteButton from "../common/DeleteButton.tsx";
import EditButton from "../common/EditButton.tsx";
import CaseReceptionIsDoneCell from "./CaseReceptionIsDoneCell.tsx";
import CaseReceptionReceptionTypeCell from "./CaseReceptionReceptionTypeCell.tsx";
import CaseReceptionContentsCell from "./CaseReceptionContentsCell.tsx";
import CaseReceptionReceivedAtCell from "./CaseReceptionReceivedAtCell.tsx";
import CaseReceptionDeadlineCell from "./CaseReceptionDeadlineCell.tsx";

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
      }: { receptions: CaseReceptionRowType[]; size: number } =
        res.data["data"];
      setCaseReceptions(
        receptions.map((item) => {
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
    <Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            상태
          </Box>
          {caseReceptions.map((item) => (
            <CaseReceptionIsDoneCell key={item.id} item={item} />
          ))}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            유형
          </Box>
          {caseReceptions.map((item) => (
            <CaseReceptionReceptionTypeCell key={item.id} item={item} />
          ))}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            내용
          </Box>
          {caseReceptions.map((item) => (
            <CaseReceptionContentsCell key={item.id} item={item} />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            접수일
          </Box>
          {caseReceptions.map((item) => (
            <CaseReceptionReceivedAtCell key={item.id} item={item} />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            마감일
          </Box>
          {caseReceptions.map((item) => (
            <CaseReceptionDeadlineCell key={item.id} item={item} />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            &nbsp;
          </Box>
          {caseReceptions.map((item) => (
            <Box key={item.id} sx={{ display: "flex" }}>
              <EditButton
                onClick={() => {
                  const idx = caseReceptions.findIndex(
                    (item2) => item2.id === item.id,
                  );
                  if (idx === -1) {
                    return;
                  }
                  setCaseReceptions([
                    ...caseReceptions.slice(0, idx),
                    {
                      ...caseReceptions[idx],
                      editable: true,
                    },
                    ...caseReceptions.slice(idx + 1),
                  ]);
                }}
              />
              <DeleteButton onClick={() => {}} />
            </Box>
          ))}
        </Box>
      </Box>

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
                }: { receptions: CaseReceptionRowType[]; size: number } =
                  res.data["data"];
                setCaseReceptions(
                  receptions.map((item) => {
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

export default CaseReceptionTable;
