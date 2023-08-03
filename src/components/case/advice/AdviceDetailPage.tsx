import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Advicedata } from "../../../mock/advice/adviceTable.ts";
import { ClientData } from "../../../mock/client/clientTable.ts";

type Props = {
  advices: Advicedata[];
  client: ClientData | null;
};

function AdviceDetailPage({ advices, client }: Props) {
  console.dir(client);

  return (
    <div>
      <div>{client?.name}</div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">상담 제목</TableCell>
              <TableCell align="left">상담 내용</TableCell>
              <TableCell align="left">상담 일시</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {advices?.map((item, index) => (
              <TableRow
                key={item.id}
                hover={true}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{item.title}</TableCell>
                <TableCell align="left">{item.contents}</TableCell>
                <TableCell align="left">
                  {new Date(item.date).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AdviceDetailPage;
