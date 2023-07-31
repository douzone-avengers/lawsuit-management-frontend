import Card from "@mui/material/Card";
import CardTitle from "../common/CardTitle.tsx";
import CaseReceptionTable from "./table/CaseReceptionTable.tsx";
import CaseReceptionSearchBox from "./search/CaseReceptionSearchBox.tsx";
import Box from "@mui/material/Box";
import { useRecoilValue } from "recoil";
import caseReceptionAddPopUpOpenState from "../../../../states/case/info/reception/CaseReceptionAddPopUpOpenState.tsx";
import CaseReceptionAddPopUp from "./table/popup/CaseReceptionAddPopUp.tsx";

function CaseReceptionInfoCard() {
  const receptionAddPopUpOpen = useRecoilValue(caseReceptionAddPopUpOpenState);
  return (
    <>
      <Card>
        <CardTitle text="접수" />
        <Box sx={{ marginTop: 2 }}>
          <CaseReceptionSearchBox />
          <CaseReceptionTable />
        </Box>
      </Card>
      {receptionAddPopUpOpen ? <CaseReceptionAddPopUp /> : null}
    </>
  );
}

export default CaseReceptionInfoCard;
