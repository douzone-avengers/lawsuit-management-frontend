import CaseReceptionSearchBox from "./info/reception/CaseReceptionSearchBox.tsx";
import Card from "@mui/material/Card";
import CaseReceptionTable from "./info/reception/CaseReceptionTable.tsx";
import { useRecoilValue } from "recoil";
import caseReceptionAddPopUpOpenState from "../../states/case/CaseReceptionAddPopUpOpenState.tsx";
import CaseReceptionAddPopUp from "./CaseReceptionAddPopUp.tsx";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import CaseReceptionAddPopUpOpenButton from "./CaseReceptionAddPopUpOpenButton.tsx";

function CaseReception() {
  const receptionAddPopUpOpen = useRecoilValue(caseReceptionAddPopUpOpenState);
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        paddingTop: 2,
        flexGrow: 1,
      }}
    >
      <CaseReceptionSearchBox />
      <Divider />
      <Box
        sx={{ display: "flex", flexGrow: 1, margin: "0 auto", width: "100%" }}
      >
        <CaseReceptionTable />
      </Box>
      <CaseReceptionAddPopUpOpenButton />
      {receptionAddPopUpOpen ? <CaseReceptionAddPopUp /> : null}
    </Card>
  );
}

export default CaseReception;
