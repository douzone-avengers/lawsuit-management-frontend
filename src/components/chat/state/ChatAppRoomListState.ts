import { atom } from "recoil";
import { GetAllRoomsResponseType } from "../type/ResponseType.ts";

const chatAppRoomListState = atom<GetAllRoomsResponseType>({
  key: "chatAppRoomListState",
  default: [],
});

export default chatAppRoomListState;
