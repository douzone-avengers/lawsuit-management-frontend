import { atom } from "recoil";

const sideNavigationBarOpenState = atom<boolean>({
  key: "sideNavigationBarOpenState",
  default: true,
});

export default sideNavigationBarOpenState;
