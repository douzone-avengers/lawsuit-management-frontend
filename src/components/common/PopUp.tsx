import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import { ReactNode } from "react";

type Props = {
  width?: number | string;
  popUpType?: "form" | "alert";
  children?: ReactNode;
};

function PopUp({ width = 360, popUpType = "form", children }: Props) {
  return (
    <Dialog open={true} sx={{ backdropFilter: "blur(3px)" }}>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          flexDirection: "column",
          width,
          padding: popUpType === "form" ? 3 : 0,
          gap: popUpType === "form" ? 2 : 0,
          overflow: "hidden",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {children}
      </Box>
    </Dialog>
  );
}

export default PopUp;
