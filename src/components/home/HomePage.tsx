import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userState, { isEmployeeState } from "../../states/user/UserState.ts";
import { useEffect } from "react";
import requestDeprecated from "../../lib/requestDeprecated.ts";

function HomePage() {
  const isEmployee = useRecoilValue(isEmployeeState);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return;
    }
    if (isEmployee) {
      navigate("/clients");
      return;
    }
    requestDeprecated("GET", `/clients/email/${user.email}`, {
      onSuccess: (res) => {
        navigate(`/cases/clients/${(res.data as { id: number }).id}`);
      },
    });
  }, [user]);

  return null;
}

export default HomePage;
