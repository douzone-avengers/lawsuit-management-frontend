import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ChatAppSelectButton from "./ChatAppSelectButton.tsx";
import { useRecoilState } from "recoil";
import chatAppSceneState from "../../../states/chat/ChatAppSceneState.ts";

function ChatAppChatFooterButton() {
  const [chatAppScene, setChatAppScene] = useRecoilState(chatAppSceneState);

  return (
    <ChatAppSelectButton
      Icon={ChatBubbleIcon}
      selected={chatAppScene === "Chat"}
      onClick={() => setChatAppScene("Chat")}
    />
  );
}

export default ChatAppChatFooterButton;
