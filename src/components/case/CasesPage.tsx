import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import subNavigationBarState from "../../states/layout/SubNavigationBarState";
import clientIdState from "../../states/client/ClientIdState.tsx";

function CasesPage() {
  const subNavigationBar = useRecoilValue(subNavigationBarState);
  const setClientId = useSetRecoilState(clientIdState);
  const navigate = useNavigate();

  useEffect(() => {
    if (subNavigationBar.items && subNavigationBar.items.length > 0) {
      const { id } = subNavigationBar.items[0];
      setClientId(id);
      navigate(`/cases/list?client=${id}`);
    }
  }, [subNavigationBar]);

  return <>TODO: Loading</>;
}

export default CasesPage;
