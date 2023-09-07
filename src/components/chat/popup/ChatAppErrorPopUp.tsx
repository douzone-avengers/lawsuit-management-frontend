import { useRecoilState } from "recoil";
import chatAppErrorState from "../state/ChatAppErrorState.ts";
import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";

function ChatAppErrorPopUp() {
  const [error, setError] = useRecoilState(chatAppErrorState);

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
            background: "#d32f2f",
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
              error?.callback();
              setError(null);
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
          <ErrorIcon sx={{ color: "#d32f2f", width: 32, height: 32 }} />
          <div style={{ color: "gray" }}>{error?.msg ?? ""}</div>
        </div>
      </div>
    </div>
  );
}

export default ChatAppErrorPopUp;
