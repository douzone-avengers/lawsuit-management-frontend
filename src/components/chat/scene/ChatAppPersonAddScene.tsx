import ChatAppPlainHeader from "../layout/ChatAppPlainHeader.tsx";
import ChatAppBodyContainer from "../layout/ChatAppBodyContainer.tsx";
import ChatAppBackButton from "../button/ChatAppBackButton.tsx";
import ChatAppPersonSearchInput from "../input/ChatAppPersonSearchInput.tsx";
import ChatAppPersonSearchButton from "../button/ChatAppPersonSearchButton.tsx";
import ChatAppPersonSearchBox from "../box/ChatAppPersonSearchBox.tsx";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import chatAppUserSearchResultState from "../state/ChatAppUserSearchResultState.ts";
import chatAppUserSearchEmailState from "../state/ChatAppUserSearchEmailState.ts";

function ChatAppPersonAddScene() {
  const setSearchResult = useSetRecoilState(chatAppUserSearchResultState);
  const setSearchEmail = useSetRecoilState(chatAppUserSearchEmailState);

  useEffect(() => {
    return () => {
      setSearchResult({
        status: "Init",
      });
      setSearchEmail("");
    };
  }, []);

  return (
    <>
      <ChatAppPlainHeader
        containerStyle={{
          paddingLeft: 5,
          border: "none",
        }}
        left={
          <div style={{ display: "flex", gap: 5 }}>
            <ChatAppBackButton scene={"Person"} />
          </div>
        }
      />
      <ChatAppBodyContainer
        style={{ padding: "40px 20px", height: "calc(100% - 64px)" }}
      >
        <div style={{ display: "flex", marginBottom: 40 }}>
          <ChatAppPersonSearchInput />
          <ChatAppPersonSearchButton />
        </div>
        <ChatAppPersonSearchBox />
      </ChatAppBodyContainer>
    </>
  );
}

export default ChatAppPersonAddScene;
