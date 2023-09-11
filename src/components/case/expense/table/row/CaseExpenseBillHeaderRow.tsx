import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import { Button } from "@mui/material";
import { useRecoilValue } from "recoil";
import { isEmployeeState } from "../../../../../states/user/UserState.ts";

function CaseExpenseBillHeaderRow() {
  const isEmployee = useRecoilValue(isEmployeeState);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box
        sx={{
          width: 200,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <TableCell
          sx={{
            minWidth: 150,
            fontSize: 16,
            padding: 0,
            borderBottom: "none",
          }}
          align="center"
        >
          <b>지출 증빙자료</b>
        </TableCell>
      </Box>
      {isEmployee && (
        <Box
          sx={{
            width: 150,
            minWidth: 150,
            height: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{ width: "100%", color: "secondary", fontSize: 16 }}
          >
            등록
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default CaseExpenseBillHeaderRow;
