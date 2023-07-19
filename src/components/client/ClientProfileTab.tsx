import Placeholder from "../common/Placeholder.tsx";
import Box from "@mui/material/Box";
import ClientInfo from "../common/ClientInfo.tsx";

function ClientProfileTab() {
  return (
    <Box sx={{ display: "flex", gap: 3, flexDirection: "column" }}>
      <ClientInfo />
      <Box sx={{ flexGrow: 1, height: 480 }}>
        <Placeholder />
      </Box>
    </Box>
  );
}

export default ClientProfileTab;
