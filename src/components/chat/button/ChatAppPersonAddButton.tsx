import ChatAppHoverButton from "./ChatAppHoverButton.tsx";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useSetRecoilState } from "recoil";
import chatAppSceneState from "../../../states/chat/ChatAppSceneState.ts";

function ChatAppPersonAddButton() {
  const setChatAppScene = useSetRecoilState(chatAppSceneState);

  return (
    <ChatAppHoverButton
      Icon={PersonAddIcon}
      onClick={() => setChatAppScene("PersonAdd")}
    />
  );
}

export default ChatAppPersonAddButton;
