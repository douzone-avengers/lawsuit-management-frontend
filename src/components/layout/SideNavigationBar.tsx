import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { useRecoilState } from "recoil";
import sideNavigationBarOpenState from "../../states/layout/SideNavigationBarOpenState";
import DrawerHeader from "./DrawerHeader";
import MainNavigationBar from "./MainNavigationBar";
import Profile from "./Profile";
import SubNavigationBar from "./SubNavigationBar";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import IconButton from "@mui/material/IconButton";

function SideNavigationBar() {
  const [sideNavigationBarOpen, setSideNavigationBarOpen] = useRecoilState(
    sideNavigationBarOpenState
  );

  const handleClick = () => {
    setSideNavigationBarOpen(false);
  };

  return (
    <Drawer
      sx={{
        width: 480,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 480,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={sideNavigationBarOpen}
    >
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
          <IconButton onClick={handleClick}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      </DrawerHeader>
      <Divider />
      <Box sx={{ display: "flex", height: "100%" }}>
        <MainNavigationBar />
        <Divider orientation="vertical" flexItem />
        <SubNavigationBar />
      </Box>
    </Drawer>
  );
}

export default SideNavigationBar;
