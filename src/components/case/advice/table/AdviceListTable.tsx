import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Advicedata } from "../../../../type/ResponseType.ts";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import requestDeprecated, {
  RequestFailHandler,
} from "../../../../lib/requestDeprecated.ts";
import AdviceEditPopUpButton from "./button/AdviceEditPopUpButton.tsx";
import { IdNameType } from "../../../../states/advice/adviceInfoState.tsx";
import AdviceDeletePopUpButton from "./button/AdviceDeletePopUpButton.tsx";
import { useRecoilValue } from "recoil";
import { isEmployeeState } from "../../../../states/user/UserState.ts";
import Box from "@mui/material/Box";
import { HeadCell } from "../../type/HeadCell.tsx";
import {
  CircularProgress,
  TableFooter,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import TextField from "@mui/material/TextField";

export type DetailAdviceType = {
  adviceId: number;
  title: string;
  contents: string;
  advicedAt: string;
  members: IdNameType[];
  clients: IdNameType[];
};

type Props = {
  advices: Advicedata[];
  count: number;
  curPage: number;
  setCurPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  sortKey: string;
  setSortKey: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: "desc" | "asc";
  setSortOrder: React.Dispatch<React.SetStateAction<"desc" | "asc">>;
};

function AdviceListTable({
  advices,
  count,
  curPage,
  setCurPage,
  rowsPerPage,
  setRowsPerPage,
  sortKey,
  setSortKey,
  sortOrder,
  setSortOrder,
}: Props) {
  const handleChangePage = (_event: unknown, newCurPage: number) => {
    setCurPage(newCurPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setCurPage(0);
  };

  const sortHandler = (targetSortKey: string) => {
    if (sortKey === targetSortKey) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
      return;
    }
    setSortKey(targetSortKey);
    setSortOrder("asc");
  };

  const headCells: HeadCell[] = [
    { id: "expandedRow", label: "", canSort: false, width: "9%" },
    { id: "title", label: "상담 제목", canSort: true, width: "27%" },
    { id: "contents", label: "상담 내용", canSort: false, width: "27%" },
    { id: "adviced_at", label: "상담 일시", canSort: true, width: "27%" },
    { id: "Button", label: " ", canSort: false, width: "10%" },
  ];

  const isEmployee = useRecoilValue(isEmployeeState);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const maxContentLength = 20;
  const [advice, setAdvice] = useState<DetailAdviceType | null>();
  const [isLoading, setIsLoading] = useState(false);
  const trimContent = (content: string) => {
    if (content.length <= maxContentLength) {
      return content;
    } else {
      return content.slice(0, maxContentLength) + " ...";
    }
  };
  const adviceRequest = (adviceId: number) => {
    const handelRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };
    requestDeprecated("GET", `/advices/${adviceId}`, {
      withToken: true,
      onSuccess: (res) => {
        const body: DetailAdviceType = res.data;
        setAdvice(body);
        setIsLoading(true);
      },
      onFail: handelRequestFail,
    });
  };

  const handleExpandClick = (index: number) => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setIsLoading(false);
      setExpandedRow(index);
      adviceRequest(advices[index].id);
    }
  };
  const handleButtonClick = (e: any) => {
    e.stopPropagation(); // 이벤트 버블링을 막음

    setExpandedRow(null);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headCells.map((headCell) =>
              !headCell.canSort ? (
                <TableCell align="left" style={{ width: headCell.width }}>
                  <b>{headCell.label}</b>
                </TableCell>
              ) : (
                <TableCell align="left" style={{ width: headCell.width }}>
                  <TableSortLabel
                    active={sortKey === headCell.id}
                    direction={sortKey === headCell.id ? sortOrder : "asc"}
                    onClick={() => {
                      sortHandler(headCell.id);
                    }}
                  >
                    <b>{headCell.label}</b>
                  </TableSortLabel>
                </TableCell>
              ),
            )}
          </TableRow>
        </TableHead>
        {advices.length > 0 ? (
          <TableBody>
            {advices.map((item, index) => (
              <>
                <TableRow
                  key={item.id}
                  hover={true}
                  onClick={() => {
                    handleExpandClick(index);
                  }}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                    backgroundColor:
                      expandedRow === index ? "grey.300" : "inherit",
                  }}
                >
                  <TableCell style={{ maxWidth: "9%", minWidth: "9%" }}>
                    <IconButton>
                      {expandedRow === index ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell align="left">{trimContent(item.title)}</TableCell>
                  <TableCell align="left">
                    {trimContent(item.contents)}
                  </TableCell>
                  <TableCell align="left">
                    {new Date(item.advicedAt).toLocaleDateString()}
                  </TableCell>
                  {isEmployee && (
                    <TableCell align="center">
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <AdviceEditPopUpButton
                          curAdviceId={item.id}
                          onClick={handleButtonClick}
                        />
                        <AdviceDeletePopUpButton curAdviceId={item.id} />
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
                {expandedRow === index && (
                  <TableRow>
                    {isLoading ? (
                      <TableCell colSpan={4}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "10px 30px 10px 30px",
                          }}
                        >
                          <TextField
                            style={{ margin: "10px 0" }}
                            label="상담 제목"
                            value={advice?.title}
                            InputProps={{
                              readOnly: true,
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          <TextField
                            style={{ margin: "10px 0" }}
                            label="상담 날짜"
                            value={advice?.advicedAt.split(" ")[0]}
                            InputProps={{
                              readOnly: true,
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          {advice && (
                            <TextField
                              style={{ margin: "10px 0" }}
                              label="상담관"
                              value={advice.members
                                .map((item) => item.name)
                                .join(", ")}
                              InputProps={{
                                readOnly: true,
                              }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          )}
                          {advice && (
                            <TextField
                              style={{ margin: "10px 0" }}
                              label="상담자"
                              value={advice.clients
                                .map((item) => item.name)
                                .join(", ")}
                              InputProps={{
                                readOnly: true,
                              }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          )}
                          <TextField
                            style={{ margin: "10px 0" }}
                            label="상담 내용"
                            value={advice?.contents}
                            InputProps={{
                              readOnly: true,
                            }}
                            multiline
                            rows={4}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </div>
                      </TableCell>
                    ) : (
                      <CircularProgress />
                    )}
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <TableCell align="center" component="th" scope="row" colSpan={7}>
              <br />
              상담이 없습니다. 상담을 등록해주세요.
              <br />
              <br />
            </TableCell>
          </TableBody>
        )}
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} style={{ textAlign: "center" }}>
              <TablePagination
                sx={{ display: "inline-flex", verticalAlign: "middle" }}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={count}
                page={curPage}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default AdviceListTable;
