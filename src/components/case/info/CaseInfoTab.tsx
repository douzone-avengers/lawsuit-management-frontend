import Box from "@mui/material/Box";
import CaseBasicInfoCard from "./basic/CaseBasicInfoCard.tsx";
import CaseEmployeeInfoCard from "./employee/CaseEmployeeInfoCard.tsx";
import CaseClientInfoCard from "./client/CaseClientInfoCard.tsx";
import CaseCostInfoCard from "./cost/CaseCostInfoCard.tsx";
import CaseReceptionInfoCard from "./reception/CaseReceptionInfoCard.tsx";
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
      <Box sx={{ display: "flex", gap: 1 }}>
        <CaseBasicInfoCard />
        <CaseCostInfoCard />
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <CaseEmployeeInfoCard />
        <CaseClientInfoCard />
      </Box>
      <CaseReceptionInfoCard />
    </Box>
  );
}

export default CaseInfoTab;
