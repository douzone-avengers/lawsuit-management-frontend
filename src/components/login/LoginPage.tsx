import { Button, Divider, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import request, { RequestSuccessHandler } from "../../lib/request";
import { MemberInfo } from "../../mock/member/memberHandlers";
import { TokenData } from "../../mock/token/tokenTable";
import userState from "../../states/common/UserState";
import PopUp from "../common/PopUp";
import Logo from "../common/Logo.tsx";

function LoginPage() {
  const setUserState = useSetRecoilState(userState);
  const navigate = useNavigate();
  const [isEmployeeLogin, setIsEmployeeLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginButtonClick = () => {
    const handleLoginRequestSuccess: RequestSuccessHandler = (res) => {
      const body: { data: TokenData & { accessToken: string } } = res.data;
      const token = body.data;
      localStorage.setItem("accessToken", token.accessToken);
      localStorage.setItem("refreshToken", token.refreshToken);

      const handleMemberRequestSuccess: RequestSuccessHandler = (res) => {
        const body: { data: MemberInfo } = res.data;
        const newUser = body.data;
        setUserState(newUser);
        navigate("/");
      };

      request("GET", `/members/${token.memberId}`, {
        onSuccess: handleMemberRequestSuccess,
      });
    };

    request("POST", "/tokens/login", {
      body: {
        email,
        password,
      },
      onSuccess: handleLoginRequestSuccess,
    });
  };

  return (
    <PopUp>
      <Logo sx={{ width: "50%", marginBottom: 2 }} />
      <ButtonGroup variant="outlined" size="large" fullWidth>
        <Button
          variant={isEmployeeLogin ? "contained" : "outlined"}
          onClick={() => {
            setIsEmployeeLogin(true);
          }}
        >
          직원
        </Button>
        <Button
          variant={isEmployeeLogin ? "outlined" : "contained"}
          onClick={() => {
            setIsEmployeeLogin(false);
          }}
        >
          의뢰인
        </Button>
      </ButtonGroup>
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
      />
      <Button variant="contained" size="large" onClick={handleLoginButtonClick}>
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
