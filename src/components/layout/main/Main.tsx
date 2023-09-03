import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div
      style={{
        position: "relative",
        padding: 20,
        flexGrow: 1,
        overflow: "scroll",
      }}
    >
      <Outlet />
    </div>
  );
}

export default Main;
