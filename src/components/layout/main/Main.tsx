import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div
      style={{
        position: "relative",
        padding: 20,
        height: "calc(100vh - 64px)",
        overflow: "auto",
      }}
    >
      <Outlet />
    </div>
  );
}

export default Main;
