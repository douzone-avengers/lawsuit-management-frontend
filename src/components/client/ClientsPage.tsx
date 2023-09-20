import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import subNavigationBarState from "../../states/layout/SubNavigationBarState";
import ClientRegisterPopUpButton from "./ClientRegisterPopUpButton.tsx";

function ClientsPage() {
  const subNavigationBar = useRecoilValue(subNavigationBarState);
  const navigate = useNavigate();

  useEffect(() => {
    if (subNavigationBar.type !== "client") {
      return;
    }
    navigate(`/clients/${subNavigationBar.curId}`);
  }, [subNavigationBar]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
      }}
    >
      <ClientRegisterPopUpButton />
    </div>
  );
}

export default ClientsPage;
