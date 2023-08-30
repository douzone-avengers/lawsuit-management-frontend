import Box from "@mui/material/Box";
import UploadButton from "./print/UploadButton.tsx";

function ClosingInfo() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: "column",
        position: "relative",
      }}
    >
      <UploadButton />
    </Box>
  );
}

export default ClosingInfo;
