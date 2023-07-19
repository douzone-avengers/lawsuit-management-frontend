import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userState from "../../states/common/UserState";
import clientRegisterPopUpState from "../../states/layout/ClientRegisterPopUpOpenState";
import ClientRegisterPopUp from "./ClientRegisterPopUp.tsx";
import Debug from "./Debug";
import Header from "./Header";
import Main from "./Main";
import SideNavigationBar from "./SideNavigationBar";
import ClientRemovePopUp from "./ClientRemovePopUp.tsx";
import clientRemovePopUpOpenState from "../../states/client/ClientRemovePopUpOpenState.tsx";

function Layout() {
  const clientRegisterPopUp = useRecoilValue(clientRegisterPopUpState);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const clientRemovePopUpOpen = useRecoilValue(clientRemovePopUpOpenState);

  useEffect(() => {
    if (!user) {
      navigate("login");
    }
  }, [user]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Header />
        <SideNavigationBar />
        <Main />
        <Debug />
      </Box>
      {clientRegisterPopUp ? <ClientRegisterPopUp /> : null}
      {clientRemovePopUpOpen ? <ClientRemovePopUp /> : null}
    </>
  );
}

export default Layout;
