import { fromHierarchy } from "../../lib/convert.ts";
import { Hierarchy } from "../../states/common/UserState.tsx";
import { LawsuitData } from "../../mock/lawsuit/lawsuitTable.ts";
import Card from "@mui/material/Card";
import { useRecoilValue } from "recoil";
import caseIdState from "../../states/case/CaseIdState.tsx";
import { useEffect, useState } from "react";
import request, { RequestSuccessHandler } from "../../lib/request.ts";

type CaseBasicEmployee = { name: string; hierarchy: Hierarchy };
type CaseBasicClient = { name: string };
type CaseBasicInfoType = {
  lawsuit: LawsuitData;
  employees: CaseBasicEmployee[];
  clients: CaseBasicClient[];
};

function CaseBasicInfo() {
  const caseId = useRecoilValue(caseIdState);
  const [caseBasicInfo, setCaseBasicInfo] = useState<CaseBasicInfoType | null>(
    null,
  );

  useEffect(() => {
    if (caseId === null) {
      return;
    }

    const handleSuccessHandler: RequestSuccessHandler = async (res) => {
      setCaseBasicInfo(
        (
          (await res.data) as {
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
    <Card sx={{ flexGrow: 1 }}>
      <div>
        <div>lawsuit</div>
        <div>{caseBasicInfo.lawsuit?.name}</div>
        <div>{caseBasicInfo.lawsuit?.lawsuitNum}</div>
        <div>{caseBasicInfo.lawsuit?.lawsuitType}</div>
        <div>{caseBasicInfo.lawsuit?.court}</div>
      </div>
      <div>
        <div>employees</div>
        {caseBasicInfo.employees.map((item) => (
          <div key={item.name}>
            <div>{item.name}</div>
            <div>{fromHierarchy(item.hierarchy)}</div>
          </div>
        ))}
      </div>
      <div>
        <div>clients</div>
        {caseBasicInfo.clients.map((item) => (
          <div key={item.name}>
            <div>{item.name}</div>
          </div>
        ))}
      </div>
    </Card>
  ) : null;
}

export default CaseBasicInfo;
