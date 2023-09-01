import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { delimiter } from "../../lib/convert.ts";
import { LawsuitInfo } from "./type/LawsuitInfo.tsx";
import { TableFooter, TablePagination, TableSortLabel } from "@mui/material";
import React from "react";
import { HeadCell } from "../employee/type/HeadCell.tsx";
import Card from "@mui/material/Card";
import CardTitle from "../common/CardTitle.tsx";

type Props = {
  cases: (LawsuitInfo & { onClick: () => void })[];
  count: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  sortKey: string;
  setSortKey: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: "desc" | "asc";
  setSortOrder: React.Dispatch<React.SetStateAction<"desc" | "asc">>;
};

function CaseListTable({
  cases,
  count,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  sortKey,
  setSortKey,
  sortOrder,
  setSortOrder,
}: Props) {
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
    {
      id: "number",
      label: "번호",
      canSort: false,
    },
    {
      id: "name",
      label: "사건명",
      canSort: true,
    },
    {
      id: "lawsuitNum",
      label: "사건번호",
      canSort: true,
    },
    {
      id: "lawsuitStatus",
      label: "사건상태",
      canSort: true,
    },
    {
      id: "commissionFee",
      label: "의뢰비",
      canSort: true,
    },
    {
      id: "contingentFee",
      label: "성공보수",
      canSort: true,
    },
    {
      id: "createdAt",
      label: "등록일",
      canSort: true,
    },
  ];

  return (
    <Card sx={{ marginBottom: 2, marginTop: 3 }}>
      <CardTitle text="사건 리스트" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) =>
                !headCell.canSort ? (
                  <TableCell key={headCell.id} align="center">
                    <b>{headCell.label}</b>
                  </TableCell>
                ) : (
                  <TableCell key={headCell.id} align="center">
                    <TableSortLabel
                      sx={{
                        align: "center",
                        marginLeft: "25px",
                      }}
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
          <TableBody>
            {cases.map((item, index) => (
              <TableRow
                key={item.id}
                hover={true}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
                onClick={item.onClick}
              >
                <TableCell align="center" component="th" scope="row">
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.lawsuitNum}</TableCell>
                <TableCell align="center">{item.lawsuitStatus}</TableCell>
                <TableCell align="center">
                  {delimiter(item.commissionFee)}
                </TableCell>
                <TableCell align="center">
                  {delimiter(item.contingentFee)}
                </TableCell>
                <TableCell align="center">
                  {item.createdAt.toString().substring(0, 10)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7} style={{ textAlign: "center" }}>
                <TablePagination
                  sx={{ display: "inline-flex", verticalAlign: "middle" }}
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={count}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default CaseListTable;
