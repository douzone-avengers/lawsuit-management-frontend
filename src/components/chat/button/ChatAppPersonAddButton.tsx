import ChatAppHoverButton from "./ChatAppHoverButton.tsx";
import { useSetRecoilState } from "recoil";
import chatAppSceneState from "../state/ChatAppSceneState.ts";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

function ChatAppPersonAddButton() {
  const setScene = useSetRecoilState(chatAppSceneState);

  return (
    <ChatAppHoverButton
      Icon={PersonAddAlt1Icon}
      onClick={() => setScene("PersonAdd")}
    />
  );
}

export default ChatAppPersonAddButton;
