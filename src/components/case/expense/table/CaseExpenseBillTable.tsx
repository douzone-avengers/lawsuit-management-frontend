import Box from "@mui/material/Box";
import { Divider, useTheme } from "@mui/material";
import CaseExpenseBillHeaderRow from "./row/CaseExpenseBillHeaderRow.tsx";
import { useRecoilState, useRecoilValue } from "recoil";
import CaseExpenseBillDataRow from "./row/CaseExpenseBillDataRow.tsx";
import caseExpenseBillIdState from "../../../../states/case/info/expense/CaseExpenseBillIdState.tsx";
import Button from "@mui/material/Button";
import caseExpenseBillState from "../../../../states/case/info/expense/CaseExpenseBIllRowType.tsx";

function CaseExpenseBillTable() {
  const theme = useTheme();
  const [expenseBill, setExpenseBill] = useRecoilState(caseExpenseBillState);
  const expenseBillId = useRecoilValue(caseExpenseBillIdState);

  return (
    <Box
      sx={{
        display: "flex",
        width: "30%",
        height: "326.87px",
        flexDirection: "column",
      }}
    >
      <Box sx={{ marginBottom: 2 }}></Box>
      <Divider />
      <CaseExpenseBillHeaderRow />
      <Divider />
      {expenseBill.length > 0 ? (
        expenseBill.map((item) => (
          <CaseExpenseBillDataRow
            key={item.id}
            item={item}
            expenseBillId={expenseBillId}
          />
        ))
      ) : (
        <Box
          sx={{
            width: "100%",
            height: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          자료가 없습니다.
        </Box>
      )}
      <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button>prev</Button>
        <Button disabled>
          <Box sx={{ color: theme.palette.primary.main }}></Box>
        </Button>
        <Button>next</Button>
      </Box>
      <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
    </Box>
  );
}

export default CaseExpenseBillTable;
