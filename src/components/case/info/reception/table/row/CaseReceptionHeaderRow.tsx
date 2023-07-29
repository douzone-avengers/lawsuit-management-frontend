import Box from "@mui/material/Box";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import { useSetRecoilState } from "recoil";
import caseReceptionAddPopUpOpenState from "../../../../../../states/case/info/reception/CaseReceptionAddPopUpOpenState.tsx";

function CaseReceptionHeaderRow() {
  const setReceptionAddPopUpOpen = useSetRecoilState(
    caseReceptionAddPopUpOpenState,
  );

  const handleReceptionAddButtonClick = () => {
    setReceptionAddPopUpOpen(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          width: "15%",
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>상태</Box>
      </Box>
      <Box
        sx={{
          width: "15%",
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>유형</Box>
      </Box>
      <Box
        sx={{
          width: "15%",
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>내용</Box>
      </Box>
      <Box
        sx={{
          width: "15%",
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>접수일</Box>
      </Box>
      <Box
        sx={{
          width: "15%",
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>마감일</Box>
      </Box>
      <Box
        sx={{
          width: "25%",
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handleReceptionAddButtonClick}>
          <AddCircleIcon color="primary" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default CaseReceptionHeaderRow;
