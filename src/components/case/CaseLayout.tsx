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
import printLoadingState from "../../states/layout/PrintLoadingState.tsx";
import PdfComponent from "./closing/print/PdfComponent.tsx";

function CaseLayout() {
  const caseEditPopUpOpen = useRecoilValue(caseEditPopUpOpenState);
  const caseRemovePopUpOpen = useRecoilValue(caseRemovePopUpOpenState);
  const [courtList, setCourtList] = useState<Court[]>([]);
  const printLoading = useRecoilValue(printLoadingState);

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
      <Outlet />
      {caseEditPopUpOpen ? <CaseEditPopUp courtList={courtList} /> : null}
      {caseRemovePopUpOpen ? <CaseRemovePopUp /> : null}
      {printLoading === "loading" ? <PdfComponent /> : null}
    </>
  );
}

export default CaseLayout;
