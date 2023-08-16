import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { useRecoilValue } from "recoil";
import sideNavigationBarOpenState from "../../../states/layout/SideNavigationBarOpenState.tsx";
import LogoutButton from "./LogoutButton.tsx";
import SideNavigationBarDisplayButton from "./SideNavigationBarDisplayButton.tsx";
import Title from "./Title.tsx";
import subNavigationBarTypeState from "../../../states/layout/SubNavigationBarTypeState.tsx";
import Box from "@mui/material/Box";
import ScheduleButton from "./ScheduleButton.tsx";

interface HeaderProps extends MuiAppBarProps {
  open?: boolean;
}

const HeaderContainer = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<HeaderProps>(({ theme }) => {
  const sideNavigationBarOpen = useRecoilValue(sideNavigationBarOpenState);
  const subNavigationBarType = useRecoilValue(subNavigationBarTypeState);

  return {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(sideNavigationBarOpen && {
      width:
        subNavigationBarType !== "none"
          ? `calc(100% - 480px)`
          : `calc(100% - 240px)`,
      marginLeft: subNavigationBarType !== "none" ? 480 : 240,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  };
});

function Header() {
  return (
    <HeaderContainer
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      position="fixed"
    >
      <Toolbar>
        <SideNavigationBarDisplayButton />
        <Title />
      </Toolbar>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ScheduleButton />
        <LogoutButton />
      </Box>
    </HeaderContainer>
  );
}

export default Header;
