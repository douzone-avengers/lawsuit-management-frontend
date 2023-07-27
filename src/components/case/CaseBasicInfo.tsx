import Card from "@mui/material/Card";
import CaseBasicInfoHeader from "./CaseBasicInfoHeader.tsx";
import CaseBasicInfoContent from "./CaseBasicContents.tsx";
import { useRecoilValue } from "recoil";
import caseClientAddPopUpOpenState from "../../states/case/CaseClientAddPopUpOpenState.tsx";
import CaseClientAddPopUp from "./CaseClientAddPopUp.tsx";

function CaseBasicInfo() {
  const caseClientAdd = useRecoilValue(caseClientAddPopUpOpenState);
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "50%",
        alignItems: "flex-start",
      }}
    >
      <CaseBasicInfoHeader />
      <CaseBasicInfoContent />
      {caseClientAdd ? <CaseClientAddPopUp /> : null}
    </Card>
  );
}

export default CaseBasicInfo;
