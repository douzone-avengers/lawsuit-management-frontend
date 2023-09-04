import { atom } from "recoil";

type ChatAppUserSearchResultStateType =
  | {
      status: "Init" | "Searching" | "Success";
    }
  | {
      status: "Fail";
      errMsg: string;
    };

const chatAppUserSearchResultState = atom<ChatAppUserSearchResultStateType>({
  key: "chatAppUserSearchResultState",
  default: {
    status: "Init",
  },
});

export default chatAppUserSearchResultState;
