import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import subNavigationBarState from "../../states/layout/SubNavigationBarState";
import FlagState from "../../states/layout/FlagState";

function ClientsPage() {
  const subNavigationBar = useRecoilValue(subNavigationBarState);
  const navigate = useNavigate();
  const [flag, setFlag] = useRecoilState(FlagState);

  useEffect(() => {
    if (!flag) return;
    if (subNavigationBar.items && subNavigationBar.items.length > 0) {
      const { id } = subNavigationBar.items[0];
      navigate(`/clients/${id}`);
      setFlag(false);
    }
  }, [subNavigationBar, flag]);

  return <>TODO: Loading</>;
}

export default ClientsPage;
