import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userState, { isEmployeeState } from "../../states/user/UserState.ts";
import { useEffect } from "react";
import userClientIdState from "../../states/user/UserClientIdState.tsx";

function HomePage() {
  const isEmployee = useRecoilValue(isEmployeeState);
  const user = useRecoilValue(userState);
  const userClientId = useRecoilValue(userClientIdState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return;
    }
    if (isEmployee) {
      navigate("/clients");
      return;
    }
    if (userClientId === null) {
      return;
    }
    navigate(`/cases/clients/${userClientId}`);
  }, [user, userClientId]);

  return null;
}

export default HomePage;
