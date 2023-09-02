import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import sideNavigationBarOpenState from "../../../states/layout/SideNavigationBarOpenState.tsx";
import subNavigationBarState from "../../../states/layout/SubNavigationBarState.tsx";

function Main() {
  const sideNavigationBarOpen = useRecoilValue(sideNavigationBarOpenState);
  const subNavigationBar = useRecoilValue(subNavigationBarState);

  return (
    <div
      style={{
        padding: 20,
        flexGrow: 1,
        width: sideNavigationBarOpen
          ? subNavigationBar.type !== "none"
            ? "calc(100vw - 480px)"
            : "calc(100vw - 240px)"
          : "100%",
        overflow: "scroll",
      }}
    >
      <Outlet />
    </div>
  );
}

export default Main;
