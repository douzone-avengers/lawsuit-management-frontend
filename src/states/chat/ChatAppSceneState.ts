import { atom } from "recoil";

type ChatAppSceneType = "";

const chatAppSceneState = atom<ChatAppSceneType>({
  key: "chatAppSceneState",
  default: "",
});

export default chatAppSceneState;
