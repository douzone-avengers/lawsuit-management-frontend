import { atom } from "recoil";

const chatAppOpenState = atom({
  key: "chatAppOpenState",
  default: false,
});

export default chatAppOpenState;
