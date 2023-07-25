import { AppBar } from "@mui/material";

function CaseBasicInfoHeader() {
  return (
    <AppBar
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 1,
        paddingBottom: 1,
      }}
      position="static"
    >
      사건
    </AppBar>
  );
}

export default CaseBasicInfoHeader;
