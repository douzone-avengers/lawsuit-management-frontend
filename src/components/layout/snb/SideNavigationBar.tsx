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
      length === 3 &&
      paths[1] === "cases" &&
      paths[2] === "clients" &&
      paths[3]
    ) {
    } else if (
      length === 4 &&
      paths[1] === "cases" &&
      paths[2] &&
      paths[3] === "clients" &&
      paths[4]
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: sideNavigationBarOpen
          ? subNavigationBar.type !== "none"
            ? 480
            : 240
          : 0,
        transitionProperty: "width",
        transition: "all 0.5s",
        overflow: "visible",
        whiteSpace: "nowrap",
      }}
    >
      {sideNavigationBarOpen ? (
        <SideNavigationBarHeader />
      ) : (
        <div style={{ height: 64, borderBottom: "1px solid lightgray" }}></div>
      )}
      <div
        style={{
          display: "flex",
          overflowY: "hidden",
          flexGrow: 1,
        }}
      >
        <MainNavigationBar />
        {subNavigationBar.type !== "none" ? <SubNavigationBar /> : null}
      </div>
    </div>
  );
}

export default SideNavigationBar;
