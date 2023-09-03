import ChatAppBodyContainer from "../layout/ChatAppBodyContainer.tsx";
import ChatAppNavigationFooter from "../layout/ChatAppNavigationFooter.tsx";
import ChatAppPlainHeader from "../layout/ChatAppPlainHeader.tsx";
import ChatAppPersonAddButton from "../button/ChatAppPersonAddButton.tsx";
import ChatAppHeaderTitle from "../box/ChatAppHeaderTitle.tsx";

function ChatAppPersonScene() {
  return (
    <>
      <ChatAppPlainHeader
        containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
        left={<ChatAppHeaderTitle>친구</ChatAppHeaderTitle>}
        right={<ChatAppPersonAddButton />}
      />
      <ChatAppBodyContainer></ChatAppBodyContainer>
      <ChatAppNavigationFooter />
    </>
  );
}

export default ChatAppPersonScene;
