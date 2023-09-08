import PersonIcon from "@mui/icons-material/Person";
import { MessageInfoType } from "../type/ResponseType.ts";
import { useRecoilValue } from "recoil";
import chatAppRoomInfoState from "../state/ChatAppRoomInfoState.ts";

type Props = {
  item: MessageInfoType;
};

function ChatAppYourMessageItem({ item }: Props) {
  const roomInfo = useRecoilValue(chatAppRoomInfoState);

  return roomInfo.state === "Complete" ? (
    <div style={{ display: "flex" }}>
      <div
        style={{
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1976D2",
          minWidth: 48,
          height: 48,
          marginRight: 10,
        }}
      >
        <PersonIcon sx={{ color: "white", width: 32, height: 32 }} />
      </div>
      <div style={{ marginRight: 16 }}>
        <div>
          {roomInfo.value.users.find((it) => it.id === item.senderId)?.name ??
            "???"}
        </div>
        <div
          style={{
            display: "inline-block",
            padding: 10,
            minWidth: 36,
            maxWidth: 240,
            minHeight: 44,
            maxHeight: 620,
            color: "white",
            background: "#1976D2",
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            whiteSpace: "pre-line",
            overflow: "auto",
          }}
        >
          {item.content}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 12,
          color: "gray",
          alignItems: "flex-end",
        }}
      >
        {item.createdAt}
      </div>
    </div>
  ) : null;
}

export default ChatAppYourMessageItem;
