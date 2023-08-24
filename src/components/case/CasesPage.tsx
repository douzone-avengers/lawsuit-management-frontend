import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import subNavigationBarState from "../../states/layout/SubNavigationBarState";
import clientIdState from "../../states/client/ClientIdState.tsx";
import FlagState from "../../states/layout/FlagState";

function CasesPage() {
  const subNavigationBar = useRecoilValue(subNavigationBarState);
  const setClientId = useSetRecoilState(clientIdState);
  const navigate = useNavigate();
  const [flag, setFlag] = useRecoilState(FlagState);

  useEffect(() => {
    if (!flag) return;

    if (subNavigationBar.items && subNavigationBar.items.length > 0) {
      const { id } = subNavigationBar.items[0];
      setClientId(id);
      navigate(`/cases/list?client=${id}`);
      setFlag(false);
    }
  }, [subNavigationBar, flag]);

  return <>TODO: Loading</>;
}

export default CasesPage;
