import SendIcon from "@mui/icons-material/Send";

function ChatAppChatMessageSendButton() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 64,
        color: "white",
        background: "#1976D2",
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
        cursor: "pointer",
      }}
    >
      <SendIcon />
    </div>
  );
}

export default ChatAppChatMessageSendButton;
