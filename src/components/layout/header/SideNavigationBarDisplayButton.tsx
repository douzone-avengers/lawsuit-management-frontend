import MenuIcon from "@mui/icons-material/Menu";
import { useRecoilState } from "recoil";
import sideNavigationBarOpenState from "../../../states/layout/SideNavigationBarOpenState.tsx";

function SideNavigationBarDisplayButton() {
  const [sideBarNavigationOpen, setSideBarNavigationOpen] = useRecoilState(
    sideNavigationBarOpenState,
  );

  return !sideBarNavigationOpen ? (
    <div
      style={{
        marginLeft: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={() => {
        setSideBarNavigationOpen(true);
      }}
    >
      <MenuIcon />
    </div>
  ) : null;
}

export default SideNavigationBarDisplayButton;
