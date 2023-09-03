import { atom } from "recoil";

type ChatAppSceneType = "Person" | "PersonAdd" | "Room";

const chatAppSceneState = atom<ChatAppSceneType>({
  key: "chatAppSceneState",
  default: "Person",
});

export default chatAppSceneState;
