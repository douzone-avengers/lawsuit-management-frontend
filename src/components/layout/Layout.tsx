import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import isLoginState from "../../states/common/IsLoginState";
import clientRegisterPopUpState from "../../states/layout/ClientRegisterPopUpOpenState";
import ClientRegisterPopUp from "../client/ClientRegisterPopUp.tsx";
import Debug from "./Debug";
import Header from "./header/Header.tsx";
import Main from "./main/Main.tsx";
import SideNavigationBar from "./snb/SideNavigationBar.tsx";
import ClientRemovePopUp from "../client/ClientRemovePopUp.tsx";
import clientRemovePopUpOpenState from "../../states/client/ClientRemovePopUpOpenState.tsx";
import loadingState from "../../states/layout/LoadingState.tsx";
import LoadingSpinner from "./LoadingSpinner.tsx";
import hierarchyListState, {
  Hierarchy,
} from "../../states/data/hierarchyListState";
import roleListState, { Role } from "../../states/data/roleListState";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../lib/requestDeprecated";

function Layout() {
  const clientRegisterPopUp = useRecoilValue(clientRegisterPopUpState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const navigate = useNavigate();
  const clientRemovePopUpOpen = useRecoilValue(clientRemovePopUpOpenState);
  const loading = useRecoilValue(loadingState);
  const [, setHierarchyList] = useRecoilState(hierarchyListState);
  const [, setRoleList] = useRecoilState(roleListState);

  //set enum table
  //직급 리스트
  const hierarchyRequest = () => {
    const handelRequestSuccess: RequestSuccessHandler = (res) => {
      const data: Hierarchy[] = res.data;
      setHierarchyList(data);
    };
    const handelRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/hierarchy`, {
      withToken: false,
      useMock: false,
      onSuccess: handelRequestSuccess,
      onFail: handelRequestFail,
    });
  };

  //권한 리스트
  const roleRequest = () => {
    const handelRequestSuccess: RequestSuccessHandler = (res) => {
      const data: Role[] = res.data;
      setRoleList(data);
    };
    const handelRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/role`, {
      withToken: false,
      useMock: false,
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
        navigate("login");
      }
      setIsLogin(true);
    }
  }, [isLogin]);

  return (
    <>
      {loading.isLoading ? <LoadingSpinner /> : null}

      <Box sx={{ display: "flex" }}>
        <Header />
        <SideNavigationBar />
        <Main />
        {import.meta.env.DEV ? <Debug /> : null}
      </Box>
      {clientRegisterPopUp ? <ClientRegisterPopUp /> : null}
      {clientRemovePopUpOpen ? <ClientRemovePopUp /> : null}
    </>
  );
}

export default Layout;
