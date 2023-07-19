import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { useRecoilValue } from "recoil";
import sideNavigationBarOpenState from "../../states/layout/SideNavigationBarOpenState";
import LogoutButton from "./LogoutButton";
import SideNavigationBarButton from "./SideNavigationBarButton";
import Title from "./Title";
import subNavigationBarTypeState from "../../states/layout/SubNavigationBarTypeState.tsx";

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
        <SideNavigationBarButton />
        <Title />
      </Toolbar>
      <LogoutButton />
    </HeaderContainer>
  );
}

export default Header;
