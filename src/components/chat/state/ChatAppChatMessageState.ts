import { atom } from "recoil";

const chatAppChatMessageState = atom({
  key: "chatAppChatMessageState",
  default: "",
});

export default chatAppChatMessageState;
