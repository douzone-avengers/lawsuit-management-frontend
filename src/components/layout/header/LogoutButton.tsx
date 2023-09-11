import Button from "@mui/material/Button";
import { useSetRecoilState } from "recoil";
import userState from "../../../states/user/UserState.ts";
import { useNavigate } from "react-router-dom";
import userClientIdState from "../../../states/user/UserClientIdState.tsx";

function LogoutButton() {
  const setUser = useSetRecoilState(userState);
  const setUserClientId = useSetRecoilState(userClientIdState);
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setUserClientId(null);
    navigate("/login");
  };

  return (
    <Button
      sx={{ height: "100%" }}
      variant="contained"
      disableElevation
      onClick={handleClick}
    >
      로그아웃
    </Button>
  );
}

export default LogoutButton;
