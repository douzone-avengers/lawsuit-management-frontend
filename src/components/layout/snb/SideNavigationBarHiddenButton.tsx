import { useSetRecoilState } from "recoil";
import sideNavigationBarOpenState from "../../../states/layout/SideNavigationBarOpenState.tsx";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function SideNavigationBarHiddenButton() {
  const setSideNavigationBarOpen = useSetRecoilState(
    sideNavigationBarOpenState,
  );

  const handleClick = () => {
    setSideNavigationBarOpen(false);
  };

  return (
    <IconButton onClick={handleClick}>
      <ChevronLeftIcon />
    </IconButton>
  );
}

export default SideNavigationBarHiddenButton;
