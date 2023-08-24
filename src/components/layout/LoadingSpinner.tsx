import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import { useRecoilValue } from "recoil";
import loadingState from "../../states/layout/LoadingState.tsx";

function LoadingSpinner() {
  const loading = useRecoilValue(loadingState);

  return (
    <Box
      sx={{
        zIndex: 9999,
        position: "fixed",
        background: "#000000cc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          zIndex: 200,
          position: "absolute",
          color: "white",
          background: "transparent",
        }}
      >
        {loading.text}
      </div>
      <CircularProgress size={100} />
    </Box>
  );
}

export default LoadingSpinner;
