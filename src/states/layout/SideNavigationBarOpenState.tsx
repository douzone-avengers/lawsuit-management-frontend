import { atom } from "recoil";

const sideNavigationBarOpenState = atom<boolean>({
  key: "sideNavigationBarOpenState",
  default: false,
});

export default sideNavigationBarOpenState;
