import ChatAppBodyContainer from "../layout/ChatAppBodyContainer.tsx";
import ChatAppNavigationFooter from "../layout/ChatAppNavigationFooter.tsx";
import ChatAppPlainHeader from "../layout/ChatAppPlainHeader.tsx";
import ChatAppHeaderTitle from "../text/ChatAppHeaderTitle.tsx";

function ChatAppChatScene() {
  return (
    <>
      <ChatAppPlainHeader
        containerStyle={{ paddingLeft: 20 }}
        left={<ChatAppHeaderTitle>Chat</ChatAppHeaderTitle>}
      />
      <ChatAppBodyContainer></ChatAppBodyContainer>
      <ChatAppNavigationFooter />
    </>
  );
}

export default ChatAppChatScene;
