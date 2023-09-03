import { useRecoilValue } from "recoil";
import chatAppOpenState from "../../states/chat/ChatAppOpenState.ts";
import chatAppSceneState from "../../states/chat/ChatAppSceneState.ts";
import ChatAppPersonScene from "./scene/ChatAppPersonScene.tsx";
import ChatAppChatScene from "./scene/ChatAppChatScene.tsx";
import ChatAppPersonAddScene from "./scene/ChatAppPersonAddScene.tsx";

function ChatApp() {
  const chatAppOpen = useRecoilValue(chatAppOpenState);
  const chatAppScene = useRecoilValue(chatAppSceneState);

  return (
    <div
      style={{
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        transitionProperty: "width",
        transition: "all 0.5s",
        width: chatAppOpen ? 480 : 0,
        height: "100%",
        borderLeft: "1px solid lightgray",
        background: "white",
      }}
    >
      {chatAppScene === "Person" ? (
        <ChatAppPersonScene />
      ) : chatAppScene === "PersonAdd" ? (
        <ChatAppPersonAddScene />
      ) : chatAppScene === "Chat" ? (
        <ChatAppChatScene />
      ) : null}
    </div>
  );
}

export default ChatApp;
