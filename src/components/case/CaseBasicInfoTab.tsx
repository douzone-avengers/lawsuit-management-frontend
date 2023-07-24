import CaseBasicInfo from "./CaseBasicInfo.tsx";
import Box from "@mui/material/Box";
import CaseReception from "./CaseReception.tsx";

function CaseBasicInfoTab() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <CaseBasicInfo />
      <CaseReception />
    </Box>
  );
}

export default CaseBasicInfoTab;
