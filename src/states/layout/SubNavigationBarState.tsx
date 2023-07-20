import { atom } from "recoil";
import { MainNavigationBarItemState } from "../../components/layout/snb/MainNavigationBarItem.tsx";

export type SubNavigationBarState = {
  curId: number;
  items: MainNavigationBarItemState[];
};

const subNavigationBarState = atom<SubNavigationBarState>({
  key: "subNavigationBarState",
  default: {
    curId: -1,
    items: [],
  },
});

export default subNavigationBarState;
