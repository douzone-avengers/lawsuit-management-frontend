import { useEffect, useState } from "react";
import request, { RequestSuccessHandler } from "../../lib/request.ts";
import { useRecoilValue } from "recoil";
import caseIdState from "../../states/case/CaseIdState.tsx";
import CaseBasicInfo, { CaseBasicInfoType } from "./CaseBasicInfo.tsx";

function CaseBasicInfoTab() {
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

  return (
    <>
      <CaseBasicInfo info={caseBasicInfo} />
    </>
  );
}

export default CaseBasicInfoTab;
