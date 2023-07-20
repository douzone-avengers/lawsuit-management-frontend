import List from "@mui/material/List";
import { useRecoilValue } from "recoil";
import mainNavigationBarState from "../../../states/layout/MainNavigationBarState.tsx";
import MainNavigationBarItem from "./MainNavigationBarItem.tsx";

function MainNavigationBar() {
  const mainNavigationBar = useRecoilValue(mainNavigationBarState);

  return (
    <List sx={{ width: 240, padding: 0 }}>
      {mainNavigationBar.items.map((item) => (
        <MainNavigationBarItem
          key={item.id}
          item={item}
          selected={mainNavigationBar.curId === item.id}
        />
      ))}
    </List>
  );
}

export default MainNavigationBar;
