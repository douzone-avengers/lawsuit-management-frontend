import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "50%",
          height: "20%",
          gap: 20,
          borderRadius: 20,
          color: "#1976D2",
          fontWeight: 700,
        }}
      >
        <div
          style={{
            fontSize: 24,
          }}
        >
          유효하지 않은 요청입니다.
        </div>
        <Button variant="contained" onClick={() => navigate("/")}>
          Home
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;
