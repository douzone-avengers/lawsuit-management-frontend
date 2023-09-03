import PersonIcon from "@mui/icons-material/Person";
import ChatAppSelectButton from "./ChatAppSelectButton.tsx";
import { useRecoilState } from "recoil";
import chatAppSceneState from "../../../states/chat/ChatAppSceneState.ts";

function ChatAppPersonFooterButton() {
  const [chatAppScene, setChatAppScene] = useRecoilState(chatAppSceneState);

  return (
    <ChatAppSelectButton
      Icon={PersonIcon}
      selected={chatAppScene === "Person"}
      onClick={() => setChatAppScene("Person")}
    />
  );
}

export default ChatAppPersonFooterButton;
