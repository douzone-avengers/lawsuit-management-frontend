import BadgeIcon from "@mui/icons-material/Badge";
import BalanceIcon from "@mui/icons-material/Balance";
import PersonIcon from "@mui/icons-material/Person";
import { atom } from "recoil";
import { MainNavigationBarItemState } from "../../components/layout/MainNavigationBarItem";

export type MainNavigationBarState = {
  curId: number;
  items: MainNavigationBarItemState[];
};

const mainNavigationBarState = atom<MainNavigationBarState>({
  key: "mainNavigationBarState",
  default: {
    curId: -1,
    items: [
      {
        id: 0,
        text: "의뢰인",
        url: "clients",
        SvgIcon: PersonIcon,
      },
      {
        id: 1,
        text: "사원",
        url: "employees",
        SvgIcon: BadgeIcon,
      },
      {
        id: 2,
        text: "사건",
        url: "cases",
        SvgIcon: BalanceIcon,
      },
    ],
  },
});

export default mainNavigationBarState;
