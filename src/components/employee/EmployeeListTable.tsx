import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { MemberInfo } from "../../mock/member/memberHandlers";

type Props = {
  memberInfos: (MemberInfo & { onClick: () => void })[];
};

function CaseListTable({ memberInfos }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">이름</TableCell>
            <TableCell align="left">역할</TableCell>
            <TableCell align="left">직책</TableCell>
            <TableCell align="left">전화번호</TableCell>
            <TableCell align="left">이메일</TableCell>
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
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="left">{item.name}</TableCell>
              <TableCell align="left">{item.role}</TableCell>
              <TableCell align="left">{item.hierarchy}</TableCell>
              <TableCell align="left">{item.phone}</TableCell>
              <TableCell align="left">{item.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CaseListTable;
