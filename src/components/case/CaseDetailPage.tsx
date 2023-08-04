import { Box } from "@mui/material";
import { useState } from "react";
import Info from "./advice/Adviceinfo";
import TabBar, { TabItem } from "../common/TabBar";
import ExpenseInfo from "./expense/ExpenseInfo.tsx";
import Closing from "./closing/ClosingInfo.tsx";
import CaseReceptionTab from "./reception/CaseReceptionTab.tsx";
import CaseBasicInfoCard from "./common/CaseBasicInfoCard.tsx";
import CaseCostInfoCard from "./common/CaseCostInfoCard.tsx";
import CaseEmployeeInfoCard from "./common/CaseEmployeeInfoCard.tsx";
import CaseClientInfoCard from "./common/CaseClientInfoCard.tsx";

function CaseDetailPage() {
  const [caseTabId, setCaseTabId] = useState(0);

  const [clientTab] = useState<TabItem[]>([
    {
      id: 0,
      name: "사건 정보",
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
          <ExpenseInfo />
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

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <CaseBasicInfoCard />
        <CaseCostInfoCard />
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
