import Button from "@mui/material/Button";
import { useRecoilState } from "recoil";
import chatAppOpenState from "../../../states/chat/ChatAppOpenState.ts";

function ChatAppOpenButton() {
  const [chatAppOpen, setChatAppOpen] = useRecoilState(chatAppOpenState);

  return (
    <Button
      variant="contained"
      sx={{
        background: chatAppOpen ? "#1565c0" : "",
      }}
      disableElevation
      onClick={() => setChatAppOpen(!chatAppOpen)}
    >
      채팅
    </Button>
  );
}

export default ChatAppOpenButton;
