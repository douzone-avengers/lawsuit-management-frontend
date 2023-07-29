import { Box } from "@mui/material";
import { useState } from "react";
import Info from "../advice/Adviceinfo";
import TabBar, { TabItem } from "../common/TabBar";
import CaseInfoTab from "./info/CaseInfoTab.tsx";

function CaseDetailPage() {
  const [caseTabId, setCaseTabId] = useState(0);

  const [clientTab] = useState<TabItem[]>([
    {
      id: 0,
      name: "사건 정보",
      children: <CaseInfoTab />,
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
      children: <div>지출 정보</div>,
    },
    {
      id: 3,
      name: "종결",
      children: <div>종결 정보</div>,
    },
  ]);

  return (
    <Box>
      <TabBar items={clientTab} value={caseTabId} setValue={setCaseTabId} />
    </Box>
  );
}

export default CaseDetailPage;
