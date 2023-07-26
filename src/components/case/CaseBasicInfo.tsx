import Card from "@mui/material/Card";
import CaseBasicInfoHeader from "./CaseBasicInfoHeader.tsx";
import CaseBasicInfoContent from "./CaseBasicContents.tsx";

function CaseBasicInfo() {
  return (
    <Card
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "50%" }}
    >
      <CaseBasicInfoHeader />
      <CaseBasicInfoContent />
    </Card>
  );
}

export default CaseBasicInfo;
