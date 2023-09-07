import { useRecoilState } from "recoil";
import chatAppSuccessState from "../state/ChatAppSuccessState.ts";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

function ChatAppSuccessPopUp() {
  const [success, setSuccess] = useRecoilState(chatAppSuccessState);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "#00000080",
      }}
    >
      <div
        style={{
          background: "white",
          width: 360,
          height: 120,
        }}
      >
        <div
          style={{
            display: "flex",
            background: "#1976D2",
            height: 30,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "right",
              marginRight: 5,
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => {
              success?.callback();
              setSuccess(null);
            }}
          >
            <CloseIcon />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            padding: 10,
            height: "calc(100% - 30px)",
          }}
        >
          <CheckCircleIcon sx={{ color: "#1976D2", width: 32, height: 32 }} />
          <div style={{ color: "gray" }}>{success?.msg ?? ""}</div>
        </div>
      </div>
    </div>
  );
}

export default ChatAppSuccessPopUp;
