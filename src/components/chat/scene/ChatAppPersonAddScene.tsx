import ChatAppPlainHeader from "../layout/ChatAppPlainHeader.tsx";
import ChatAppBodyContainer from "../layout/ChatAppBodyContainer.tsx";
import ChatAppBackButton from "../button/ChatAppBackButton.tsx";
import ChatAppHeaderTitle from "../text/ChatAppHeaderTitle.tsx";

function ChatAppPersonAddScene() {
  return (
    <>
      <ChatAppPlainHeader
        left={
          <div style={{ display: "flex", gap: 5 }}>
            <ChatAppBackButton />
            <ChatAppHeaderTitle>Person Add</ChatAppHeaderTitle>
          </div>
        }
      />
      <ChatAppBodyContainer
        style={{ height: "calc(100% - 64px)" }}
      ></ChatAppBodyContainer>
    </>
  );
}

export default ChatAppPersonAddScene;
