import { ReactNode } from "react";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material";

type Props = {
  sx?: SxProps<Theme>;
  children?: ReactNode;
};

function Table({ sx, children }: Props) {
  return <Box sx={{ display: "flex", ...sx }}>{children}</Box>;
}

export default Table;
