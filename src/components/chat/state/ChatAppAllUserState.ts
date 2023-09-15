import { atom } from "recoil";
import { SearchAllUsersResponseType } from "../type/ResponseType.ts";

const chatAppAllUserState = atom<SearchAllUsersResponseType>({
  key: "chatAppAllUserState",
  default: [],
});

export default chatAppAllUserState;
