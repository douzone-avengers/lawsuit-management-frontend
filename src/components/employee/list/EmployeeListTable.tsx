import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Card, TableFooter, TablePagination } from "@mui/material";
import { Hierarchy, MemberInfo, Role } from "../type/MemberInfo";
import CardTitle from "../../common/CardTitle";
import React from "react";

type Props = {
  memberInfos: (MemberInfo & { onClick: () => void })[];
  hierarchyList: Hierarchy[];
  roleList: Role[];
  count: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
};

function EmployeeListTable({
  memberInfos,
  hierarchyList,
  roleList,
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
    <Card sx={{ marginBottom: 3, marginTop: 5 }}>
      <CardTitle text="사원 리스트" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">번호</TableCell>
              <TableCell align="left">이름</TableCell>
              <TableCell align="left">직급</TableCell>
              <TableCell align="left">권한</TableCell>
              <TableCell align="left">전화번호</TableCell>
              <TableCell align="left">이메일</TableCell>
              <TableCell align="left">가입일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {memberInfos.map((item, index) => (
              <TableRow
                key={item.id}
                hover={true}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
                onClick={item.onClick}
              >
                <TableCell align="left" component="th" scope="row">
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell align="left">{item.name}</TableCell>
                <TableCell align="left">
                  {
                    hierarchyList.filter((it) => it.id === item.hierarchyId)[0]
                      .nameKr
                  }
                </TableCell>
                <TableCell align="left">
                  {roleList.filter((it) => it.id === item.roleId)[0].nameKr}
                </TableCell>
                <TableCell align="left">{item.phone}</TableCell>
                <TableCell align="left">{item.email}</TableCell>
                <TableCell align="left">{item.createdAt}</TableCell>
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

export default EmployeeListTable;
