import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import { ReactNode } from "react";
import { SxProps, Theme } from "@mui/material";

type Props = {
  sx?: SxProps<Theme>;
  width?: number | string;
  height?: number | string;
  popUpType?: "form" | "alert";
  children?: ReactNode;
};

function PopUp({
  width = 360,
  height,
  popUpType = "form",
  children,
  sx,
}: Props) {
  return (
    <Dialog
      open={true}
      sx={{
        backdropFilter: "blur(3px)",
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          position: "relative",
          flexDirection: "column",
          width,
          height,
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
