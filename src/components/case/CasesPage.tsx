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
      // const { id } = subNavigationBar.items[0];
      // setClientId(id);
      //임시 하드코딩
      setClientId(2);
      navigate(`/cases/list?client=2`);
    }
  }, [subNavigationBar.items]);

  return <>TODO: Loading</>;
}

export default CasesPage;
