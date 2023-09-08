import { useRecoilValue, useSetRecoilState } from "recoil";
import chatAppOpenState from "./state/ChatAppOpenState.ts";
import chatAppSceneState from "./state/ChatAppSceneState.ts";
import ChatAppPersonScene from "./scene/ChatAppPersonScene.tsx";
import ChatAppRoomScene from "./scene/ChatAppRoomScene.tsx";
import ChatAppPersonInfoScene from "./scene/ChatAppPersonInfoScene.tsx";
import ChatAppPersonAddScene from "./scene/ChatAppPersonAddScene.tsx";
import ChatAppErrorPopUp from "./popup/ChatAppErrorPopUp.tsx";
import chatAppErrorState from "./state/ChatAppErrorState.ts";
import chatAppSuccessState from "./state/ChatAppSuccessState.ts";
import ChatAppSuccessPopUp from "./popup/ChatAppSuccessPopUp.tsx";
import ChatAppRoomChatScene from "./scene/ChatAppRoomChatScene.tsx";
import { useEffect } from "react";
import socket from "./socket.ts";
import userState from "../../states/user/UserState.ts";
import { GetAllMessagesResponseType } from "./type/ResponseType.ts";
import chatAppRoomMessagesState from "./state/ChatAppRoomMessagesState.ts";
import chatAppRoomInfoState from "./state/ChatAppRoomInfoState.ts";
import chatAppRoomListState from "./state/ChatAppRoomListState.ts";
import requestDeprecated from "../../lib/requestDeprecated.ts";
import chatAppUnreadCountState from "./state/ChatAppUnreadCountState.ts";

function ChatApp() {
  const user = useRecoilValue(userState);
  const open = useRecoilValue(chatAppOpenState);
  const scene = useRecoilValue(chatAppSceneState);
  const success = useRecoilValue(chatAppSuccessState);
  const error = useRecoilValue(chatAppErrorState);
  const roomInfo = useRecoilValue(chatAppRoomInfoState);

  const setUnreadCount = useSetRecoilState(chatAppUnreadCountState);
  const setRoomMessages = useSetRecoilState(chatAppRoomMessagesState);
  const setRooms = useSetRecoilState(chatAppRoomListState);

  useEffect(() => {
    const handleConnect = () => {
      console.log("Connect");
    };
    const handleDisconnect = () => {
      console.log("Disconnect");
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    requestDeprecated("GET", "/chats/rooms", {
      onSuccess: (res) => {
        setRooms(res.data);
      },
    });

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      setRooms([]);
    };
  }, []);

  useEffect(() => {
    requestDeprecated("GET", `/chats/messages/unread/total`, {
      onSuccess: (res) => {
        setUnreadCount(res.data);
      },
    });
    const handleReceiveMessage = (res: GetAllMessagesResponseType) => {
      requestDeprecated("GET", "/chats/rooms", {
        onSuccess: (res) => {
          setRooms(res.data);
        },
      });
      requestDeprecated("GET", `/chats/messages/unread/total`, {
        onSuccess: (res) => {
          setUnreadCount(res.data);
        },
      });
      if (
        roomInfo.state === "Complete" &&
        roomInfo.value.id === res[0].roomId
      ) {
        setRoomMessages(res);
        requestDeprecated(
          "PATCH",
          `/chats/messages/read?room=${roomInfo.value.id}`,
          {
            onSuccess: () => {},
          },
        );
      }
    };

    if (user) {
      socket.on(`receive-message/${user?.id}`, handleReceiveMessage);
    }

    return () => {
      if (user) {
        socket.off(`receive-message/${user?.id}`, handleReceiveMessage);
      }
    };
  }, [user, roomInfo]);

  useEffect(() => {
    requestDeprecated("GET", `/messages/unread/total`, {
      onSuccess: (res) => {
        setUnreadCount(res.data);
      },
    });
  }, [scene]);

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
        userSelect: "none",
      }}
    >
      {scene === "Person" ? (
        <ChatAppPersonScene />
      ) : scene === "PersonAdd" ? (
        <ChatAppPersonAddScene />
      ) : scene === "PersonInfo" ? (
        <ChatAppPersonInfoScene />
      ) : scene === "Room" ? (
        <ChatAppRoomScene />
      ) : scene === "RoomChat" ? (
        <ChatAppRoomChatScene />
      ) : null}
      {success !== null ? <ChatAppSuccessPopUp /> : null}
      {error !== null ? <ChatAppErrorPopUp /> : null}
    </div>
  );
}

export default ChatApp;
