import { atom } from "recoil";
import { MessageInfoType } from "../type/ResponseType.ts";

const chatAppRoomNewMessagesState = atom<MessageInfoType[]>({
  key: "chatAppRoomNewMessagesState",
  default: [],
});

export default chatAppRoomNewMessagesState;
