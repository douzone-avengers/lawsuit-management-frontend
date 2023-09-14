import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import subNavigationBarState from "../../states/layout/SubNavigationBarState";

function ClientsPage() {
  const subNavigationBar = useRecoilValue(subNavigationBarState);
  const navigate = useNavigate();

  useEffect(() => {
    if (subNavigationBar.type !== "client") {
      return;
    }
    navigate(`/clients/${subNavigationBar.curId}`);
  }, [subNavigationBar]);

  return <></>;
}

export default ClientsPage;
