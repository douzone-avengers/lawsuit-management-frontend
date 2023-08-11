import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Stack } from "@mui/material";
import { LawsuitInfo } from "../type/LawsuitInfo.tsx";

type Props = {
  lawsuits: (LawsuitInfo & { onClick: () => void })[];
};

function ClosingTable({ lawsuits }: Props) {
  const [temp, setTemp] = useState(0);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">사건명</TableCell>
            <TableCell align="left">사건 번호</TableCell>
            <TableCell align="left">사건 종류</TableCell>
            <TableCell align="left">판결</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lawsuits.map((item, index) => (
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
              <TableCell align="left">{item.lawsuitType}</TableCell>
              <TableCell align="left">
                <ButtonGroup variant="outlined" size="large">
                  <Button
                    variant={temp === 0 ? "contained" : "outlined"}
                    onClick={() => {
                      setTemp(0);
                    }}
                  >
                    원고 승
                  </Button>
                  <Button
                    variant={temp === 1 ? "contained" : "outlined"}
                    onClick={() => {
                      setTemp(1);
                    }}
                  >
                    원고 패
                  </Button>
                </ButtonGroup>
              </TableCell>
              <TableCell align="left">
                <Stack>
                  <Button variant="contained" endIcon={<SendIcon />}>
                    종결
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ClosingTable;
