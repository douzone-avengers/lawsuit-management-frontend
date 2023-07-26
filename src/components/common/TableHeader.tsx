import Box from "@mui/material/Box";

type Props = {
  text: string;
};

function TableHeader({ text }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {text}
    </Box>
  );
}

export default TableHeader;
