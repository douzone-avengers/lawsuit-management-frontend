import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        flexGrow: 1,
      }}
    >
      <Outlet />
    </div>
  );
}

export default Main;
