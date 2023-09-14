import LogoutButton from "./LogoutButton.tsx";
import SideNavigationBarDisplayButton from "./SideNavigationBarDisplayButton.tsx";
import Title from "./Title.tsx";
import ScheduleButton from "./ScheduleButton.tsx";
import { useTheme } from "@mui/material";
import ChatAppOpenButton from "./ChatAppOpenButton.tsx";
import PrivateButton from "./PrivateButton";
import { useRecoilValue } from "recoil";
import { isEmployeeState } from "../../../states/user/UserState.ts";

function Header() {
  const theme = useTheme();
  const color = "white";
  const background = theme.palette.primary.main;
  const isEmployee = useRecoilValue(isEmployeeState);

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
          {isEmployee ? <ScheduleButton /> : null}
          <PrivateButton />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default Header;
