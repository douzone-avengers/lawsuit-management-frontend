import { useNavigate } from "react-router-dom";

function Title() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        paddingLeft: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        cursor: "pointer",
      }}
      onClick={() => navigate("/")}
    >
      사건 관리 서비스
    </div>
  );
}

export default Title;
