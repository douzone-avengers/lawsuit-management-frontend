import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { useRecoilValue } from "recoil";
import sideNavigationBarOpenState from "../../../states/layout/SideNavigationBarOpenState.tsx";
import MainNavigationBar from "./MainNavigationBar.tsx";
import SubNavigationBar from "./SubNavigationBar.tsx";
import SideNavigationBarHeader from "./SideNavigationBarHeader.tsx";
import subNavigationBarState from "../../../states/layout/SubNavigationBarState.tsx";

function SideNavigationBar() {
  const sideNavigationBarOpen = useRecoilValue(sideNavigationBarOpenState);
  const subNavigationBar = useRecoilValue(subNavigationBarState);

  return (
    <Drawer
      sx={{
        width: subNavigationBar.type !== "none" ? 480 : 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: subNavigationBar.type !== "none" ? 480 : 240,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={sideNavigationBarOpen}
    >
      <SideNavigationBarHeader />
      <Divider />
      <Box sx={{ display: "flex", height: "100%" }}>
        <MainNavigationBar />
        {subNavigationBar.type !== "none" ? (
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
