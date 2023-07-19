import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { useRecoilState, useRecoilValue } from "recoil";
import sideNavigationBarOpenState from "../../states/layout/SideNavigationBarOpenState";
import DrawerHeader from "./DrawerHeader";
import MainNavigationBar from "./MainNavigationBar";
import Profile from "./Profile";
import SubNavigationBar from "./SubNavigationBar";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import IconButton from "@mui/material/IconButton";
import subNavigationBarTypeState from "../../states/layout/SubNavigationBarTypeState.tsx";

function SideNavigationBar() {
  const [sideNavigationBarOpen, setSideNavigationBarOpen] = useRecoilState(
    sideNavigationBarOpenState,
  );
  const subNavigationBarType = useRecoilValue(subNavigationBarTypeState);

  const handleClick = () => {
    setSideNavigationBarOpen(false);
  };

  return (
    <Drawer
      sx={{
        width: subNavigationBarType !== "none" ? 480 : 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: subNavigationBarType !== "none" ? 480 : 240,
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
        {subNavigationBarType !== "none" ? (
          <>
            <Divider orientation="vertical" flexItem />
            <SubNavigationBar />
          </>
        ) : null}
      </Box>
    </Drawer>
  );
}

export default SideNavigationBar;
