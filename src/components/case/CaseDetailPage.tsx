import { Box, SvgIcon } from "@mui/material";
import { useEffect, useState } from "react";
import Info from "./advice/Adviceinfo";
import TabBar, { TabItem } from "../common/TabBar";
import ExpenseInfoPage from "./expense/ExpenseInfoPage.tsx";
import Closing from "./closing/ClosingInfo.tsx";
import CaseReceptionTab from "./reception/CaseReceptionTab.tsx";
import CaseBasicInfoCard from "./common/CaseBasicInfoCard.tsx";
import CaseClientInfoCard from "./common/CaseClientInfoCard.tsx";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import caseTabIdState from "../../states/case/CaseTabIdState.tsx";
import caseIdState from "../../states/case/CaseIdState.tsx";
import caseInfoState, {
  CaseInfoType,
} from "../../states/case/info/caseInfoState.tsx";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../lib/requestDeprecated.ts";
import CaseEmployeeInfoCard from "./common/CaseEmployeeInfoCard.tsx";
import ReorderIcon from "@mui/icons-material/Reorder";
import Button from "@mui/material/Button";
import clientIdState from "../../states/client/ClientIdState.tsx";
import { useNavigate } from "react-router-dom";
import CaseEditPopUpButton from "./CaseEditPopUpButton.tsx";
import CaseRemovePopUpButton from "./CaseRemovePopUpButton.tsx";
import { isEmployeeState } from "../../states/user/UserState.ts";
import caseExpenseIdState from "../../states/case/info/expense/CaseExpenseIdState.tsx";

function CaseDetailPage() {
  const [caseTabId, setCaseTabId] = useRecoilState(caseTabIdState);
  const clientId = useRecoilValue(clientIdState);
  const navigate = useNavigate();
  const caseId = useRecoilValue(caseIdState);
  const setCaseInfo = useSetRecoilState(caseInfoState);
  const setExpenseId = useSetRecoilState(caseExpenseIdState);

  const handleClickListButton = () => {
    navigate(`/cases/clients/${clientId}`);
  };

  const [clientTab] = useState<TabItem[]>([
    {
      id: 0,
      name: "접수 정보",
      children: <CaseReceptionTab />,
    },
    {
      id: 1,
      name: "상담 정보",
      children: (
        <div>
          <Info></Info>
        </div>
      ),
    },
    {
      id: 2,
      name: "지출 정보",
      children: (
        <div>
          <ExpenseInfoPage />
        </div>
      ),
    },
    {
      id: 3,
      name: "종결",
      children: (
        <div>
          <Closing />
        </div>
      ),
    },
  ]);

  useEffect(() => {
    if (caseId === null) {
      return;
    }

    setExpenseId(null);

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: CaseInfoType = res.data;
      setCaseInfo(body);
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/lawsuits/${caseId}/basic`, {
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  }, [caseId]);

  const isEmployee = useRecoilValue(isEmployeeState);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Box>
          <Button variant={"outlined"} onClick={handleClickListButton}>
            <SvgIcon component={ReorderIcon} sx={{ fontSize: "large" }} />
            &nbsp; 목록
          </Button>
        </Box>
        {isEmployee && (
          <Box sx={{ display: "flex", gap: 1 }}>
            <CaseEditPopUpButton />
            <CaseRemovePopUpButton />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <CaseBasicInfoCard />
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <CaseEmployeeInfoCard />
          <CaseClientInfoCard />
        </Box>
        <TabBar items={clientTab} value={caseTabId} setValue={setCaseTabId} />
      </Box>
    </>
  );
}

export default CaseDetailPage;
