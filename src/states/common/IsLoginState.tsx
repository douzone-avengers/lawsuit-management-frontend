import { atom } from "recoil";

const isLoginState = atom<boolean>({
  key: "isLoginState",
  default: false,
});

export default isLoginState;
