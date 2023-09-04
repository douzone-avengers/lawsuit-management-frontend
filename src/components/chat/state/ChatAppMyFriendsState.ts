import { atom } from "recoil";
import { SearchFriendsByEmail } from "../type/ResponseType.ts";

const chatAppMyFriendsState = atom<SearchFriendsByEmail>({
  key: "chatAppMyFriendsState",
  default: [],
});

export default chatAppMyFriendsState;
