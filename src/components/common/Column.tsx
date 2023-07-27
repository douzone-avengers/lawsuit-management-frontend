import { ReactNode } from "react";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material";

type Props = {
  sx?: SxProps<Theme>;
  children?: ReactNode;
};

function Column({ sx, children }: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, ...sx }}>
      {children}
    </Box>
  );
}

export default Column;
