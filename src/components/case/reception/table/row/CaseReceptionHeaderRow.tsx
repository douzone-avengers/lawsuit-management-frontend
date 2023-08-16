import Box from "@mui/material/Box";
import { useSetRecoilState } from "recoil";
import caseReceptionAddPopUpOpenState from "../../../../../states/case/info/reception/CaseReceptionAddPopUpOpenState.tsx";
import Button from "@mui/material/Button";

function CaseReceptionHeaderRow() {
  const setReceptionAddPopUpOpen = useSetRecoilState(
    caseReceptionAddPopUpOpenState,
  );

  const handleReceptionAddButtonClick = () => {
    setReceptionAddPopUpOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <Box sx={{ width: 20 }}></Box>
      <Box
        sx={{
          width: 100,
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
          width: 100,
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
          flexGrow: 1,
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
          width: 150,
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
          width: 150,
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
          width: 200,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          sx={{ width: 185 }}
          variant="outlined"
          onClick={handleReceptionAddButtonClick}
        >
          등록
        </Button>
      </Box>
    </Box>
  );
}

export default CaseReceptionHeaderRow;
