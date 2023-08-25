import { Button, Divider, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../lib/requestDeprecated.ts";
import isLoginState from "../../states/common/IsLoginState";
import PopUp from "../common/PopUp";
import Logo from "../common/Logo.tsx";

function LoginPage() {
  const setIsLoginState = useSetRecoilState(isLoginState);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    type TokenData = {
      accessToken: string;
      refreshToken: string;
    };
    const handleLoginRequestSuccess: RequestSuccessHandler = (res) => {
      const tokenData: TokenData = res.data;
      localStorage.setItem("accessToken", tokenData.accessToken);
      localStorage.setItem("refreshToken", tokenData.refreshToken);
      setIsLoginState(true);
      alert("로그인 성공");
      navigate("/");
    };

    const handelLoginRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("POST", "/tokens/login", {
      withToken: false,
      useMock: false,
      body: {
        email,
        password,
      },
      onSuccess: handleLoginRequestSuccess,
      onFail: handelLoginRequestFail,
    });
  };

  return (
    <PopUp>
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
      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Typography variant="caption">아이디 찾기</Typography>
        <Divider orientation="vertical" flexItem />
        <Typography variant="caption">비밀번호 찾기</Typography>
        <Divider orientation="vertical" flexItem />
        <Typography
          sx={{ cursor: "pointer" }}
          variant="caption"
          onClick={() => {
            navigate("/validate");
          }}
        >
          회원가입
        </Typography>
      </Box>
    </PopUp>
  );
}

export default LoginPage;
