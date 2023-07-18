import Button from "@mui/material/Button";
import { useSetRecoilState } from "recoil";
import userState from "../../states/common/UserState";

function LogoutButton() {
  const setUser = useSetRecoilState(userState);

  const handleClick = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <Button variant="contained" disableElevation onClick={handleClick}>
      로그아웃
    </Button>
  );
}

export default LogoutButton;
