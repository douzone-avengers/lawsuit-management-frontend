import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import isLoginState from "../../states/common/IsLoginState";
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

function Layout() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const navigate = useNavigate();
  const [, setHierarchyList] = useRecoilState(hierarchyListState);
  const [, setRoleList] = useRecoilState(roleListState);
  const [roleLoaded, setRoleLoaded] = useState(false);
  const [hierarchyLoaded, setHierarchyLoaded] = useState(false);
  const [clientRegisterPopUp] = useRecoilState(clientRegisterPopUpOpenState);
  const [clientRemovePopUpOpen] = useRecoilState(clientRemovePopUpOpenState);

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
    if (!isLogin) {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setIsLogin(false);
        navigate("login");
      }
      setIsLogin(true);
    }
  }, [isLogin]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Header />
        <SideNavigationBar />
        <Main />
        {import.meta.env.DEV ? <Debug /> : null}
      </Box>
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
