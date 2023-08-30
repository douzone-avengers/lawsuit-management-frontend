import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import printLoadingState from "../../states/layout/PrintLoadingState.tsx";
import PrintComponent from "./closing/print/PrintComponent.tsx";

function CaseLayout() {
  const printLoading = useRecoilValue(printLoadingState);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Box>
      {printLoading === "loading" ? <PrintComponent /> : null}
    </>
  );
}

export default CaseLayout;
