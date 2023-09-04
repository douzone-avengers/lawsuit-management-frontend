import ChatAppHoverButton from "./ChatAppHoverButton.tsx";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useSetRecoilState } from "recoil";
import chatAppSceneState from "../state/ChatAppSceneState.ts";

function ChatAppPersonAddButton() {
  const setScene = useSetRecoilState(chatAppSceneState);

  return (
    <ChatAppHoverButton
      Icon={PersonAddIcon}
      onClick={() => setScene("PersonAdd")}
    />
  );
}

export default ChatAppPersonAddButton;
