import Box from "@mui/material/Box";
import CaseInfoCard from "./basic/CaseInfoCard.tsx";
import CaseEmployeeCard from "./basic/CaseEmployeeCard.tsx";
import CaseClientCard from "./basic/CaseClientCard.tsx";
import CaseCostCard from "./basic/CaseCostCard.tsx";
import CaseReceptionCard from "./reception/CaseReceptionCard.tsx";
import { useRecoilValue, useSetRecoilState } from "recoil";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import { useEffect } from "react";
import request, { RequestSuccessHandler } from "../../../lib/request.ts";
import caseInfoState, {
  CaseInfoType,
} from "../../../states/case/info/caseInfoState.tsx";

function CaseInfoTab() {
  const caseId = useRecoilValue(caseIdState);
  const setCaseInfo = useSetRecoilState(caseInfoState);

  useEffect(() => {
    if (caseId === null) {
      return;
    }

    const handleSuccessHandler: RequestSuccessHandler = (res) => {
      const newCaseInfo: CaseInfoType = res.data["data"];
      setCaseInfo(newCaseInfo);
    };

    request("GET", `/lawsuits/${caseId}`, {
      onSuccess: handleSuccessHandler,
    });
  }, [caseId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <CaseInfoCard />
      <CaseEmployeeCard />
      <CaseClientCard />
      <CaseCostCard />
      <CaseReceptionCard />
    </Box>
  );
}

export default CaseInfoTab;
