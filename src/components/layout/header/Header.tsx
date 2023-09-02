import LogoutButton from "./LogoutButton.tsx";
import SideNavigationBarDisplayButton from "./SideNavigationBarDisplayButton.tsx";
import Title from "./Title.tsx";
import ScheduleButton from "./ScheduleButton.tsx";
import { useTheme } from "@mui/material";
import Divider from "@mui/material/Divider";

function Header() {
  const theme = useTheme();
  const color = "white";
  const background = theme.palette.primary.main;

  return (
    <div
      style={{
        display: "flex",
        height: 64,
      }}
    >
      <div
        style={{
          color,
          background,
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>
          <SideNavigationBarDisplayButton />
          <Title />
        </div>
        <div style={{ display: "flex" }}>
          <ScheduleButton />
          <LogoutButton />
        </div>
      </div>
      <Divider />
    </div>
  );
}

export default Header;
