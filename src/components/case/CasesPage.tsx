import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import subNavigationBarState from "../../states/layout/SubNavigationBarState";
import userState, { isEmployeeState } from "../../states/user/UserState.ts";
import userClientIdState from "../../states/user/UserClientIdState.tsx";

function CasesPage() {
  const subNavigationBar = useRecoilValue(subNavigationBarState);
  const isEmployee = useRecoilValue(isEmployeeState);
  const user = useRecoilValue(userState);
  const userClientId = useRecoilValue(userClientIdState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return;
    }
    if (isEmployee && subNavigationBar.type !== "caseClient") {
      return;
    }
    if (isEmployee) {
      navigate(`/cases/clients/${subNavigationBar.curId}`);
    }
    if (userClientId == null) {
      return;
    }
    navigate(`/cases/clients/${userClientId}`);
  }, [user, userClientId, subNavigationBar]);

  return <></>;
}

export default CasesPage;
