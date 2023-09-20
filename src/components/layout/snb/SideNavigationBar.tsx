import { useRecoilState, useRecoilValue } from "recoil";
import sideNavigationBarOpenState from "../../../states/layout/SideNavigationBarOpenState.tsx";
import MainNavigationBar from "./MainNavigationBar.tsx";
import SubNavigationBar from "./SubNavigationBar.tsx";
import SideNavigationBarHeader from "./SideNavigationBarHeader.tsx";
import subNavigationBarState from "../../../states/layout/SubNavigationBarState.tsx";

function SideNavigationBar() {
  const sideNavigationBarOpen = useRecoilValue(sideNavigationBarOpenState);
  const [subNavigationBar, setSubNavigationBar] = useRecoilState(
    subNavigationBarState,
  );

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
