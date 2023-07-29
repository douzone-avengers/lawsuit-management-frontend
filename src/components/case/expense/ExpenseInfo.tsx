import Box from "@mui/material/Box";
import ExpenseSearch from "./ExpenseSearch";
import ExpenseListTable from "./ExpenseListTable";

function ExpenseInfo() {
  return (
    <Box
      sx={{ display: "flex", gap: 3, flexDirection: "column", height: "100%" }}
    >
      <ExpenseSearch />
      <ExpenseListTable />
    </Box>
  );
}

export default ExpenseInfo;
