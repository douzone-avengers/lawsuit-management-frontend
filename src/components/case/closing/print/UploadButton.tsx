import { useSetRecoilState } from "recoil";
import printLoadingState from "../../../../states/layout/PrintLoadingState.tsx";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import UploadFileIcon from "@mui/icons-material/UploadFile";

function UploadButton() {
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
      <UploadFileIcon />
    </Button>
  );
}

export default UploadButton;
