import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

function PopUp({ children }: Props) {
  return (
    <Dialog open={true} sx={{ backdropFilter: "blur(3px)" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 360,
          padding: 3,
          gap: 2,
        }}
      >
        {children}
      </Box>
    </Dialog>
  );
}

export default PopUp;
