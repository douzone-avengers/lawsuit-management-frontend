import { atom } from "recoil";
import { RoomBasicInfoType } from "../type/ResponseType.ts";

type ChatAppRoomInfoStateType =
  | {
      state: "Init";
    }
  | {
      state: "Ready";
      value: RoomBasicInfoType;
    }
  | {
      state: "Loading";
      value: RoomBasicInfoType;
    }
  | {
      state: "Complete";
      value: RoomBasicInfoType;
    };

const chatAppRoomInfoState = atom<ChatAppRoomInfoStateType>({
  key: "chatAppRoomInfoState",
  default: {
    state: "Init",
  },
});

export default chatAppRoomInfoState;
