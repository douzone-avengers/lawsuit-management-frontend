import Card from "@mui/material/Card";
import CardTitle from "../common/CardTitle.tsx";
import CaseReceptionTable from "./CaseReceptionTable.tsx";
import CaseReceptionSearchBox from "./CaseReceptionSearchBox.tsx";
import Box from "@mui/material/Box";

function CaseReceptionCard() {
  return (
    <Card>
      <CardTitle text="접수" />
      <Box sx={{ marginTop: 2 }}>
        <CaseReceptionSearchBox />
        <CaseReceptionTable />
      </Box>
    </Card>
  );
}

export default CaseReceptionCard;
