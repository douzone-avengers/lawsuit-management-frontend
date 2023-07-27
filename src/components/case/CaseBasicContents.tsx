import { Hierarchy } from "../../states/common/UserState.tsx";
import { LawsuitData } from "../../mock/lawsuit/lawsuitTable.ts";
import { useRecoilValue } from "recoil";
import caseIdState from "../../states/case/CaseIdState.tsx";
import { useEffect, useState } from "react";
import request, { RequestSuccessHandler } from "../../lib/request.ts";
import Box from "@mui/material/Box";
import CaseClientAddPopUpOpenButton from "./CaseClientAddPopUpOpenButton.tsx";

type CaseBasicEmployee = { name: string; hierarchy: Hierarchy };
type CaseBasicClient = { name: string };
type CaseBasicInfoType = {
  lawsuit: LawsuitData;
  employees: CaseBasicEmployee[];
  clients: CaseBasicClient[];
};

function CaseBasicContents() {
  const caseId = useRecoilValue(caseIdState);
  const [caseBasicInfo, setCaseBasicInfo] = useState<CaseBasicInfoType | null>(
    null,
  );

  useEffect(() => {
    if (caseId === null) {
      return;
    }

    const handleSuccessHandler: RequestSuccessHandler = (res) => {
      setCaseBasicInfo(
        (
          res.data as {
            data: CaseBasicInfoType;
          }
        ).data,
      );
    };

    request("GET", `/lawsuits/${caseId}`, {
      onSuccess: handleSuccessHandler,
    });
  }, [caseId]);

  return caseBasicInfo !== null ? (
    <Box>
      <Box>
        [{caseBasicInfo.lawsuit?.lawsuitType}] [
        {caseBasicInfo.lawsuit?.lawsuitNum}] {caseBasicInfo.lawsuit?.name} (
        {caseBasicInfo.lawsuit?.court})
      </Box>
      <Box sx={{ display: "flex" }}>
        {caseBasicInfo.employees.map((item) => (
          <Box key={item.name}>{item.name}</Box>
        ))}
        <Box>({caseBasicInfo.employees.length}명)</Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        {caseBasicInfo.clients.map((item) => (
          <Box key={item.name}>{item.name}</Box>
        ))}
        <Box>({caseBasicInfo.clients.length}명)</Box>
        <CaseClientAddPopUpOpenButton />
      </Box>
    </Box>
  ) : null;
}

export default CaseBasicContents;
