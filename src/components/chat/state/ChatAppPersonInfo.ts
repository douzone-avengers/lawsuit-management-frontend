import { atom } from "recoil";

type ChatAppPersonInfoType = {};

const chatAppPersonInfoState = atom<ChatAppPersonInfoType | null>({
  key: "chatAppPersonInfoState",
  default: null,
});

export default chatAppPersonInfoState;
