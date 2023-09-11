import { atom } from "recoil";
import { SearchFriendsByEmailResponseType } from "../type/ResponseType.ts";

const chatAppEmployeesState = atom<SearchFriendsByEmailResponseType>({
  key: "chatAppEmployeesState",
  default: [],
});

export default chatAppEmployeesState;
