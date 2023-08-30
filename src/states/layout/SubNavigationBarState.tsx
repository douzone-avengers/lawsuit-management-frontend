import { atom } from "recoil";
import { MainNavigationBarItemState } from "../../components/layout/snb/MainNavigationBarItem.tsx";

type SubNavigationBarType =
  | "none"
  | "client"
  | "caseClient"
  | "case"
  | "employee";

export type SubNavigationBarState = {
  type: SubNavigationBarType;
  curId: number;
  items: MainNavigationBarItemState[];
};

const subNavigationBarState = atom<SubNavigationBarState>({
  key: "subNavigationBarState",
  default: {
    type: "none",
    curId: -1,
    items: [],
  },
});

export default subNavigationBarState;
