import { atom } from "recoil";
import { GetAllMessagesResponseType } from "../type/ResponseType.ts";

const chatAppNewMessagesState = atom<GetAllMessagesResponseType>({
  key: "chatAppNewMessagesState",
  default: [],
});

export default chatAppNewMessagesState;
