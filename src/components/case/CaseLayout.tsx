import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import loadingState from "../../states/layout/LoadingState.tsx";
import PrintComponent from "./closing/print/PrintComponent.tsx";
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

function CaseLayout() {
  const loading = useRecoilValue(loadingState);
  const caseEditPopUpOpen = useRecoilValue(caseEditPopUpOpenState);
  const caseRemovePopUpOpen = useRecoilValue(caseRemovePopUpOpenState);
  const [courtList, setCourtList] = useState<Court[]>([]);

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
      useMock: false,
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  }, []);

  return (
    <>
      <Outlet />
      {loading.isLoading ? <PrintComponent /> : null}
      {caseEditPopUpOpen ? <CaseEditPopUp courtList={courtList} /> : null}
      {caseRemovePopUpOpen ? <CaseRemovePopUp /> : null}
    </>
  );
}

export default CaseLayout;
