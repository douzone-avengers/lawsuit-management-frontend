import ChatAppHoverButton from "./ChatAppHoverButton.tsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSetRecoilState } from "recoil";
import chatAppSceneState, {
  ChatAppSceneType,
} from "../state/ChatAppSceneState.ts";

type Props = {
  scene: ChatAppSceneType;
};

function ChatAppBackButton({ scene }: Props) {
  const setScene = useSetRecoilState(chatAppSceneState);

  return (
    <ChatAppHoverButton Icon={ArrowBackIcon} onClick={() => setScene(scene)} />
  );
}

export default ChatAppBackButton;
