import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button, Divider, useTheme } from "@mui/material";
import CaseReceptionDataRow from "./row/CaseReceptionDataRow.tsx";
import CaseReceptionHeaderRow from "./row/CaseReceptionHeaderRow.tsx";
import caseIdState from "../../../../states/case/CaseIdState.tsx";
import caseReceptionsState, {
  CaseReceptionRowType,
} from "../../../../states/case/info/reception/CaseReceptionsState.tsx";
import caseReceptionPageState from "../../../../states/case/info/reception/CaseReceptionPageState.tsx";
import caseReceptionSizeState from "../../../../states/case/info/reception/CaseReceptionSizeState.tsx";
import { caseReceptionSearchUrlState } from "../../../../states/case/info/reception/CaseReceptionSearchState.tsx";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../../lib/requestDeprecated.ts";

export function updateUrl(url: string, newPage: number): string {
  return url.replace(/(page=)\d+/, `$1${newPage}`);
}

function CaseReceptionTable() {
  const theme = useTheme();
  const caseId = useRecoilValue(caseIdState);
  const [receptions, setReceptions] = useRecoilState(caseReceptionsState);
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
      }: { receptions: CaseReceptionRowType[]; size: number } = res.data;
      setReceptions(
        receptions.map((item) => {
          return { ...item, editable: false };
        }),
      );
      setSize(size);
    };
    requestDeprecated("GET", url, {
      onSuccess: handleRequestSuccess,
    });
  }, [caseId]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Box sx={{ marginBottom: 2 }}></Box>
      <Divider />
      <CaseReceptionHeaderRow />
      <Divider />
      <div style={{ minHeight: 200 }}>
        {receptions.length > 0 ? (
          receptions.map((item) => (
            <CaseReceptionDataRow key={item.id} item={item} />
          ))
        ) : (
          <Box
            sx={{
              width: "100%",
              minHeight: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            접수가 존재하지 않습니다.
          </Box>
        )}
      </div>

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
                  res.data;
                setReceptions(
                  receptions.map((item) => {
                    return { ...item, editable: false };
                  }),
                );
                setSize(size);
              };

              requestDeprecated("GET", updateUrl(url, page), {
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
                  res.data;
                setReceptions(
                  receptions.map((item) => {
                    return { ...item, editable: false };
                  }),
                );
                setSize(size);
              };

              requestDeprecated("GET", updateUrl(url, page), {
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
