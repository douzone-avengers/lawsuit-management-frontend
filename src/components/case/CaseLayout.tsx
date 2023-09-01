import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import caseBookPDFUploadLoadingState from "../../states/case/info/closing/CaseBookPDFUploadLoadingState.tsx";
import CaseBookPDFUploadComponent from "./closing/print/CaseBookPDFUploadComponent.tsx";
import caseBookPDFPrintLoadingState from "../../states/case/info/closing/CaseBookPDFPrintLoadingState.tsx";
import CaseBookPDFPrintComponent from "./closing/print/CaseBookPDFPrintComponent.tsx";
import downPaymentPDFPrintLoadingState from "../../states/case/info/closing/DownPaymentPDFPrintLoadingState.tsx";
import downPaymentPDFUploadLoadingState from "../../states/case/info/closing/DownPaymentPDFUploadLoadingState.tsx";
import DownPaymentPDFPrintComponent from "./closing/print/DownPaymentPDFPrintComponent.tsx";
import DownPaymentPDFUploadComponent from "./closing/print/DownPaymentPDFUploadComponent.tsx";

function CaseLayout() {
  const caseBookPDFPrintLoading = useRecoilValue(caseBookPDFPrintLoadingState);
  const caseBookPDFUploadLoading = useRecoilValue(
    caseBookPDFUploadLoadingState,
  );
  const downPaymentPDFPrintLoading = useRecoilValue(
    downPaymentPDFPrintLoadingState,
  );
  const downPaymentPDFUploadLoading = useRecoilValue(
    downPaymentPDFUploadLoadingState,
  );

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
      {caseBookPDFPrintLoading === "loading" ? (
        <CaseBookPDFPrintComponent />
      ) : null}
      {caseBookPDFUploadLoading === "loading" ? (
        <CaseBookPDFUploadComponent />
      ) : null}
      {downPaymentPDFPrintLoading === "loading" ? (
        <DownPaymentPDFPrintComponent />
      ) : null}
      {downPaymentPDFUploadLoading === "loading" ? (
        <DownPaymentPDFUploadComponent />
      ) : null}
    </>
  );
}

export default CaseLayout;
