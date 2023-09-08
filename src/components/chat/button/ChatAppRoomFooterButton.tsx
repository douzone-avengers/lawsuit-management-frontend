import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ChatAppSelectButton from "./ChatAppSelectButton.tsx";
import { useRecoilState } from "recoil";
import chatAppSceneState from "../state/ChatAppSceneState.ts";
import ChatAppUnreadCountCircle from "../box/ChatAppUnreadCountCircle.tsx";

function ChatAppRoomFooterButton() {
  const [scene, setScene] = useRecoilState(chatAppSceneState);
  const selected = scene === "Room";

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        height: "100%",
      }}
    >
      <ChatAppSelectButton
        Icon={ChatBubbleIcon}
        selected={selected}
        onClick={() => setScene("Room")}
      />
      <ChatAppUnreadCountCircle selected={selected} />
    </div>
  );
}

export default ChatAppRoomFooterButton;
