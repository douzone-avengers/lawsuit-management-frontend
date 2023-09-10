import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Debug from "./Debug";
import Header from "./header/Header.tsx";
import Main from "./main/Main.tsx";
import SideNavigationBar from "./snb/SideNavigationBar.tsx";
import PageLoadingSpinner from "./PageLoadingSpinner.tsx";
import hierarchyListState, {
  Hierarchy,
} from "../../states/data/hierarchyListState";
import roleListState, { Role } from "../../states/data/roleListState";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../lib/requestDeprecated";
import ClientRegisterPopUp from "../client/ClientRegisterPopUp.tsx";
import ClientRemovePopUp from "../client/ClientRemovePopUp.tsx";
import clientRegisterPopUpOpenState from "../../states/layout/ClientRegisterPopUpOpenState.tsx";
import clientRemovePopUpOpenState from "../../states/client/ClientRemovePopUpOpenState.tsx";
import userState, { UserStateType } from "../../states/user/UserState.ts";
import chatAppOpenState from "../chat/state/ChatAppOpenState.ts";
import ChatApp from "../chat/ChatApp.tsx";
import sideNavigationBarOpenState from "../../states/layout/SideNavigationBarOpenState.tsx";
import subNavigationBarState from "../../states/layout/SubNavigationBarState.tsx";
import userClientIdState from "../../states/user/UserClientIdState.tsx";

function Layout() {
  const navigate = useNavigate();
  const [, setHierarchyList] = useRecoilState(hierarchyListState);
  const [, setRoleList] = useRecoilState(roleListState);
  const [roleLoaded, setRoleLoaded] = useState(false);
  const [hierarchyLoaded, setHierarchyLoaded] = useState(false);
  const [clientRegisterPopUp] = useRecoilState(clientRegisterPopUpOpenState);
  const [clientRemovePopUpOpen] = useRecoilState(clientRemovePopUpOpenState);
  const [user, setUser] = useRecoilState(userState);
  const setUserClientId = useSetRecoilState(userClientIdState);

  const chatAppOpen = useRecoilValue(chatAppOpenState);
  const sideNavigationBarOpen = useRecoilValue(sideNavigationBarOpenState);
  const subNavigationBar = useRecoilValue(subNavigationBarState);

  //set enum table
  //직급 리스트
  const hierarchyRequest = () => {
    const handelRequestSuccess: RequestSuccessHandler = (res) => {
      const data: Hierarchy[] = res.data;
      setHierarchyList(data);
      setHierarchyLoaded(true);
    };
    const handelRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/hierarchy`, {
      withToken: false,

      onSuccess: handelRequestSuccess,
      onFail: handelRequestFail,
    });
  };

  //권한 리스트
  const roleRequest = () => {
    const handelRequestSuccess: RequestSuccessHandler = (res) => {
      const data: Role[] = res.data;
      setRoleList(data);
      setRoleLoaded(true);
    };
    const handelRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/role`, {
      withToken: false,

      onSuccess: handelRequestSuccess,
      onFail: handelRequestFail,
    });
  };

  useEffect(() => {
    hierarchyRequest();
    roleRequest();
  }, []);

  useEffect(() => {
    if (user) {
      return;
    }

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/login");
      return;
    }

    requestDeprecated("GET", "/members/me", {
      onSuccess: (res) => {
        const body: UserStateType = res.data;
        if (body.roleId === 1) {
          requestDeprecated("GET", "/members/", {
            onSuccess: (res) => {
              setUser(body);
              setUserClientId(res.data);
            },
          });
        } else {
          setUser(body);
        }
      },
      onFail: () => {
        navigate("/login");
      },
    });
  }, [user]);

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <SideNavigationBar />
        <div
          style={{
            transitionProperty: "width",
            transition: "all 0.5s",
            width:
              !sideNavigationBarOpen &&
              subNavigationBar.type === "none" &&
              !chatAppOpen
                ? "calc(100%)" // 0 0 0
                : !sideNavigationBarOpen &&
                  subNavigationBar.type === "none" &&
                  chatAppOpen
                ? "calc(100% - 480px)" // 0 0 1
                : !sideNavigationBarOpen &&
                  subNavigationBar.type !== "none" &&
                  !chatAppOpen
                ? "calc(100%)" // 0 1 0
                : !sideNavigationBarOpen &&
                  subNavigationBar.type !== "none" &&
                  chatAppOpen
                ? "calc(100% - 480px)" // 0 1 1
                : sideNavigationBarOpen &&
                  subNavigationBar.type === "none" &&
                  !chatAppOpen
                ? "calc(100% - 240px)" // 1 0 0
                : sideNavigationBarOpen &&
                  subNavigationBar.type === "none" &&
                  chatAppOpen
                ? "calc(100% - 720px)" // 1 0 1
                : sideNavigationBarOpen &&
                  subNavigationBar.type !== "none" &&
                  !chatAppOpen
                ? "calc(100% - 480px)" // 1 1 0
                : sideNavigationBarOpen &&
                  subNavigationBar.type !== "none" &&
                  chatAppOpen
                ? "calc(100% - 960px)" // 1 1 1
                : "calc(100%)",
            // display: "flex",
            // flexDirection: "column",
            height: "100%",
          }}
        >
          <Header />
          <Main />
        </div>
        <ChatApp />
      </div>

      {import.meta.env.DEV ? <Debug /> : null}
      {!hierarchyLoaded ? (
        <PageLoadingSpinner>Hierarchy</PageLoadingSpinner>
      ) : !roleLoaded ? (
        <PageLoadingSpinner>Role</PageLoadingSpinner>
      ) : null}
      {clientRegisterPopUp ? <ClientRegisterPopUp /> : null}
      {clientRemovePopUpOpen ? <ClientRemovePopUp /> : null}
    </>
  );
}

export default Layout;
