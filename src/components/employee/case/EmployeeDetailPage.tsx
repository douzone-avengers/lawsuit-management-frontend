import Box from "@mui/material/Box";
import EmployeeCaseListTab from "./list/EmployeeCaseListTab";
import { useState } from "react";
import TabBar, { TabItem } from "../../common/TabBar";
import EmployeeCaseStatisticsTab from "./statistics/EmployeeCaseStatisticsTab";
import Button from "@mui/material/Button";
import { SvgIcon } from "@mui/material";
import ReorderIcon from "@mui/icons-material/Reorder";
import { useNavigate } from "react-router-dom";
import EmployeeInfoTap from "./info/EmployeeInfoTap";

function EmployeeDetailPage() {
  const [tabId, setTabId] = useState(0);
  const navigate = useNavigate();

  const handleClickListButton = () => {
    navigate(`/employees`);
  };

  const [tab] = useState<TabItem[]>([
    {
      id: 0,
      name: "사원 상세",
      children: <EmployeeInfoTap />,
    },
    {
      id: 1,
      name: "사건 리스트",
      children: <EmployeeCaseListTab />,
    },
    {
      id: 2,
      name: "통계",
      children: <EmployeeCaseStatisticsTab />,
    },
  ]);

  return (
    <>
      <Box>
        <Button variant={"outlined"} onClick={handleClickListButton}>
          <SvgIcon component={ReorderIcon} sx={{ fontSize: "large" }} />
          &nbsp; 목록
        </Button>
      </Box>
      <Box>
        <TabBar items={tab} value={tabId} setValue={setTabId} />
      </Box>
    </>
  );
}

export default EmployeeDetailPage;
