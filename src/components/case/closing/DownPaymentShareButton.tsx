import { useSetRecoilState } from "recoil";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import downPaymentSharePopUpOpenState from "../../../states/case/info/closing/DownPaymentSharePopUpOpenState.ts";

function DownPaymentShareButton() {
  const setDownPaymentShareSelectPopUpOpen = useSetRecoilState(
    downPaymentSharePopUpOpenState,
  );

  const handleClick = async () => {
    setDownPaymentShareSelectPopUpOpen(true);
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

export default DownPaymentShareButton;
