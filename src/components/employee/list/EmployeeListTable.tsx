import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Card,
  TableFooter,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import CardTitle from "../../common/CardTitle";
import React from "react";
import { HeadCell } from "../type/HeadCell";
import { MemberInfo } from "../type/MemberInfo";
import { Hierarchy } from "../../../states/data/hierarchyListState";
import { Role } from "../../../states/data/roleListState";

type Props = {
  memberInfos: (MemberInfo & { onClick: () => void })[];
  hierarchyList: Hierarchy[];
  roleList: Role[];
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

function EmployeeListTable({
  memberInfos,
  hierarchyList,
  roleList,
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
      label: "이름",
      canSort: true,
    },
    {
      id: "hierarchy",
      label: "직급",
      canSort: true,
    },
    {
      id: "role",
      label: "권한",
      canSort: true,
    },
    {
      id: "phone",
      label: "전화번호",
      canSort: true,
    },
    {
      id: "email",
      label: "이메일",
      canSort: true,
    },
    {
      id: "createdAt",
      label: "가입일",
      canSort: true,
    },
  ];

  const hierarchyMap: { [key: number]: Hierarchy } = {};
  hierarchyList.forEach((item) => {
    hierarchyMap[item.id] = item;
  });

  const roleMap: { [key: number]: Role } = {};
  roleList.forEach((item) => {
    roleMap[item.id] = item;
  });

  return (
    <Card sx={{ marginBottom: 2, marginTop: 3 }}>
      <CardTitle text="사원 리스트" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) =>
                !headCell.canSort ? (
                  <TableCell align="left">{headCell.label}</TableCell>
                ) : (
                  <TableCell align="left">
                    <TableSortLabel
                      active={sortKey === headCell.id}
                      direction={sortKey === headCell.id ? sortOrder : "asc"}
                      onClick={() => {
                        sortHandler(headCell.id);
                      }}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ),
              )}
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
                  {hierarchyMap[item.hierarchyId].nameKr}
                </TableCell>
                <TableCell align="left">
                  {roleMap[item.roleId].nameKr}
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
