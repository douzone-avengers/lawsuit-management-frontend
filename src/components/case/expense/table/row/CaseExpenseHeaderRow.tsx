import { useSetRecoilState } from "recoil";
import caseExpenseAddPopUpOpenState from "../../../../../states/case/info/expense/CaseExpenseAddPopUpOpenState.tsx";
import Box from "@mui/material/Box";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";

function CaseExpenseHeaderRow() {
  const setExpenseAddPopUpOpen = useSetRecoilState(
    caseExpenseAddPopUpOpenState,
  );

  const handleExpenseAddButtonClick = () => {
    setExpenseAddPopUpOpen(true);
  };

  return (
    <Box sx={{ display: "flex", background: "#2196f3", color: "white" }}>
      <Box
        sx={{
          width: "100%",
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <b>날짜</b>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <b>내용</b>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <b>금액</b>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handleExpenseAddButtonClick}>
          <AddCircleIcon color="primary" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default CaseExpenseHeaderRow;
