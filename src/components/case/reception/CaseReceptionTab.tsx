import Box from "@mui/material/Box";
import CaseReceptionInfoCard from "./CaseReceptionInfoCard.tsx";

function CaseReceptionTab() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <CaseReceptionInfoCard />
    </Box>
  );
}

export default CaseReceptionTab;
