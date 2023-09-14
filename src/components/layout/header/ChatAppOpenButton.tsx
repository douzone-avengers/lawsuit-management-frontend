import Button from "@mui/material/Button";
import { useRecoilState } from "recoil";
import chatAppOpenState from "../../chat/state/ChatAppOpenState.ts";

function ChatAppOpenButton() {
  const [chatAppOpen, setChatAppOpen] = useRecoilState(chatAppOpenState);

  return (
    <Button
      variant="contained"
      sx={{
        height: "100%",
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
