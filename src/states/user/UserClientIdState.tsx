import { atom } from "recoil";

const userClientIdState = atom<number | null>({
  key: "userClientIdState",
  default: null,
});

export default userClientIdState;
