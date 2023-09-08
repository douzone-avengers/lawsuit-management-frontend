import { atom } from "recoil";

const chatAppUnreadCountState = atom({
  key: "chatAppUnreadCountState",
  default: 0,
});

export default chatAppUnreadCountState;
