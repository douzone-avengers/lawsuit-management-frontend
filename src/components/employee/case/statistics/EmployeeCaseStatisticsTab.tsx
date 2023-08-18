import Box from "@mui/material/Box";
import EmployeeCaseChart from "./EmployeeCaseChart";
import EmployeeCaseStatisticsInfoCard from "./EmployeeCaseStatisticsInfoCard";

function EmployeeCaseStatisticsTab() {
  return (
    <Box>
      <EmployeeCaseStatisticsInfoCard
        width={"100%"}
        name={"김더존"}
        winCnt={100}
        loseCnt={56}
        income={3000000}
      />
      <br />
      <EmployeeCaseChart />
    </Box>
  );
}

export default EmployeeCaseStatisticsTab;
