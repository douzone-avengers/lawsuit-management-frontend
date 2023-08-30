import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { useRecoilState, useRecoilValue } from "recoil";
import sideNavigationBarOpenState from "../../../states/layout/SideNavigationBarOpenState.tsx";
import MainNavigationBar from "./MainNavigationBar.tsx";
import SubNavigationBar from "./SubNavigationBar.tsx";
import SideNavigationBarHeader from "./SideNavigationBarHeader.tsx";
import subNavigationBarState from "../../../states/layout/SubNavigationBarState.tsx";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function SideNavigationBar() {
  const sideNavigationBarOpen = useRecoilValue(sideNavigationBarOpenState);
  const [subNavigationBar, setSubNavigationBar] = useRecoilState(
    subNavigationBarState,
  );
  const location = useLocation();

  useEffect(() => {
    const { pathname, search } = location;
    const paths = pathname.split("/");
    const param: Record<string, string> = {};
    if (search !== "") {
      const arr = search.substring(1).split("&");
      for (const item of arr) {
        const [key, value] = item.split("=");
        param[key] = value;
      }
    }
    const length = paths.length - 1;

    if (length === 2 && paths[1] === "clients" && paths[2]) {
    } else if (
      length === 2 &&
      paths[1] === "cases" &&
      paths[2] === "list" &&
      param["client"]
    ) {
    } else if (
      length === 2 &&
      paths[1] === "cases" &&
      paths[2] &&
      param["client"]
    ) {
    } else if (
      length === 2 &&
      paths[1] === "employees" &&
      paths[2] &&
      !isNaN(Number(paths[2]))
    ) {
    } else {
      setSubNavigationBar({
        type: "none",
        curId: -1,
        items: [],
      });
    }
  }, [location]);

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
      <Box
        sx={{
          display: "flex",
          height: "100%",
          overflowY: "hidden",
        }}
      >
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
