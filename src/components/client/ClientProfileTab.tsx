import Placeholder from "../common/Placeholder.tsx";
import Box from "@mui/material/Box";
import ClientInfo from "./ClientInfo.tsx";

function ClientProfileTab() {
  return (
    <Box sx={{ display: "flex", gap: 3, flexDirection: "row" }}>
      <ClientInfo width={480} height={140} />
      <Box sx={{ flexGrow: 1, height: 680 }}>
        <Placeholder />
      </Box>
    </Box>
  );
}

export default ClientProfileTab;
