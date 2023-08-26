import { useSetRecoilState } from "recoil";
import caseExpenseAddPopUpOpenState from "../../../../../states/case/info/expense/CaseExpenseAddPopUpOpenState.tsx";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

function CaseExpenseHeaderRow() {
  const setExpenseAddPopUpOpen = useSetRecoilState(
    caseExpenseAddPopUpOpenState,
  );

  const handleExpenseAddButtonClick = () => {
    setExpenseAddPopUpOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: 200,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <b>지출일</b>
      </Box>
      <Box
        sx={{
          width: 900,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <b>내용</b>
      </Box>
      <Box
        sx={{
          width: 200,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <b>금액</b>
      </Box>
      <Box
        sx={{
          width: 200,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{ width: 185, color: "secondary" }}
          onClick={handleExpenseAddButtonClick}
        >
          등록
        </Button>
      </Box>
    </Box>
  );
}

export default CaseExpenseHeaderRow;
