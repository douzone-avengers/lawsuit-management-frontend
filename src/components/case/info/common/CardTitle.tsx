import { Typography, useTheme } from "@mui/material";

type Props = {
  text: string;
};

function CardTitle({ text }: Props) {
  const theme = useTheme();

  return (
    <Typography
      sx={{
        display: "flex",
        padding: 1,
        justifyContent: "center",
        alignItems: "center",
        background: theme.palette.primary.main,
        color: "white",
      }}
    >
      {text}
    </Typography>
  );
}

export default CardTitle;
