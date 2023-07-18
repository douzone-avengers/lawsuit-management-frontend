import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import subNavigationBarState from "../../states/layout/SubNavigationBarState";
import subNavigationBarTypeState from "../../states/layout/SubNavigationBarTypeState";

function CasesPage() {
  const subNavigationBar = useRecoilValue(subNavigationBarState);
  const subNavigationBarType = useRecoilValue(subNavigationBarTypeState);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      subNavigationBarType === "caseClient" &&
      subNavigationBar.items &&
      subNavigationBar.items.length > 0
    ) {
      const { id } = subNavigationBar.items[0];
      navigate(`/cases/list?client=${id}`);
    }
  }, [subNavigationBar]);

  return <>TODO: Loading</>;
}

export default CasesPage;
