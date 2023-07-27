import CaseBasicInfo from "./CaseBasicInfo.tsx";
import Box from "@mui/material/Box";
import CaseReception from "./CaseReception.tsx";

function CaseBasicInfoTab() {
  return (
    <Box sx={{ display: "flex", gap: 2, height: 434 }}>
      <CaseBasicInfo />
      <CaseReception />
    </Box>
  );
}

export default CaseBasicInfoTab;
