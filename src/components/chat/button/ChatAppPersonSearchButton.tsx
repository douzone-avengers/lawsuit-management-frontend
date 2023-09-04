import SearchIcon from "@mui/icons-material/Search";
import { useRecoilState, useSetRecoilState } from "recoil";
import chatAppUserSearchEmailState from "../state/ChatAppUserSearchEmailState.ts";
import requestDeprecated from "../../../lib/requestDeprecated.ts";
import chatAppUserSearchResultState from "../state/ChatAppUserSearchResultState.ts";
import chatAppSceneState from "../state/ChatAppSceneState.ts";
import chatAppPersonInfoState from "../state/ChatAppPersonInfo.ts";

function ChatAppPersonSearchButton() {
  const [email, setEmail] = useRecoilState(chatAppUserSearchEmailState);
  const setSearchResult = useSetRecoilState(chatAppUserSearchResultState);
  const setScene = useSetRecoilState(chatAppSceneState);
  const setPersonInfo = useSetRecoilState(chatAppPersonInfoState);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 42,
        width: 64,
        color: "white",
        background: "#1976D2",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        cursor: "pointer",
      }}
      onClick={() => {
        requestDeprecated("GET", `/chats/user?email=${email}`, {
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
          onFail: () => {
            setEmail("");
            setSearchResult({
              status: "Init",
            });
          },
        });

        setSearchResult({
          status: "Searching",
        });
      }}
    >
      <SearchIcon />
    </div>
  );
}

export default ChatAppPersonSearchButton;
