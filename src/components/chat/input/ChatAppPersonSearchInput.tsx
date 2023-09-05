import { useRecoilState, useSetRecoilState } from "recoil";
import chatAppUserSearchEmailState from "../state/ChatAppUserSearchEmailState.ts";
import requestDeprecated from "../../../lib/requestDeprecated.ts";
import chatAppUserSearchResultState from "../state/ChatAppUserSearchResultState.ts";
import chatAppSceneState from "../state/ChatAppSceneState.ts";
import chatAppPersonInfoState from "../state/ChatAppPersonInfo.ts";
import chatAppErrorState from "../state/ChatAppErrorState.ts";

function ChatAppPersonSearchInput() {
  const [email, setEmail] = useRecoilState(chatAppUserSearchEmailState);
  const setSearchResult = useSetRecoilState(chatAppUserSearchResultState);
  const setScene = useSetRecoilState(chatAppSceneState);
  const setPersonInfo = useSetRecoilState(chatAppPersonInfoState);
  const setError = useSetRecoilState(chatAppErrorState);

  return (
    <input
      style={{
        color: "gray",
        width: "calc(100% - 64px)",
        height: 42,
        outline: "none",
        border: "1px solid #1976D2",
        fontSize: 18,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        paddingLeft: 20,
      }}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          requestDeprecated("GET", `/chats/users?email=${email}`, {
            onSuccess: (res) => {
              setEmail("");
              if (!res.data) {
                setSearchResult({
                  status: "Fail",
                  errMsg: "해당 이메일을 가진 유저를 찾을 수 없습니다.",
                });
                return;
              }
              setSearchResult({
                status: "Success",
              });
              setScene("PersonInfo");
              setPersonInfo({
                state: "Ready",
                targetEmail: email,
              });
            },
            onFail: (e) => {
              setError({
                msg: e.response.data.message,
                callback: () => {},
              });
              setEmail("");
              setSearchResult({
                status: "Init",
              });
            },
          });

          setSearchResult({
            status: "Searching",
          });
        }
      }}
    />
  );
}

export default ChatAppPersonSearchInput;
