import { Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../lib/requestDeprecated.ts";
import PopUp from "../common/PopUp";
import Logo from "../common/Logo.tsx";
import NormalDialog from "../common/dialog/NormalDialog";
import Debug from "../layout/Debug.tsx";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFailDialog, setIsFailDialog] = useState(false);
  const [failMessage, setFailMessage] = useState("");

  const handleLogin = () => {
    type TokenData = {
      accessToken: string;
      refreshToken: string;
    };
    const handleLoginRequestSuccess: RequestSuccessHandler = (res) => {
      const tokenData: TokenData = res.data;
      localStorage.setItem("accessToken", tokenData.accessToken);
      localStorage.setItem("refreshToken", tokenData.refreshToken);

      navigate("/");
      setIsLoading(false);
    };

    const handelLoginRequestFail: RequestFailHandler = (e) => {
      // alert((e.response.data as { code: string; message: string }).message);
      setFailMessage(
        (e.response.data as { code: string; message: string }).message,
      );
      setIsLoading(false);
      setIsFailDialog(true);
    };

    setIsLoading(true);
    requestDeprecated("POST", "/tokens/login", {
      withToken: false,

      body: {
        email,
        password,
      },
      onSuccess: handleLoginRequestSuccess,
      onFail: handelLoginRequestFail,
    });
  };

  return (
    <>
      <NormalDialog
        openStatus={isFailDialog}
        setOpenStatus={setIsFailDialog}
        title={"로그인 실패"}
        text={failMessage}
      />
      <PopUp>
        {isLoading ? (
          <>
            <CircularProgress size={50} />
          </>
        ) : (
          <>
            <Logo sx={{ width: "50%", marginBottom: 2 }} />
            <TextField
              type="email"
              size="small"
              label="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              size="small"
              label="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />
            <Button variant="contained" size="large" onClick={handleLogin}>
              로그인
            </Button>
          </>
        )}
      </PopUp>
      {import.meta.env.DEV ? <Debug /> : null}
    </>
  );
}

export default LoginPage;
