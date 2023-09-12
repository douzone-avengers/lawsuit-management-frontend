import Card from "@mui/material/Card";
import CaseReceptionTable from "./table/CaseReceptionTable.tsx";
import CaseReceptionSearchBox from "./search/CaseReceptionSearchBox.tsx";
import Box from "@mui/material/Box";
import { useRecoilValue } from "recoil";
import CaseReceptionAddPopUp from "./table/popup/CaseReceptionAddPopUp.tsx";
import CardTitle from "../../common/CardTitle.tsx";
import caseReceptionAddPopUpOpenState from "../../../states/case/info/reception/CaseReceptionAddPopUpOpenState.tsx";

function CaseReceptionInfoCard() {
  const receptionAddPopUpOpen = useRecoilValue(caseReceptionAddPopUpOpenState);
  return (
    <>
      <Card sx={{ minWidth: 960 }}>
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
