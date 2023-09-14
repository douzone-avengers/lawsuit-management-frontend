import { atom } from "recoil";
import { SearchFriendsByEmailResponseType } from "../type/ResponseType.ts";

const chatAppMyFriendsState = atom<SearchFriendsByEmailResponseType>({
  key: "chatAppMyFriendsState",
  default: [],
});

export default chatAppMyFriendsState;
