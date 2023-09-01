import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import caseBookPDFUploadLoadingState from "../../states/case/info/closing/CaseBookPDFUploadLoadingState.tsx";
import CaseBookPDFShareComponent from "./closing/CaseBookPDFShareComponent.tsx";
import caseBookPDFPrintLoadingState from "../../states/case/info/closing/CaseBookPDFPrintLoadingState.tsx";
import CaseBookPDFPrintComponent from "./closing/CaseBookPDFPrintComponent.tsx";
import downPaymentPDFPrintLoadingState from "../../states/case/info/closing/DownPaymentPDFPrintLoadingState.tsx";
import downPaymentPDFUploadLoadingState from "../../states/case/info/closing/DownPaymentPDFUploadLoadingState.tsx";
import DownPaymentPDFPrintComponent from "./closing/DownPaymentPDFPrintComponent.tsx";
import DownPaymentPDFShareComponent from "./closing/DownPaymentPDFShareComponent.tsx";
import caseBookShareSelectPopUpOpenState from "../../states/case/info/closing/CaseBookShareSelectPopUpOpenState.ts";
import CaseBookShareSelectPopUp from "./closing/CaseBookShareSelectPopUp.tsx";
import downPaymentShareSelectPopUpOpenState from "../../states/case/info/closing/DownPaymentShareSelectPopUpOpenState.ts";
import DownPaymentShareSelectPopUp from "./closing/DownPaymentShareSelectPopUp.tsx";

function CaseLayout() {
  const caseBookShareSelectPopUpOpen = useRecoilValue(
    caseBookShareSelectPopUpOpenState,
  );
  const caseBookPDFPrintLoading = useRecoilValue(caseBookPDFPrintLoadingState);
  const caseBookPDFUploadLoading = useRecoilValue(
    caseBookPDFUploadLoadingState,
  );

  const downPaymentShareSelectPopUpOpen = useRecoilValue(
    downPaymentShareSelectPopUpOpenState,
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
        <CaseBookPDFShareComponent />
      ) : null}
      {caseBookShareSelectPopUpOpen ? <CaseBookShareSelectPopUp /> : null}

      {downPaymentPDFPrintLoading === "loading" ? (
        <DownPaymentPDFPrintComponent />
      ) : null}
      {downPaymentPDFUploadLoading === "loading" ? (
        <DownPaymentPDFShareComponent />
      ) : null}
      {downPaymentShareSelectPopUpOpen ? <DownPaymentShareSelectPopUp /> : null}
    </>
  );
}

export default CaseLayout;
