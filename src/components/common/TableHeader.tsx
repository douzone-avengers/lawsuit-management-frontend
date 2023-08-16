import { SxProps, Theme, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

type Props = {
  text: string;
  sx?: SxProps<Theme>;
  hidden?: boolean;
};

function TableHeader({ sx, text, hidden = false }: Props) {
  const theme = useTheme();
  return hidden ? (
    <Box sx={{ height: 40 }} />
  ) : (
    <Card
      sx={{
        background: theme.palette.primary.main,
        color: "white",
        paddingTop: 1,
        paddingBottom: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
    >
      {text}
    </Card>
  );
}

export default TableHeader;
