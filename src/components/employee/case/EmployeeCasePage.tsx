import Box from "@mui/material/Box";
import EmployeeCaseListTab from "./EmployeeCaseListTab";
import { useState } from "react";
import TabBar, { TabItem } from "../../common/TabBar";
import EmployeeCaseStatisticsTab from "./EmployeeCaseStatisticsTab";

function EmployeeCasePage() {
  const [tabId, setTabId] = useState(0);

  const [tab] = useState<TabItem[]>([
    {
      id: 0,
      name: "사건 리스트",
      children: <EmployeeCaseListTab />,
    },
    {
      id: 1,
      name: "통계",
      children: <EmployeeCaseStatisticsTab />,
    },
  ]);

  return (
    <Box>
      <TabBar items={tab} value={tabId} setValue={setTabId} />
    </Box>
  );
}

export default EmployeeCasePage;
