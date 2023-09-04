import ChatAppFooterContainer from "./ChatAppFooterContainer.tsx";
import ChatAppPersonFooterButton from "../button/ChatAppPersonFooterButton.tsx";
import ChatAppRoomFooterButton from "../button/ChatAppRoomFooterButton.tsx";

function ChatAppNavigationFooter() {
  return (
    <ChatAppFooterContainer>
      <div
        style={{
          display: "flex",
          height: "100%",
        }}
      >
        <ChatAppPersonFooterButton />
        <ChatAppRoomFooterButton />
      </div>
    </ChatAppFooterContainer>
  );
}

export default ChatAppNavigationFooter;
