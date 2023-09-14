import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";

type Props = {
  children?: React.ReactNode;
};

function PageLoadingSpinner({ children }: Props) {
  return (
    <Box
      sx={{
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        background: "#00000080",
        width: "100vw",
        height: "100vh",
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
        {children}
      </div>
      <CircularProgress size={100} />
    </Box>
  );
}

export default PageLoadingSpinner;
