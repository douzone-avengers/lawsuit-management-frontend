import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import subNavigationBarState from "../../states/layout/SubNavigationBarState";

function CasesPage() {
  const subNavigationBar = useRecoilValue(subNavigationBarState);
  const navigate = useNavigate();

  useEffect(() => {
    if (subNavigationBar.type !== "caseClient") {
      return;
    }
    navigate(`/cases/list?client=${subNavigationBar.curId}`);
  }, [subNavigationBar]);

  return <>TODO: Loading</>;
}

export default CasesPage;
