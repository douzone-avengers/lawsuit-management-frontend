import { useSetRecoilState } from "recoil";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import PrintIcon from "@mui/icons-material/Print";
import caseBookPDFPrintLoadingState from "../../../../states/case/info/closing/CaseBookPDFPrintLoadingState.tsx";

function CaseBookPrintButton() {
  const setPrintLoading = useSetRecoilState(caseBookPDFPrintLoadingState);

  const handleClick = async () => {
    setPrintLoading("loading");
  };

  return (
    <Button
      sx={{ display: "flex", gap: 1 }}
      variant="contained"
      onClick={handleClick}
    >
      <Box sx={{ fontSize: 18 }}>출력</Box>
      <PrintIcon />
    </Button>
  );
}

export default CaseBookPrintButton;
