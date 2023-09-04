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
    navigate(`/cases/clients/${subNavigationBar.curId}`);
  }, [subNavigationBar]);

  return <></>;
}

export default CasesPage;
