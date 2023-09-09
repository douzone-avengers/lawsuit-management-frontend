import ChatAppBodyContainer from "../layout/ChatAppBodyContainer.tsx";
import ChatAppNavigationFooter from "../layout/ChatAppNavigationFooter.tsx";
import ChatAppPlainHeader from "../layout/ChatAppPlainHeader.tsx";
import ChatAppPersonAddButton from "../button/ChatAppPersonAddButton.tsx";
import ChatAppHeaderTitle from "../box/ChatAppHeaderTitle.tsx";
import { useEffect, useState } from "react";
import requestDeprecated from "../../../lib/requestDeprecated.ts";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import userState from "../../../states/user/UserState.ts";
import chatAppMyFriendsState from "../state/ChatAppMyFriendsState.ts";
import { convertHierarchy, convertRole } from "../../../lib/convert.ts";
import ChatAppPersonItem from "../box/ChatAppPersonItem.tsx";
import ChatAppHeaderText from "../box/ChatAppHeaderText.tsx";
import chatAppSceneState from "../state/ChatAppSceneState.ts";
import chatAppPersonInfoState from "../state/ChatAppPersonInfoState.ts";
import chatAppEmployeesState from "../state/ChatAppEmployeesState.ts";
import chatAppClientsState from "../state/ChatAppClientsState.ts";
import { SearchFriendsByEmailResponseType } from "../type/ResponseType.ts";

function ChatAppPersonScene() {
  const user = useRecoilValue(userState);
  const setUserInfo = useSetRecoilState(chatAppPersonInfoState);
  const setScene = useSetRecoilState(chatAppSceneState);
  const [friends, setFriends] = useRecoilState(chatAppMyFriendsState);
  const [employees, setEmployees] = useRecoilState(chatAppEmployeesState);
  const [clients, setClients] = useRecoilState(chatAppClientsState);

  const [displayMe, setDisplayMe] = useState(true);
  const [displayFriends, setDisplayFriends] = useState(true);
  const [displayEmployees, setDisplayEmployees] = useState(false);
  const [displayClients, setDisplayClients] = useState(false);

  useEffect(() => {
    if (user) {
      requestDeprecated("GET", `/chats/friends?email=${user.email}`, {
        onSuccess: (res) => {
          const body = res.data as SearchFriendsByEmailResponseType;
          setFriends(
            body.map((item) => {
              if (item.role === "의뢰인") {
                item.hierarchy = "고객";
              }
              return item;
            }),
          );
        },
      });
    }

    requestDeprecated("GET", `/chats/users/employees`, {
      onSuccess: (res) => {
        setEmployees(res.data);
      },
    });

    requestDeprecated("GET", `/chats/users/clients`, {
      onSuccess: (res) => {
        const body = res.data as SearchFriendsByEmailResponseType;
        setClients(
          body.map((item) => {
            if (item.role === "의뢰인") {
              item.hierarchy = "고객";
            }
            return item;
          }),
        );
      },
    });
  }, [user]);

  return (
    <>
      <ChatAppPlainHeader
        containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
        left={<ChatAppHeaderTitle>목록</ChatAppHeaderTitle>}
        right={<ChatAppPersonAddButton />}
      />
      <ChatAppBodyContainer style={{ paddingLeft: 20, paddingRight: 20 }}>
        <div>
          <ChatAppHeaderText
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "gray",
              paddingTop: 10,
              paddingLeft: 5,
              minHeight: 40,
            }}
          >
            <div>나</div>
            {displayMe ? (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setDisplayMe(false)}
              >
                ▼
              </div>
            ) : (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setDisplayMe(true)}
              >
                ▲
              </div>
            )}
          </ChatAppHeaderText>
          {displayMe && (
            <ChatAppPersonItem
              role={convertRole(user?.roleId ?? 0)}
              hierarchy={convertHierarchy(user?.hierarchyId ?? 0)}
              name={user?.name ?? ""}
              hover={true}
              onClick={() => {
                setUserInfo({
                  state: "Ready",
                  targetEmail: user?.email ?? "",
                });
                setScene("PersonInfo");
              }}
            />
          )}
        </div>
        <div style={{ borderBottom: "1px solid lightgray" }}></div>
        <ChatAppHeaderText
          style={{
            color: "gray",
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 10,
            paddingLeft: 5,
            minHeight: 40,
          }}
        >
          <div>즐겨찾기 ({friends.length})</div>
          {displayFriends ? (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setDisplayFriends(false)}
            >
              ▼
            </div>
          ) : (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setDisplayFriends(true)}
            >
              ▲
            </div>
          )}
        </ChatAppHeaderText>
        {displayFriends &&
          friends.map((item) => (
            <ChatAppPersonItem
              key={item.id}
              name={item.name}
              role={item.role}
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
        <div style={{ borderBottom: "1px solid lightgray" }}></div>
        <ChatAppHeaderText
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "gray",
            paddingTop: 10,
            paddingLeft: 5,
            minHeight: 40,
          }}
        >
          <div>사원 ({employees.length})</div>
          {displayEmployees ? (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setDisplayEmployees(false)}
            >
              ▼
            </div>
          ) : (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setDisplayEmployees(true)}
            >
              ▲
            </div>
          )}
        </ChatAppHeaderText>
        {displayEmployees &&
          employees.map((item) => (
            <ChatAppPersonItem
              key={item.id}
              name={item.name}
              role={item.role}
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
        <div style={{ borderBottom: "1px solid lightgray" }}></div>
        <ChatAppHeaderText
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "gray",
            paddingTop: 10,
            paddingLeft: 5,
            minHeight: 40,
          }}
        >
          <div>고객 ({clients.length})</div>
          {displayClients ? (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setDisplayClients(false)}
            >
              ▼
            </div>
          ) : (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setDisplayClients(true)}
            >
              ▲
            </div>
          )}
        </ChatAppHeaderText>
        {displayClients &&
          clients.map((item) => (
            <ChatAppPersonItem
              key={item.id}
              name={item.name}
              role={item.role}
              hierarchy="고객"
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
