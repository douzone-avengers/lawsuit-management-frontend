import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import logo from "/img/logo.svg";

type Props = {
  sx?: SxProps<Theme>;
};

function Logo({ sx }: Props) {
  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        margin: "0 auto",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={logo} style={{ width: "100%" }} />
    </Box>
  );
}

export default Logo;
