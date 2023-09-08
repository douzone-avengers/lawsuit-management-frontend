import { atom } from "recoil";

type ChatAppSceneType =
  | "Person"
  | "PersonAdd"
  | "PersonInfo"
  | "Room"
  | "RoomChat";

const chatAppSceneState = atom<ChatAppSceneType>({
  key: "chatAppSceneState",
  default: "Person",
});

export default chatAppSceneState;
