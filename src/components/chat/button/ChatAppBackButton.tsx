import ChatAppHoverButton from "./ChatAppHoverButton.tsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSetRecoilState } from "recoil";
import chatAppSceneState from "../../../states/chat/ChatAppSceneState.ts";

function ChatAppBackButton() {
  const setChatAppScene = useSetRecoilState(chatAppSceneState);

  return (
    <ChatAppHoverButton
      Icon={ArrowBackIcon}
      onClick={() => setChatAppScene("Person")}
    />
  );
}

export default ChatAppBackButton;
