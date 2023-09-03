import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

function EmployeeLayout() {
  return (
    <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
      <Outlet />
    </Box>
  );
}

export default EmployeeLayout;
