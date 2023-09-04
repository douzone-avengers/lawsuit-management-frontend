import { atom } from "recoil";

type ChatAppSceneType = "Person" | "PersonAdd" | "PersonInfo" | "Room";

const chatAppSceneState = atom<ChatAppSceneType>({
  key: "chatAppSceneState",
  default: "Person",
});

export default chatAppSceneState;
