import { atom } from "recoil";

type ChatAppSceneType = "Person" | "PersonAdd" | "Chat";

const chatAppSceneState = atom<ChatAppSceneType>({
  key: "chatAppSceneState",
  default: "Person",
});

export default chatAppSceneState;
