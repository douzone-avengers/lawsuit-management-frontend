import { atom } from "recoil";
import { MainNavigationBarItemState } from "../../components/layout/snb/MainNavigationBarItem.tsx";

type SubNavigationBarType =
  | "none"
  | "client"
  | "caseClient"
  | "case"
  | "employee";

export type SubNavigationBarState = {
  curId: number;
  items: MainNavigationBarItemState[];
  type: SubNavigationBarType;
};

const subNavigationBarState = atom<SubNavigationBarState>({
  key: "subNavigationBarState",
  default: {
    curId: -1,
    items: [],
    type: "none",
  },
});

export default subNavigationBarState;
