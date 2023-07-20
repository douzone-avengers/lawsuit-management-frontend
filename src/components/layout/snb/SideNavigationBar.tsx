import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { useRecoilValue } from "recoil";
import sideNavigationBarOpenState from "../../../states/layout/SideNavigationBarOpenState.tsx";
import MainNavigationBar from "./MainNavigationBar.tsx";
import SubNavigationBar from "./SubNavigationBar.tsx";
import subNavigationBarTypeState from "../../../states/layout/SubNavigationBarTypeState.tsx";
import SideNavigationBarHeader from "./SideNavigationBarHeader.tsx";

function SideNavigationBar() {
  const sideNavigationBarOpen = useRecoilValue(sideNavigationBarOpenState);
  const subNavigationBarType = useRecoilValue(subNavigationBarTypeState);

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
      <SideNavigationBarHeader />
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
