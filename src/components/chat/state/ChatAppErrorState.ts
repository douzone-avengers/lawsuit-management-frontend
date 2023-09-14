import { atom } from "recoil";

type ChatAppErrorType = {
  msg: string;
  callback: () => void;
};

const chatAppErrorState = atom<ChatAppErrorType | null>({
  key: "chatAppErrorTypeState",
  default: null,
});

export default chatAppErrorState;
