import ChatAppBodyContainer from "../layout/ChatAppBodyContainer.tsx";
import ChatAppNavigationFooter from "../layout/ChatAppNavigationFooter.tsx";
import ChatAppPlainHeader from "../layout/ChatAppPlainHeader.tsx";
import ChatAppPersonAddButton from "../button/ChatAppPersonAddButton.tsx";
import ChatAppHeaderTitle from "../box/ChatAppHeaderTitle.tsx";
import { useEffect } from "react";
import requestDeprecated from "../../../lib/requestDeprecated.ts";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import userState from "../../../states/user/UserState.ts";
import chatAppMyFriendsState from "../state/ChatAppMyFriendsState.ts";
import { convertHierarchy } from "../../../lib/convert.ts";
import ChatAppPersonItem from "../box/ChatAppPersonItem.tsx";
import ChatAppHeaderText from "../box/ChatAppHeaderText.tsx";
import chatAppSceneState from "../state/ChatAppSceneState.ts";
import chatAppPersonInfoState from "../state/ChatAppPersonInfoState.ts";

function ChatAppPersonScene() {
  const user = useRecoilValue(userState);
  const setUserInfo = useSetRecoilState(chatAppPersonInfoState);
  const setScene = useSetRecoilState(chatAppSceneState);
  const [friends, setFriends] = useRecoilState(chatAppMyFriendsState);

  useEffect(() => {
    if (user) {
      requestDeprecated("GET", `/chats/friends?email=${user.email}`, {
        onSuccess: (res) => {
          setFriends(res.data);
        },
      });
    }
  }, [user]);

  return (
    <>
      <ChatAppPlainHeader
        containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
        left={<ChatAppHeaderTitle>친구</ChatAppHeaderTitle>}
        right={<ChatAppPersonAddButton />}
      />
      <ChatAppBodyContainer style={{ paddingLeft: 20, paddingRight: 20 }}>
        <div>
          <ChatAppHeaderText
            style={{
              color: "gray",
              paddingTop: 10,
              paddingLeft: 5,
            }}
          >
            나
          </ChatAppHeaderText>
          <ChatAppPersonItem
            hierarchy={convertHierarchy(user?.hierarchyId ?? 0)}
            name={user?.name ?? ""}
            style={{ borderBottom: "1px solid lightgray" }}
            hover={true}
            onClick={() => {
              setUserInfo({
                state: "Ready",
                targetEmail: user?.email ?? "",
              });
              setScene("PersonInfo");
            }}
          />
        </div>
        <ChatAppHeaderText
          style={{
            color: "gray",
            paddingTop: 10,
            paddingLeft: 5,
          }}
        >
          친구 ({friends.length})
        </ChatAppHeaderText>
        {friends.map((item) => (
          <ChatAppPersonItem
            key={item.id}
            name={item.name}
            hierarchy={item.hierarchy}
            hover={true}
            onClick={() => {
              setUserInfo({
                state: "Ready",
                targetEmail: item.email,
              });
              setScene("PersonInfo");
            }}
          />
        ))}
      </ChatAppBodyContainer>
      <ChatAppNavigationFooter />
    </>
  );
}

export default ChatAppPersonScene;
