import ChatAppHoverButton from "./ChatAppHoverButton.tsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSetRecoilState } from "recoil";
import chatAppSceneState from "../state/ChatAppSceneState.ts";

function ChatAppBackButton() {
  const setScene = useSetRecoilState(chatAppSceneState);

  return (
    <ChatAppHoverButton
      Icon={ArrowBackIcon}
      onClick={() => setScene("Person")}
    />
  );
}

export default ChatAppBackButton;
