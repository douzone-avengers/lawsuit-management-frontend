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
import CaseReceptionIsDoneCell from "./CaseReceptionIsDoneCell.tsx";
import CaseReceptionReceptionTypeCell from "./CaseReceptionReceptionTypeCell.tsx";
import CaseReceptionContentsCell from "./CaseReceptionContentsCell.tsx";
import CaseReceptionReceivedAtCell from "./CaseReceptionReceivedAtCell.tsx";
import CaseReceptionDeadlineCell from "./CaseReceptionDeadlineCell.tsx";
import CaseReceptionEditButton from "./CaseReceptionEditButton.tsx";
import CaseReceptionDeleteButton from "./CaseReceptionDeleteButton.tsx";
import TableHeader from "../common/TableHeader.tsx";
import Column from "../common/Column.tsx";
import Table from "../common/Table.tsx";
import CaseReceptionEditConfirmButton from "./CaseReceptionEditConfirmButton.tsx";

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
      }: { receptions: CaseReceptionRowType[]; size: number } =
        res.data["data"];
      setReceptions(
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
      <Table sx={{ gap: 1, margin: 1 }}>
        <Column>
          <TableHeader text="상태" />
          {receptions.map((item) => (
            <CaseReceptionIsDoneCell key={item.id} item={item} />
          ))}
        </Column>
        <Column>
          <TableHeader text="유형" />
          {receptions.map((item) => (
            <CaseReceptionReceptionTypeCell key={item.id} item={item} />
          ))}
        </Column>
        <Column>
          <TableHeader text="내용" />
          {receptions.map((item) => (
            <CaseReceptionContentsCell key={item.id} item={item} />
          ))}
        </Column>
        <Column>
          <TableHeader text="접수일" />
          {receptions.map((item) => (
            <CaseReceptionReceivedAtCell key={item.id} item={item} />
          ))}
        </Column>
        <Column>
          <TableHeader text="마감일" />
          {receptions.map((item) => (
            <CaseReceptionDeadlineCell key={item.id} item={item} />
          ))}
        </Column>
        <Column>
          <TableHeader text="&nbsp;" />
          {receptions.map((item) => (
            <Box key={item.id} sx={{ display: "flex" }}>
              {!item.editable ? (
                <CaseReceptionEditButton item={item} />
              ) : (
                <CaseReceptionEditConfirmButton item={item} />
              )}
              <CaseReceptionDeleteButton item={item} />
            </Box>
          ))}
        </Column>
      </Table>

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
                setReceptions(
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
                setReceptions(
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
