import ChatAppBodyContainer from "../layout/ChatAppBodyContainer.tsx";
import { useRecoilState, useSetRecoilState } from "recoil";
import chatAppPersonInfoState from "../state/ChatAppPersonInfo.ts";
import { useEffect } from "react";
import chatAppSceneState from "../state/ChatAppSceneState.ts";
import requestDeprecated from "../../../lib/requestDeprecated.ts";
import chatAppErrorState from "../state/ChatAppErrorState.ts";
import { CircularProgress } from "@mui/material";
import ChatAppPlainHeader from "../layout/ChatAppPlainHeader.tsx";
import ChatAppBackButton from "../button/ChatAppBackButton.tsx";
import PersonIcon from "@mui/icons-material/Person";
import ChatAppTag from "../box/ChatAppTag.tsx";
import ChatAppFooterContainer from "../layout/ChatAppFooterContainer.tsx";

function ChatAppPersonInfoScene() {
  const setScene = useSetRecoilState(chatAppSceneState);
  const [personInfo, setPersonInfo] = useRecoilState(chatAppPersonInfoState);
  const setError = useSetRecoilState(chatAppErrorState);

  useEffect(() => {
    if (personInfo.state === "Init") {
      setScene("Person");
    } else if (personInfo.state === "Ready") {
      requestDeprecated(
        "GET",
        `/chats/user/detail?email=${personInfo.targetEmail}`,
        {
          onSuccess: (res) => {
            setPersonInfo({
              state: "Complete",
              result: "Success",
              value: res.data,
            });
          },
          onFail: (e) => {
            setPersonInfo({
              state: "Complete",
              result: "Failure",
              errMsg: e.response.data.message,
            });
          },
        },
      );
      setPersonInfo({
        state: "Loading",
      });
    } else if (personInfo.state === "Complete") {
      if (personInfo.result === "Failure") {
        setError({
          msg: personInfo.errMsg,
          callback: () => {
            setScene("Person");
          },
        });
      }
    }
  }, [personInfo]);

  return (
    <>
      <ChatAppPlainHeader
        containerStyle={{
          paddingLeft: 5,
          borderBottom: "none",
        }}
        left={
          <div style={{ display: "flex", gap: 5 }}>
            <ChatAppBackButton />
          </div>
        }
      />
      <ChatAppBodyContainer>
        {personInfo.state === "Complete" && personInfo.result === "Success" ? (
          <div
            style={{
              display: "flex",
              marginTop: 40,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#1976D2",
                width: 96,
                height: 96,
                marginBottom: 20,
              }}
            >
              <PersonIcon sx={{ color: "white", width: 64, height: 64 }} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
                marginBottom: 5,
              }}
            >
              <ChatAppTag header="이름" content={personInfo.value.name} />
              <ChatAppTag header="직급" content={personInfo.value.hierarchy} />
              <ChatAppTag header="이메일" content={personInfo.value.email} />
            </div>
            <div
              style={{
                border: "1px solid #1976D2",
                width: 320,
                height: 420,
              }}
            >
              <div
                style={{
                  background: "#1976D2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  color: "white",
                  height: 40,
                }}
              >
                담당 사건
              </div>
              <div
                style={{
                  height: "calc(100% - 40px)",
                  overflow: "auto",
                  padding: 20,
                  gap: 5,
                }}
              >
                {personInfo.value.lawsuits.length !== 0 ? (
                  personInfo.value.lawsuits.map((item, index) => (
                    <div
                      key={item.id}
                      style={{
                        overflowX: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "100%",
                        marginBottom:
                          index !== personInfo.value.lawsuits.length - 1
                            ? 10
                            : 0,
                      }}
                    >
                      <ChatAppTag
                        header={item.type}
                        content={item.name}
                        width="100%"
                      />
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    담당 중인 사건이 없습니다.
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : personInfo.state === "Loading" ? (
          <CircularProgress />
        ) : null}
      </ChatAppBodyContainer>
      <ChatAppFooterContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "Center",
            height: "100%",
            gap: 20,
          }}
        ></div>
      </ChatAppFooterContainer>
    </>
  );
}

export default ChatAppPersonInfoScene;
