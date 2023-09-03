import { atom } from "recoil";
import { SearchUserByEmail } from "../type/ResponseType.ts";

type ChatAppUserSearchResultStateType = {
  status: "Init" | "Searching" | "Success" | "Fail";
  result: SearchUserByEmail | null;
  errMsg: string | null;
};

const chatAppUserSearchResultState = atom<ChatAppUserSearchResultStateType>({
  key: "chatAppUserSearchResultState",
  default: {
    status: "Init",
    result: null,
    errMsg: null,
  },
});

export default chatAppUserSearchResultState;
