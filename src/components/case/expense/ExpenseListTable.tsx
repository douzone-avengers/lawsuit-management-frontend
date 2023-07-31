import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { SvgIcon } from "@mui/material";
import IconButton from "@mui/material/IconButton";

function ExpenseListTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ background: "#00aaf0" }}>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center" sx={{ color: "white", width: "20%" }}>
              <b>날짜</b>
            </TableCell>
            <TableCell align="center" sx={{ color: "white", width: "40%" }}>
              <b>내용</b>
            </TableCell>
            <TableCell align="center" sx={{ color: "white", width: "20%" }}>
              <b>금액</b>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow hover={true}>
            <TableCell align="center">1</TableCell>
            <TableCell align="center">2023-07-29</TableCell>
            <TableCell align="center">내용</TableCell>
            <TableCell align="center">200000</TableCell>
            <TableCell align="center">
              <IconButton>
                <SvgIcon component={ModeEditOutlineOutlinedIcon} />
              </IconButton>
              <IconButton>
                <SvgIcon component={DeleteForeverOutlinedIcon} />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExpenseListTable;
