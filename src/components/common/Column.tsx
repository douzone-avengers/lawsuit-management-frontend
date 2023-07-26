import { ReactNode } from "react";
import Box from "@mui/material/Box";

type Props = {
  children?: ReactNode;
};

function Column({ children }: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>{children}</Box>
  );
}

export default Column;
