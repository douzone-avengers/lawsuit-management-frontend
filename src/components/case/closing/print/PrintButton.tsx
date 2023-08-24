import { useSetRecoilState } from "recoil";
import loadingState from "../../../../states/layout/LoadingState.tsx";
import PrintIcon from "@mui/icons-material/Print";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function PrintButton() {
  const setLoading = useSetRecoilState(loadingState);

  const handleClick = async () => {
    setLoading({
      text: "출력 준비 중",
      isLoading: true,
    });
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

export default PrintButton;
