import LogoutButton from "./LogoutButton.tsx";
import SideNavigationBarDisplayButton from "./SideNavigationBarDisplayButton.tsx";
import Title from "./Title.tsx";
import ScheduleButton from "./ScheduleButton.tsx";
import { useTheme } from "@mui/material";
import ChatAppOpenButton from "../../chat/ChatAppOpenButton.tsx";

function Header() {
  const theme = useTheme();
  const color = "white";
  const background = theme.palette.primary.main;
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: 64,
        borderBottom: "1px solid lightgray",
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
          <ChatAppOpenButton />
          <ScheduleButton />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default Header;
