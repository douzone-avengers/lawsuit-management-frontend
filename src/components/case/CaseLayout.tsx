import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import caseEditPopUpOpenState from "../../states/case/CaseEditPopUpOpenState.tsx";
import caseRemovePopUpOpenState from "../../states/case/CaseRemovePopUpOpenState.tsx";
import CaseEditPopUp from "./CaseEditPopUp.tsx";
import { useEffect, useState } from "react";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../lib/requestDeprecated.ts";
import { Court } from "./type/CourtInfo.ts";
import CaseRemovePopUp from "./CaseRemovePopUp.tsx";
import caseBookPDFUploadLoadingState from "../../states/case/info/closing/CaseBookPDFUploadLoadingState.tsx";
import CaseBookPDFShareComponent from "./closing/CaseBookPDFShareComponent.tsx";
import caseBookPDFPrintLoadingState from "../../states/case/info/closing/CaseBookPDFPrintLoadingState.tsx";
import CaseBookPDFPrintComponent from "./closing/CaseBookPDFPrintComponent.tsx";
import downPaymentPDFPrintLoadingState from "../../states/case/info/closing/DownPaymentPDFPrintLoadingState.tsx";
import downPaymentPDFUploadLoadingState from "../../states/case/info/closing/DownPaymentPDFUploadLoadingState.tsx";
import DownPaymentPDFPrintComponent from "./closing/DownPaymentPDFPrintComponent.tsx";
import DownPaymentPDFShareComponent from "./closing/DownPaymentPDFShareComponent.tsx";
import caseBookSharePopUpOpenState from "../../states/case/info/closing/CaseBookSharePopUpOpenState.ts";
import CaseBookSharePopUp from "./closing/CaseBookSharePopUp.tsx";
import downPaymentSharePopUpOpenState from "../../states/case/info/closing/DownPaymentSharePopUpOpenState.ts";
import DownPaymentSharePopUp from "./closing/DownPaymentSharePopUp.tsx";
import Box from "@mui/material/Box";

function CaseLayout() {
  const caseEditPopUpOpen = useRecoilValue(caseEditPopUpOpenState);
  const caseRemovePopUpOpen = useRecoilValue(caseRemovePopUpOpenState);
  const [courtList, setCourtList] = useState<Court[]>([]);
  const caseBookShareSelectPopUpOpen = useRecoilValue(
    caseBookSharePopUpOpenState,
  );
  const caseBookPDFPrintLoading = useRecoilValue(caseBookPDFPrintLoadingState);
  const caseBookPDFUploadLoading = useRecoilValue(
    caseBookPDFUploadLoadingState,
  );

  const downPaymentShareSelectPopUpOpen = useRecoilValue(
    downPaymentSharePopUpOpenState,
  );
  const downPaymentPDFPrintLoading = useRecoilValue(
    downPaymentPDFPrintLoadingState,
  );
  const downPaymentPDFUploadLoading = useRecoilValue(
    downPaymentPDFUploadLoadingState,
  );

  // 법원 리스트
  useEffect(() => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const courtData = res.data;
      setCourtList(courtData);
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/court`, {
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  }, []);

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
      {caseEditPopUpOpen ? <CaseEditPopUp courtList={courtList} /> : null}
      {caseRemovePopUpOpen ? <CaseRemovePopUp /> : null}
      {caseBookPDFPrintLoading === "loading" ? (
        <CaseBookPDFPrintComponent />
      ) : null}
      {caseBookPDFUploadLoading === "loading" ? (
        <CaseBookPDFShareComponent />
      ) : null}
      {caseBookShareSelectPopUpOpen ? <CaseBookSharePopUp /> : null}

      {downPaymentPDFPrintLoading === "loading" ? (
        <DownPaymentPDFPrintComponent />
      ) : null}
      {downPaymentPDFUploadLoading === "loading" ? (
        <DownPaymentPDFShareComponent />
      ) : null}
      {downPaymentShareSelectPopUpOpen ? <DownPaymentSharePopUp /> : null}
    </>
  );
}

export default CaseLayout;
