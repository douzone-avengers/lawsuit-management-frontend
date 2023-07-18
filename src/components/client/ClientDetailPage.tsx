import { Box } from "@mui/material";
import { useState } from "react";
import TabBar, { TabItem } from "../common/TabBar";
import ClientCaseListTab from "./ClientCaseListTab";
import ClientProfileTab from "./ClientProfileTab";

function ClientDetailPage() {
  const [clientTabId, setClientTabId] = useState(0);

  const [clientTab] = useState<TabItem[]>([
    {
      id: 0,
      name: "기본 정보",
      children: <ClientProfileTab />,
    },
    {
      id: 1,
      name: "사건 정보",
      children: <ClientCaseListTab />,
    },
  ]);

  return (
    <Box>
      <TabBar items={clientTab} value={clientTabId} setValue={setClientTabId} />
    </Box>
  );
}

export default ClientDetailPage;
