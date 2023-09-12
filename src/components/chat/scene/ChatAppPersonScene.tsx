import ChatAppBodyContainer from "../layout/ChatAppBodyContainer.tsx";
import ChatAppNavigationFooter from "../layout/ChatAppNavigationFooter.tsx";
import ChatAppPlainHeader from "../layout/ChatAppPlainHeader.tsx";
import ChatAppPersonAddButton from "../button/ChatAppPersonAddButton.tsx";
import ChatAppHeaderTitle from "../box/ChatAppHeaderTitle.tsx";
import { useEffect, useState } from "react";
import requestDeprecated from "../../../lib/requestDeprecated.ts";
import { useRecoilState, useRecoilValue } from "recoil";
import userState, { isEmployeeState } from "../../../states/user/UserState.ts";
import { convertHierarchy, convertRole } from "../../../lib/convert.ts";
import ChatAppPersonItem from "../box/ChatAppPersonItem.tsx";
import ChatAppHeaderText from "../box/ChatAppHeaderText.tsx";
import chatAppAllUserState from "../state/ChatAppAllUserState.ts";
import { SearchAllUsersResponseType } from "../type/ResponseType.ts";

function ChatAppPersonScene() {
  const user = useRecoilValue(userState);
  const [allUser, setAllUser] = useRecoilState(chatAppAllUserState);

  const isEmployee = useRecoilValue(isEmployeeState);

  const [displayMe, setDisplayMe] = useState(true);
  const [displayFriends, setDisplayFriends] = useState(true);
  const [displayEmployees, setDisplayEmployees] = useState(false);
  const [displayClients, setDisplayClients] = useState(false);

  const friends = allUser.filter(
    (item) => item.isFriend && item.id !== user?.id,
  );
  const employees = allUser.filter((item) => item.role !== "의뢰인");
  const clients = allUser.filter((item) => item.role === "의뢰인");

  useEffect(() => {
    if (user) {
      requestDeprecated("GET", `/chats/users/all?email=${user.email}`, {
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
  }, [user]);

  return (
    <>
      <ChatAppPlainHeader
        containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
        left={<ChatAppHeaderTitle>홈</ChatAppHeaderTitle>}
        right={isEmployee ? <ChatAppPersonAddButton /> : null}
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
              email={user?.email ?? ""}
              role={convertRole(user?.roleId ?? 0)}
              hierarchy={
                (user?.roleId ?? 1) === 1
                  ? "고객"
                  : convertHierarchy(user?.hierarchyId ?? 0)
              }
              name={user?.name ?? ""}
              hover={false}
              // onClick={() => {
              //   setUserInfo({
              //     state: "Ready",
              //     targetEmail: user?.email ?? "",
              //   });
              //   setScene("PersonInfo");
              // }}
              me={true}
              isFriend={false}
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
              email={item.email}
              name={item.name}
              role={item.role}
              hierarchy={item.hierarchy}
              hover={false}
              // onClick={() => {
              //   setUserInfo({
              //     state: "Ready",
              //     targetEmail: item.email,
              //   });
              //   setScene("PersonInfo");
              // }}
              me={item.id === user?.id}
              isFriend={item.isFriend}
            />
          ))}
        <div style={{ borderBottom: "1px solid lightgray" }}></div>
        {isEmployee && (
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
                  email={item.email}
                  name={item.name}
                  role={item.role}
                  hierarchy={item.hierarchy}
                  hover={false}
                  // onClick={() => {
                  //   setUserInfo({
                  //     state: "Ready",
                  //     targetEmail: item.email,
                  //   });
                  //   setScene("PersonInfo");
                  // }}
                  me={item.id === user?.id}
                  isFriend={item.isFriend}
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
                  email={item.email}
                  name={item.name}
                  role={item.role}
                  hierarchy="고객"
                  hover={false}
                  // onClick={() => {
                  //   setUserInfo({
                  //     state: "Ready",
                  //     targetEmail: item.email,
                  //   });
                  //   setScene("PersonInfo");
                  // }}
                  me={item.id === user?.id}
                  isFriend={item.isFriend}
                />
              ))}
          </div>
        )}
      </ChatAppBodyContainer>
      <ChatAppNavigationFooter />
    </>
  );
}

export default ChatAppPersonScene;
