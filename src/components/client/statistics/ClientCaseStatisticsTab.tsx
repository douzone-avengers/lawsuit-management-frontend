import Box from "@mui/material/Box";
import ClientCaseStatisticsInfoCard from "./ClientCaseStatisticsInfoCard.tsx";
import ClientCaseStatisticsChart from "./ClientCaseStatisticsChart.tsx";

function ClientCaseStatisticsTab() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <Box>
        <ClientCaseStatisticsInfoCard />
      </Box>
      <Box>
        <ClientCaseStatisticsChart />
      </Box>
    </Box>
  );
}

export default ClientCaseStatisticsTab;
