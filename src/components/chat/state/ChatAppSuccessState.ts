import { atom } from "recoil";

type ChatAppSuccessType = {
  msg: string;
  callback: () => void;
};

const chatAppSuccessState = atom<ChatAppSuccessType | null>({
  key: "chatAppSuccessTypeState",
  default: null,
});

export default chatAppSuccessState;
