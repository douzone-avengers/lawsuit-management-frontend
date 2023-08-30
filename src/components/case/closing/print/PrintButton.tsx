import { useSetRecoilState } from "recoil";
import printLoadingState from "../../../../states/layout/PrintLoadingState.tsx";
import PrintIcon from "@mui/icons-material/Print";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function PrintButton() {
  const setPrintLoading = useSetRecoilState(printLoadingState);

  const handleClick = async () => {
    setPrintLoading("loading");
  };

  return (
    <Button
      sx={{ display: "flex", gap: 1 }}
      variant="contained"
      onClick={handleClick}
    >
      <Box sx={{ fontSize: 18 }}>업로드</Box>
      <PrintIcon />
    </Button>
  );
}

export default PrintButton;
