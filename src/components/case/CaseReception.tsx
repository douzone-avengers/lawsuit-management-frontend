import CaseReceptionHeader from "./CaseReceptionHeader.tsx";
import CaseReceptionSearchBox from "./CaseReceptionSearchBox.tsx";
import Card from "@mui/material/Card";
import CaseReceptionTable from "./CaseReceptionTable.tsx";
import { Divider } from "@mui/material";
import { useRecoilValue } from "recoil";
import caseReceptionAddPopUpOpenState from "../../states/case/CaseReceptionAddPopUpOpenState.tsx";
import CaseReceptionAddPopUp from "./CaseReceptionAddPopUp.tsx";
import CaseReceptionAddPopUpOpenButton from "./CaseReceptionAddPopUpOpenButton.tsx";

function CaseReception() {
  const receptionAddPopUpOpen = useRecoilValue(caseReceptionAddPopUpOpenState);
  return (
    <Card
      sx={{ display: "flex", flexDirection: "column", gap: 2, flexGrow: 1 }}
    >
      <CaseReceptionHeader />
      <CaseReceptionSearchBox />
      <Divider />
      <CaseReceptionTable />
      <CaseReceptionAddPopUpOpenButton />
      {receptionAddPopUpOpen ? <CaseReceptionAddPopUp /> : null}
    </Card>
  );
}

export default CaseReception;
