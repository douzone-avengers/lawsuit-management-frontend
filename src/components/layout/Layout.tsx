import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userState from "../../states/common/UserState";
import clientRegisterPopUpState from "../../states/layout/ClientRegisterPopUpOpenState";
import ClientRegisterPopUp from "../client/ClientRegisterPopUp.tsx";
import Debug from "./Debug";
import Header from "./header/Header.tsx";
import Main from "./main/Main.tsx";
import SideNavigationBar from "./snb/SideNavigationBar.tsx";
import ClientRemovePopUp from "../client/ClientRemovePopUp.tsx";
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
        {import.meta.env.DEV ? <Debug /> : null}
      </Box>
      {clientRegisterPopUp ? <ClientRegisterPopUp /> : null}
      {clientRemovePopUpOpen ? <ClientRemovePopUp /> : null}
    </>
  );
}

export default Layout;
