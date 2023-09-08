import { useRecoilValue } from "recoil";
import chatAppUnreadCountState from "../state/ChatAppUnreadCountState.ts";

type Props = {
  selected: boolean;
};

function ChatAppUnreadCountCircle({ selected }: Props) {
  const unreadCount = useRecoilValue(chatAppUnreadCountState);
  return unreadCount !== 0 ? (
    <div
      style={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: 5,
        left: 5,
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: selected ? "white" : "#1976D2",
        color: selected ? "#1976D2" : "white",
      }}
    >
      {unreadCount}
    </div>
  ) : null;
}

export default ChatAppUnreadCountCircle;
