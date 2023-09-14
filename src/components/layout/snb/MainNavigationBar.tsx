import List from "@mui/material/List";
import { useRecoilValue } from "recoil";
import mainNavigationBarState from "../../../states/layout/MainNavigationBarState.tsx";
import MainNavigationBarItem from "./MainNavigationBarItem.tsx";
import { isEmployeeState } from "../../../states/user/UserState.ts";

function MainNavigationBar() {
  const mainNavigationBar = useRecoilValue(mainNavigationBarState);
  const isEmployee = useRecoilValue(isEmployeeState);

  return (
    <List
      sx={{
        width: 240,
        minWidth: 240,
        padding: 0,
        borderRight: "1px solid lightgray",
      }}
    >
      {isEmployee
        ? mainNavigationBar.items.map((item) => (
            <MainNavigationBarItem
              key={item.id}
              item={item}
              selected={mainNavigationBar.curId === item.id}
            />
          ))
        : mainNavigationBar.items
            .filter((item) => item.id === 1)
            .map((item) => (
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
