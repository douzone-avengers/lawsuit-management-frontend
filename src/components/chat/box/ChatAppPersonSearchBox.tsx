import { useRecoilValue } from "recoil";
import chatAppUserSearchResultState from "../state/ChatAppUserSearchResultState.ts";
import { CircularProgress } from "@mui/material";
import ChatAppPersonAddCard from "./ChatAppPersonAddCard.tsx";

function ChatAppPersonSearchBox() {
  const searchResult = useRecoilValue(chatAppUserSearchResultState);

  const content =
    searchResult.status === "Init" ? (
      <div
        style={{
          fontSize: 18,
        }}
      >
        이메일을 입력해주세요.
      </div>
    ) : searchResult.status === "Searching" ? (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    ) : searchResult.status === "Success" ? (
      <ChatAppPersonAddCard
        name={searchResult.result?.name ?? ""}
        email={searchResult.result?.email ?? ""}
        hierarchy={searchResult.result?.hierarchy ?? ""}
      />
    ) : searchResult.status === "Fail" ? (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {searchResult.errMsg}
      </div>
    ) : null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 685,
        color: "gray",
      }}
    >
      {content}
    </div>
  );
}

export default ChatAppPersonSearchBox;
