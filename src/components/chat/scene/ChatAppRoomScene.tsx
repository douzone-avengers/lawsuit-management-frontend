import ChatAppBodyContainer from "../layout/ChatAppBodyContainer.tsx";
import ChatAppNavigationFooter from "../layout/ChatAppNavigationFooter.tsx";
import ChatAppPlainHeader from "../layout/ChatAppPlainHeader.tsx";
import ChatAppHeaderTitle from "../box/ChatAppHeaderTitle.tsx";

function ChatAppRoomScene() {
  return (
    <>
      <ChatAppPlainHeader
        containerStyle={{ paddingLeft: 20 }}
        left={<ChatAppHeaderTitle>채팅</ChatAppHeaderTitle>}
      />
      <ChatAppBodyContainer></ChatAppBodyContainer>
      <ChatAppNavigationFooter />
    </>
  );
}

export default ChatAppRoomScene;
