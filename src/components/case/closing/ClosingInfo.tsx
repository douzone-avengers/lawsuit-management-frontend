import Box from "@mui/material/Box";
import CaseBookShareButton from "./CaseBookShareButton.tsx";
import CaseBookPrintButton from "./CaseBookPrintButton.tsx";
import Card from "@mui/material/Card";
import DownPaymentShareButton from "./DownPaymentShareButton.tsx";
import DownPaymentPrintButton from "./DownPaymentPrintButton.tsx";

function ClosingInfo() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Card>
        <Box
          sx={{
            margin: "10px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>사건집</Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CaseBookPrintButton />
            <CaseBookShareButton />
          </Box>
        </Box>
      </Card>
      <Card>
        <Box
          sx={{
            margin: "10px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>청구서</Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <DownPaymentPrintButton />
            <DownPaymentShareButton />
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default ClosingInfo;
