import { useRecoilValue } from "recoil";
import chatAppOpenState from "../../states/chat/ChatAppOpenState.ts";
import ChatAppHeader from "./header/ChatAppHeader.tsx";
import ChatAppMain from "./main/ChatAppMain.tsx";
import ChatAppFooter from "./footer/ChatAppFooter.tsx";

function ChatApp() {
  const chatAppOpen = useRecoilValue(chatAppOpenState);

  return (
    <div
      style={{
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        transitionProperty: "width",
        transition: "all 0.5s",
        width: chatAppOpen ? 480 : 0,
        height: "100%",
        borderLeft: "1px solid lightgray",
        background: "white",
      }}
    >
      <ChatAppHeader />
      <ChatAppMain />
      <ChatAppFooter />
    </div>
  );
}

export default ChatApp;
