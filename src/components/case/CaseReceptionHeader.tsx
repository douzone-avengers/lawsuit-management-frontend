import { AppBar } from "@mui/material";

function CaseReceptionHeader() {
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
      접수
    </AppBar>
  );
}

export default CaseReceptionHeader;
