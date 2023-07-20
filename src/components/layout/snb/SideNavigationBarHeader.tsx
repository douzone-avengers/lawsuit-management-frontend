import DrawerHeader from "../DrawerHeader.tsx";
import Box from "@mui/material/Box";
import Profile from "./Profile.tsx";
import SideNavigationBarHiddenButton from "./SideNavigationBarHiddenButton.tsx";

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
        <Profile />
        <SideNavigationBarHiddenButton />
      </Box>
    </DrawerHeader>
  );
}

export default SideNavigationBarHeader;
