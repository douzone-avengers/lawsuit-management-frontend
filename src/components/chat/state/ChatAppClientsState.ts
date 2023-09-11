import { atom } from "recoil";
import { SearchFriendsByEmailResponseType } from "../type/ResponseType.ts";

const chatAppClientsState = atom<SearchFriendsByEmailResponseType>({
  key: "chatAppClientsState",
  default: [],
});

export default chatAppClientsState;
