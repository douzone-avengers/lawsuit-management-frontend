import Button from "@mui/material/Button";
import { useSetRecoilState } from "recoil";
import isLoginState from "../../../states/common/IsLoginState.tsx";

function LogoutButton() {
  const setIsLoginState = useSetRecoilState(isLoginState);

  const handleClick = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoginState(false);
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
