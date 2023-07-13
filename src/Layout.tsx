import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Header from "./component/Header";
import LoginForm from "./component/LoginForm";
import MenuBar from "./component/MenuBar";
import { uiState } from "./state/uiState";

export default function Layout() {
  const ui = useRecoilValue(uiState);

  return (
    <div style={{ display: "flex", position: "relative", height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <div style={{ minHeight: 64 }}>
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ width: "100%", height: "100%" }}>
              <Header />
            </div>
          </div>
        </div>
        <div style={{ flexGrow: 1 }}>
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ width: 96, height: "100%" }}>
              <MenuBar />
            </div>
            <div style={{ display: "flex", flexGrow: 1, height: "100%" }}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      {ui.loginForm ? <LoginForm /> : null}
    </div>
  );
}
