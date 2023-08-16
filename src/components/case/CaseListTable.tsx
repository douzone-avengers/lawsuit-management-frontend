import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { delimiter } from "../../lib/convert.ts";
import { LawsuitInfo } from "./type/LawsuitInfo.tsx";

type Props = {
  cases: (LawsuitInfo & { onClick: () => void })[];
};

function CaseListTable({ cases }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">사건명</TableCell>
            <TableCell align="left">사건번호</TableCell>
            <TableCell align="left">사건상태</TableCell>
            <TableCell align="left">의뢰비</TableCell>
            <TableCell align="left">성공보수</TableCell>
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
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="left">{item.name}</TableCell>
              <TableCell align="left">{item.lawsuitNum}</TableCell>
              <TableCell align="left">{item.lawsuitStatus}</TableCell>
              <TableCell align="left">
                {delimiter(item.commissionFee)}
              </TableCell>
              <TableCell align="left">
                {delimiter(item.contingentFee)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CaseListTable;
