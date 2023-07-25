import Card from "@mui/material/Card";
import CaseBasicInfoHeader from "./CaseBasicInfoHeader.tsx";
import CaseBasicContents from "./CaseBasicContents.tsx";

function CaseBasicInfo() {
  return (
    <Card
      sx={{ display: "flex", flexDirection: "column", gap: 2, flexGrow: 1 }}
    >
      <CaseBasicInfoHeader />
      <CaseBasicContents />
    </Card>
  );
}

export default CaseBasicInfo;
