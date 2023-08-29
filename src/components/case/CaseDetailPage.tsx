import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Info from "./advice/Adviceinfo";
import TabBar, { TabItem } from "../common/TabBar";
import ExpenseInfoPage from "./expense/ExpenseInfoPage.tsx";
import Closing from "./closing/ClosingInfo.tsx";
import CaseReceptionTab from "./reception/CaseReceptionTab.tsx";
import CaseBasicInfoCard from "./common/CaseBasicInfoCard.tsx";
import CaseClientInfoCard from "./common/CaseClientInfoCard.tsx";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import caseTabIdState from "../../states/case/CaseTabIdState.tsx";
import caseIdState from "../../states/case/CaseIdState.tsx";
import caseInfoState, {
  CaseInfoType,
} from "../../states/case/info/caseInfoState.tsx";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../lib/requestDeprecated.ts";
import CaseEmployeeInfoCard from "./common/CaseEmployeeInfoCard.tsx";

function CaseDetailPage() {
  const [caseTabId, setCaseTabId] = useRecoilState(caseTabIdState);

  const [clientTab] = useState<TabItem[]>([
    {
      id: 0,
      name: "접수 정보",
      children: <CaseReceptionTab />,
    },
    {
      id: 1,
      name: "상담 정보",
      children: (
        <div>
          <Info></Info>
        </div>
      ),
    },
    {
      id: 2,
      name: "지출 정보",
      children: (
        <div>
          <ExpenseInfoPage />
        </div>
      ),
    },
    {
      id: 3,
      name: "종결",
      children: (
        <div>
          <Closing />
        </div>
      ),
    },
  ]);

  const caseId = useRecoilValue(caseIdState);
  const setCaseInfo = useSetRecoilState(caseInfoState);

  useEffect(() => {
    if (caseId === null) {
      return;
    }

    const handleSuccessHandler: RequestSuccessHandler = (res) => {
      const body: CaseInfoType = res.data;
      console.log(body);
      setCaseInfo(body);
    };

    requestDeprecated("GET", `/lawsuits/${caseId}/basic`, {
      onSuccess: handleSuccessHandler,
    });
  }, [caseId]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <CaseBasicInfoCard />
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <CaseEmployeeInfoCard />
        <CaseClientInfoCard />
      </Box>
      <TabBar items={clientTab} value={caseTabId} setValue={setCaseTabId} />
    </Box>
  );
}

export default CaseDetailPage;
