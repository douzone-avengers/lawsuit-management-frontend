import DrawerHeader from "../DrawerHeader.tsx";
import Box from "@mui/material/Box";
import SideNavigationBarHiddenButton from "./SideNavigationBarHiddenButton.tsx";
import ClientInformation from "./ClientInformation.tsx";

function SideNavigationBarHeader() {
  return (
    <DrawerHeader>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ClientInformation />
        <SideNavigationBarHiddenButton />
      </Box>
    </DrawerHeader>
  );
}

export default SideNavigationBarHeader;
