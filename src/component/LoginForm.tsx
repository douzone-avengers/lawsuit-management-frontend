import { useState } from "react";
import { useRecoilState } from "recoil";
import { uiState } from "../state/uiState";
import Logo from "./Logo";
import Popup from "./Popup";

type LoginType = "고객" | "사원";

export default function LoginForm() {
  const [loginType, setLoginType] = useState<LoginType>("고객");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [ui, setUi] = useRecoilState(uiState);

  const handleClick = () => {
    setUi({
      ...ui,
      loginForm: false,
    });
  };

  return (
    <Popup width={360} height={432} onCloseButtonClick={handleClick}>
      <>
        <div style={{ margin: "24px auto", marginTop: 32 }}>
          <Logo width={128} height={72} />
        </div>
        <div
          style={{
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 110,
              border: "1px solid black",
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              background: loginType === "고객" ? "black" : "white",
              color: loginType === "고객" ? "white" : "black",
              textAlign: "center",
              padding: 5,
            }}
            onClick={() => setLoginType("고객")}
          >
            고 객
          </div>
          <div
            style={{
              width: 110,
              border: "1px solid black",
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              background: loginType === "사원" ? "black" : "white",
              color: loginType === "사원" ? "white" : "black",
              textAlign: "center",
              padding: 5,
            }}
            onClick={() => setLoginType("사원")}
          >
            사 원
          </div>
        </div>
        <div
          style={{
            marginTop: 30,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <input
            style={{
              height: 32,
              width: 220,
              padding: 5,
              border: "1px solid black",
            }}
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <input
            style={{
              height: 32,
              width: 220,
              padding: 5,
              border: "1px solid black",
            }}
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          style={{
            marginTop: 30,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 220,
              height: 32,
              border: "1px solid black",
              color: "white",
              background: "black",
              paddingTop: 10,
              paddingBottom: 10,
              padding: "18px 0",
              borderRadius: 20,
            }}
          >
            로 그 인
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 30,
            justifyContent: "center",
            fontSize: 11,
            gap: 10,
          }}
        >
          <div>아이디 찾기</div>
          <div>|</div>
          <div>비밀번호 찾기</div>
          <div>|</div>
          <div>회원 가입</div>
        </div>
      </>
    </Popup>
  );
}
