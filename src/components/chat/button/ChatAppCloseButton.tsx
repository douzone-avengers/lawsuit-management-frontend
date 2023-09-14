import ChatAppHoverButton from "./ChatAppHoverButton.tsx";
import { useSetRecoilState } from "recoil";
import chatAppSceneState from "../state/ChatAppSceneState.ts";
import CloseIcon from "@mui/icons-material/Close";

function ChatAppCloseButton() {
  const setScene = useSetRecoilState(chatAppSceneState);

  return (
    <ChatAppHoverButton Icon={CloseIcon} onClick={() => setScene("Person")} />
  );
}

export default ChatAppCloseButton;
