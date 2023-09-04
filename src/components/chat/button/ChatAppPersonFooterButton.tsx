import PersonIcon from "@mui/icons-material/Person";
import ChatAppSelectButton from "./ChatAppSelectButton.tsx";
import { useRecoilState } from "recoil";
import chatAppSceneState from "../state/ChatAppSceneState.ts";

function ChatAppPersonFooterButton() {
  const [scene, setScene] = useRecoilState(chatAppSceneState);

  return (
    <ChatAppSelectButton
      Icon={PersonIcon}
      selected={scene === "Person"}
      onClick={() => setScene("Person")}
    />
  );
}

export default ChatAppPersonFooterButton;
