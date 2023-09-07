import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ChatAppSelectButton from "./ChatAppSelectButton.tsx";
import { useRecoilState } from "recoil";
import chatAppSceneState from "../state/ChatAppSceneState.ts";

function ChatAppRoomFooterButton() {
  const [scene, setScene] = useRecoilState(chatAppSceneState);

  return (
    <ChatAppSelectButton
      Icon={ChatBubbleIcon}
      selected={scene === "Room"}
      onClick={() => setScene("Room")}
    />
  );
}

export default ChatAppRoomFooterButton;
