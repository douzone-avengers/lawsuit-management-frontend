import { useSetRecoilState } from "recoil";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import downPaymentPDFUploadLoadingState from "../../../../states/case/info/closing/DownPaymentPDFUploadLoadingState.tsx";

function DownPaymentUploadButton() {
  const setUploadLoading = useSetRecoilState(downPaymentPDFUploadLoadingState);

  const handleClick = async () => {
    setUploadLoading("loading");
  };

  return (
    <Button
      sx={{ display: "flex", gap: 1 }}
      variant="contained"
      onClick={handleClick}
    >
      <Box sx={{ fontSize: 18 }}>공유</Box>
      <EmailIcon />
    </Button>
  );
}

export default DownPaymentUploadButton;
