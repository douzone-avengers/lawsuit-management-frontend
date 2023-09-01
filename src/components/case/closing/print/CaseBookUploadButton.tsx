import { useSetRecoilState } from "recoil";
import caseBookPDFUploadLoadingState from "../../../../states/case/info/closing/CaseBookPDFUploadLoadingState.tsx";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";

function CaseBookUploadButton() {
  const setUploadLoading = useSetRecoilState(caseBookPDFUploadLoadingState);

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

export default CaseBookUploadButton;
