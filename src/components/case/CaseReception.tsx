import CaseReceptionHeader from "./CaseReceptionHeader.tsx";
import CaseReceptionSearchBox from "./CaseReceptionSearchBox.tsx";
import Card from "@mui/material/Card";
import CaseReceptionTable from "./CaseReceptionTable.tsx";

function CaseReception() {
  return (
    <Card
      sx={{ display: "flex", flexDirection: "column", gap: 2, flexGrow: 1 }}
    >
      <CaseReceptionHeader />
      <CaseReceptionSearchBox />
      <CaseReceptionTable />
    </Card>
  );
}

export default CaseReception;
