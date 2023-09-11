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
    { id: "number", label: "번호", canSort: false, width: "5%" },
    { id: "name", label: "이름", canSort: true, width: "15%" },
    { id: "hierarchy", label: "직급", canSort: true, width: "15%" },
    { id: "role", label: "권한", canSort: true, width: "15%" },
    { id: "phone", label: "전화번호", canSort: true, width: "20%" },
    { id: "email", label: "이메일", canSort: true, width: "20%" },
    { id: "createdAt", label: "가입일", canSort: true, width: "10%" },
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
                <TableCell
                  align="left"
                  component="th"
                  scope="row"
                  style={{ width: headCells[0].width }}
                >
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell align="left" style={{ width: headCells[1].width }}>
                  {item.name}
                </TableCell>
                <TableCell align="left" style={{ width: headCells[2].width }}>
                  {hierarchyMap[item.hierarchyId]?.nameKr ?? "N/A"}
                </TableCell>
                <TableCell align="left" style={{ width: headCells[3].width }}>
                  {roleMap[item.roleId]?.nameKr ?? "N/A"}
                </TableCell>

                <TableCell align="left" style={{ width: headCells[4].width }}>
                  {item.phone}
                </TableCell>
                <TableCell align="left" style={{ width: headCells[5].width }}>
                  {item.email}
                </TableCell>
                <TableCell align="left" style={{ width: headCells[6].width }}>
                  {item.createdAt}
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

export default EmployeeListTable;
