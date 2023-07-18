import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useRecoilState } from "recoil";
import sideNavigationBarState from "../../states/layout/SideNavigationBarOpenState";

function SideNavigationBarButton() {
  const [sideBarNavigationOpen, setSideBarNavigationOpen] = useRecoilState(
    sideNavigationBarState
  );

  const handleClick = () => {
    setSideBarNavigationOpen(true);
  };

  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={handleClick}
      edge="start"
      sx={{ mr: 2, ...(sideBarNavigationOpen && { display: "none" }) }}
    >
      <MenuIcon />
    </IconButton>
  );
}

export default SideNavigationBarButton;
