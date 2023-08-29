import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import sideNavigationBarOpenState from "../../../states/layout/SideNavigationBarOpenState.tsx";
import DrawerHeader from "../DrawerHeader.tsx";
import subNavigationBarState from "../../../states/layout/SubNavigationBarState.tsx";

const MainContainer = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme }) => {
  const sideNavigationBarOpen = useRecoilValue(sideNavigationBarOpenState);
  const subNavigationBar = useRecoilValue(subNavigationBarState);

  return {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: subNavigationBar.type !== "none" ? `-480px` : `-240px`,
    ...(sideNavigationBarOpen && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  };
});

function Main() {
  return (
    <MainContainer>
      <DrawerHeader />
      <Outlet />
    </MainContainer>
  );
}

export default Main;
