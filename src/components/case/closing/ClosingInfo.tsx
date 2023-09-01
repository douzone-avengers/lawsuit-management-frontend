import Box from "@mui/material/Box";
import CaseBookUploadButton from "./print/CaseBookUploadButton.tsx";
import CaseBookPrintButton from "./print/CaseBookPrintButton.tsx";
import Card from "@mui/material/Card";
import DownPaymentUploadButton from "./print/DownPaymentUploadButton.tsx";
import DownPaymentPrintButton from "./print/DownPaymentPrintButton.tsx";

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
            <CaseBookUploadButton />
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
            <DownPaymentUploadButton />
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default ClosingInfo;
