import ChatAppPlainHeader from "../layout/ChatAppPlainHeader.tsx";
import ChatAppBodyContainer from "../layout/ChatAppBodyContainer.tsx";
import ChatAppBackButton from "../button/ChatAppBackButton.tsx";
import ChatAppHeaderTitle from "../box/ChatAppHeaderTitle.tsx";
import ChatAppPersonSearchInput from "../input/ChatAppPersonSearchInput.tsx";
import ChatAppPersonSearchButton from "../button/ChatAppPersonSearchButton.tsx";
import ChatAppPersonSearchBox from "../box/ChatAppPersonSearchBox.tsx";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import chatAppUserSearchResultState from "../state/ChatAppUserSearchResultState.ts";

function ChatAppPersonAddScene() {
  const setSearchResult = useSetRecoilState(chatAppUserSearchResultState);

  useEffect(() => {
    setSearchResult({
      status: "Init",
      result: null,
      errMsg: null,
    });
  }, []);

  return (
    <>
      <ChatAppPlainHeader
        containerStyle={{
          paddingLeft: 5,
        }}
        left={
          <div style={{ display: "flex", gap: 5 }}>
            <ChatAppBackButton />
            <ChatAppHeaderTitle>친구 추가</ChatAppHeaderTitle>
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
