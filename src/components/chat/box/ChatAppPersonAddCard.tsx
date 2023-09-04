import PersonIcon from "@mui/icons-material/Person";
import requestDeprecated from "../../../lib/requestDeprecated.ts";
import { useSetRecoilState } from "recoil";
import chatAppErrorState from "../state/ChatAppErrorState.ts";
import chatAppUserSearchResultState from "../state/ChatAppUserSearchResultState.ts";
import chatAppSuccessState from "../state/ChatAppSuccessState.ts";
import chatAppSceneState from "../state/ChatAppSceneState.ts";

type Props = {
  name: string;
  hierarchy: string;
  email: string;
};

function ChatAppPersonAddCard({ name, hierarchy, email }: Props) {
  const setScene = useSetRecoilState(chatAppSceneState);
  const setSuccess = useSetRecoilState(chatAppSuccessState);
  const setError = useSetRecoilState(chatAppErrorState);
  const setSearchResult = useSetRecoilState(chatAppUserSearchResultState);

  return (
    <div
      style={{
        border: "1px solid #1976D2",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 320,
        height: 160,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: 120,
          gap: 15,
          paddingLeft: 20,
        }}
      >
        <div
          style={{
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#1976D2",
            width: 64,
            height: 64,
          }}
        >
          <PersonIcon sx={{ color: "white", width: 48, height: 48 }} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            fontSize: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #1976D2",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 100,
                height: "100%",
                background: "#1976D2",
                padding: "4px 8px",
                color: "white",
              }}
            >
              {hierarchy}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 100,

                height: "100%",
              }}
            >
              {name}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {email}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          background: "#1976D2",
          cursor: "pointer",
          width: "100%",
          height: 40,
        }}
        onClick={() => {
          requestDeprecated("POST", `/chats/friend/add`, {
            body: {
              email,
            },
            onSuccess: () => {
              setSuccess({
                msg: "친구 추가 성공.",
                callback: () => {
                  setScene("Person");
                },
              });
            },
            onFail: (e) => {
              setError({
                msg: e.response.data.message,
                callback: () => {
                  setSearchResult({
                    result: null,
                    status: "Init",
                    errMsg: null,
                  });
                },
              });
            },
          });
        }}
      >
        추가
      </div>
    </div>
  );
}

export default ChatAppPersonAddCard;
