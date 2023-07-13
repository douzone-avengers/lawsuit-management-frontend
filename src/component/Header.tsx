import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        borderBottom: "1px solid black",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <Logo width={96} height={64} />
      </div>
    </div>
  );
}
