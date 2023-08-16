import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { delimiter } from "../../lib/convert.ts";
import { LawsuitInfo } from "./type/LawsuitInfo.tsx";
import { TableFooter, TablePagination } from "@mui/material";
import React from "react";

type Props = {
  cases: (LawsuitInfo & { onClick: () => void })[];
  count: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
};

function CaseListTable({
  cases,
  count,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ background: "#2196f3" }}>
          <TableRow>
            <TableCell sx={{ color: "white" }} align="center">
              <b>번호</b>
            </TableCell>
            <TableCell sx={{ color: "white" }} align="center">
              <b>사건명</b>
            </TableCell>
            <TableCell sx={{ color: "white" }} align="center">
              <b>사건번호</b>
            </TableCell>
            <TableCell sx={{ color: "white" }} align="center">
              <b>사건상태</b>
            </TableCell>
            <TableCell sx={{ color: "white" }} align="center">
              <b>의뢰비</b>
            </TableCell>
            <TableCell sx={{ color: "white" }} align="center">
              <b>성공보수</b>
            </TableCell>
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
  );
}

export default CaseListTable;
