import PersonIcon from "@mui/icons-material/Person";
import { CSSProperties, useState } from "react";
import requestDeprecated from "../../../lib/requestDeprecated.ts";
import { useRecoilValue, useSetRecoilState } from "recoil";
import chatAppAllUserState from "../state/ChatAppAllUserState.ts";
import userState from "../../../states/user/UserState.ts";
import {
  CreateRoomResponseType,
  GetOneToOneRoomByEmailResponseType,
  SearchAllUsersResponseType,
} from "../type/ResponseType.ts";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import chatAppSceneState from "../state/ChatAppSceneState.ts";
import chatAppRoomInfoState from "../state/ChatAppRoomInfoState.ts";
import chatAppErrorState from "../state/ChatAppErrorState.ts";
import chatAppPersonInfoState from "../state/ChatAppPersonInfoState.ts";

type Props = {
  hierarchy: string;
  email: string;
  name: string;
  role: string;
  style?: CSSProperties;
  hover?: boolean;
  onClick?: () => void;
  me: boolean;
  isFriend: boolean;
};

function ChatAppPersonItem({
  hierarchy,
  email,
  name,
  role,
  style,
  onClick,
  me,
  isFriend,
  hover = false,
}: Props) {
  const user = useRecoilValue(userState);
  const setAllUser = useSetRecoilState(chatAppAllUserState);
  const [background, setBackground] = useState("white");
  const setError = useSetRecoilState(chatAppErrorState);
  const setScene = useSetRecoilState(chatAppSceneState);
  const setRoomInfo = useSetRecoilState(chatAppRoomInfoState);
  const setUserInfo = useSetRecoilState(chatAppPersonInfoState);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        paddingTop: 10,
        paddingBottom: 10,
        cursor: hover ? "pointer" : "",
        background,
        ...style,
      }}
      onClick={onClick ? onClick : undefined}
      onMouseOver={() => {
        if (hover) {
          setBackground("#1976D210");
        }
      }}
      onMouseLeave={() => {
        if (hover) {
          setBackground("white");
        }
      }}
    >
      <div
        style={{
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: role !== "의뢰인" ? "#1976D2" : "gray",
          width: 48,
          height: 48,
          cursor: "pointer",
        }}
        onClick={() => {
          setUserInfo({
            state: "Ready",
            targetEmail: email ?? "",
          });
          setScene("PersonInfo");
        }}
      >
        <PersonIcon sx={{ color: "white", width: 32, height: 32 }} />
      </div>
      <div
        style={{
          display: "flex",
          width: 320,
          flexDirection: "column",
          paddingLeft: 10,
        }}
      >
        <div>
          <div
            style={{
              height: "100%",
              width: "100%",
              fontSize: 16,
            }}
          >
            {name}
          </div>
          <div
            style={{
              width: "100%",
              height: "100%",
              fontSize: 14,
              paddingLeft: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {hierarchy}
          </div>
        </div>
      </div>
      {!me && (
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 30,
              width: 30,
              borderRadius: "50%",
              cursor: "pointer",
            }}
            onClick={() => {
              if (user) {
                requestDeprecated("PATCH", "/chats/friends/toggle", {
                  body: {
                    email,
                  },
                  onSuccess: (res) => {
                    const body: SearchAllUsersResponseType = res.data;
                    const newAllUser = body.map((item) => ({
                      ...item,
                      hierarchy:
                        item.role === "의뢰인" && item.hierarchy === "없음"
                          ? "고객"
                          : item.hierarchy,
                    }));
                    setAllUser(newAllUser);
                  },
                });
              }
            }}
          >
            {isFriend ? (
              <StarIcon sx={{ color: "#1976D2" }} />
            ) : (
              <StarBorderIcon sx={{ color: "gray" }} />
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 30,
              width: 30,
              borderRadius: "50%",
              cursor: "pointer",
              color: "gray",
            }}
            onClick={() => {
              requestDeprecated(
                "GET",
                `/chats/rooms/one-to-one?email=${email}`,
                {
                  onSuccess: (res) => {
                    const body: GetOneToOneRoomByEmailResponseType = res.data;
                    if (!body) {
                      if (!user) {
                        setError({
                          msg: "유저가 존재하지 않습니다.",
                          callback: () => {},
                        });
                        return;
                      }
                      requestDeprecated("POST", "/chats/rooms", {
                        body: {
                          type: "oneToOne",
                          name: null,
                          isShow: false,
                          emails: [user.email, email],
                        },
                        onSuccess: (res) => {
                          const body = res.data as CreateRoomResponseType;
                          setRoomInfo({
                            state: "Ready",
                            value: body,
                          });
                          setScene("RoomChat");
                        },
                        onFail: (e) => {
                          setError({
                            msg: e.response.data.message,
                            callback: () => {},
                          });
                        },
                      });
                      return;
                    }
                    setRoomInfo({
                      state: "Ready",
                      value: body,
                    });
                    setScene("RoomChat");
                  },
                  onFail: (e) => {
                    setError({
                      msg: e.response.data.message,
                      callback: () => {},
                    });
                  },
                },
              );
            }}
          >
            <ChatBubbleOutlineOutlined sx={{ height: 21, color: "" }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatAppPersonItem;
