import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div
      style={{
        position: "relative",
        padding: 20,
        flexGrow: 1,
        overflow: "auto",
      }}
    >
      <Outlet />
    </div>
  );
}

export default Main;
