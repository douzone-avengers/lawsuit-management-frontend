import ChatAppFooterContainer from "./ChatAppFooterContainer.tsx";
import ChatAppPersonFooterButton from "../button/ChatAppPersonFooterButton.tsx";
import ChatAppChatFooterButton from "../button/ChatAppChatFooterButton.tsx";

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
        <ChatAppChatFooterButton />
      </div>
    </ChatAppFooterContainer>
  );
}

export default ChatAppNavigationFooter;
