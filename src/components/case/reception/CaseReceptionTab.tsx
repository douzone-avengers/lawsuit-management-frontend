import Box from "@mui/material/Box";
import CaseReceptionInfoCard from "./CaseReceptionInfoCard.tsx";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import caseInfoState, {
  CaseInfoType,
} from "../../../states/case/info/caseInfoState.tsx";
import request, { RequestSuccessHandler } from "../../../lib/request.ts";

function CaseReceptionTab() {
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
      <CaseReceptionInfoCard />
    </Box>
  );
}

export default CaseReceptionTab;
