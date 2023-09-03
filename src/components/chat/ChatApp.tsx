import { useRecoilValue } from "recoil";
import chatAppOpenState from "./state/ChatAppOpenState.ts";
import chatAppSceneState from "./state/ChatAppSceneState.ts";
import ChatAppPersonScene from "./scene/ChatAppPersonScene.tsx";
import ChatAppRoomScene from "./scene/ChatAppRoomScene.tsx";
import ChatAppPersonAddScene from "./scene/ChatAppPersonAddScene.tsx";
import ChatAppErrorPopUp from "./popup/ChatAppErrorPopUp.tsx";
import chatAppErrorState from "./state/ChatAppErrorState.ts";
import chatAppSuccessState from "./state/ChatAppSuccessState.ts";
import ChatAppSuccessPopUp from "./popup/ChatAppSuccessPopUp.tsx";

function ChatApp() {
  const open = useRecoilValue(chatAppOpenState);
  const scene = useRecoilValue(chatAppSceneState);
  const success = useRecoilValue(chatAppSuccessState);
  const error = useRecoilValue(chatAppErrorState);

  return (
    <div
      style={{
        zIndex: 2,
        display: "flex",
        position: "relative",
        flexDirection: "column",
        transitionProperty: "width",
        transition: "all 0.5s",
        width: open ? 480 : 0,
        height: "100%",
        borderLeft: "1px solid lightgray",
        background: "white",
      }}
    >
      {scene === "Person" ? (
        <ChatAppPersonScene />
      ) : scene === "PersonAdd" ? (
        <ChatAppPersonAddScene />
      ) : scene === "Room" ? (
        <ChatAppRoomScene />
      ) : null}
      {success !== null ? <ChatAppSuccessPopUp /> : null}
      {error !== null ? <ChatAppErrorPopUp /> : null}
    </div>
  );
}

export default ChatApp;
