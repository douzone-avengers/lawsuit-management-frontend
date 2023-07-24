import { useEffect, useState } from "react";
import request, { RequestSuccessHandler } from "../../lib/request.ts";
import { useRecoilValue } from "recoil";
import caseIdState from "../../states/case/CaseIdState.tsx";
import CaseBasicInfo, { CaseBasicInfoType } from "./CaseBasicInfo.tsx";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import useWindowSize from "../../hook/useWindowSize.ts";

function CaseBasicInfoTab() {
  const caseId = useRecoilValue(caseIdState);
  const [width, height] = useWindowSize();
  const [caseBasicInfo, setCaseBasicInfo] = useState<CaseBasicInfoType | null>(
    null,
  );

  console.log(width, height);

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
    <Box sx={{ display: "flex", gap: 2, height: height - 267 }}>
      <CaseBasicInfo info={caseBasicInfo} />
      <Card sx={{ width: "70%" }}></Card>
    </Box>
  );
}

export default CaseBasicInfoTab;
