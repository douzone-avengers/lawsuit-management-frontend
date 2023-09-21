import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../lib/requestDeprecated.ts";
import adviceRegisterPopUpOpenState from "../../../states/advice/AdviceRegisterPopUpOpenState.tsx";
import adviceIdState from "../../../states/advice/AdviceIdState.tsx";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import AdviceListTable from "./table/AdviceListTable.tsx";
import AdviceRegisterPopUp from "./table/popup/AdviceRegisterPopUp.tsx";
import AdviceRegisterPopUpButton from "./table/button/AdviceRegisterPopUpButton.tsx";
import { Advicedata } from "../../../type/ResponseType.ts";
import { isEmployeeState } from "../../../states/user/UserState.ts";
import adviceEditPopUpOpenState from "../../../states/advice/AdviceEditPopUpOpenState.tsx";
import AdviceEditPopUp from "./table/popup/AdviceEditPopUp.tsx";
import adviceDeletePopUpOpenState from "../../../states/advice/adviceDeletePopUpOpenState.tsx";
import AdviceDeletePopUp from "./table/popup/AdviceDeletePopUp.tsx";
import Card from "@mui/material/Card";
import CardTitle from "../../common/CardTitle.tsx";
import AdviceRequestTriggerState from "../../../states/advice/AdviceRequestTriggerState.tsx";
import { isClosingCaseState } from "../../../states/case/info/caseInfoState.tsx";

function Adviceinfo() {
  const clientId = useRecoilValue(clientIdState);
  const lawsuitId = useRecoilValue(caseIdState);
  const [_, setAdviceId] = useRecoilState(adviceIdState);
  const adviceRegisterPopUpOpen = useRecoilValue(adviceRegisterPopUpOpenState);
  const adviceEditPopUpOpen = useRecoilValue(adviceEditPopUpOpenState);
  const adviceDeletePopUpOpen = useRecoilValue(adviceDeletePopUpOpenState);
  const [advices, setAdvices] = useState<Advicedata[]>([]);
  const isEmployee = useRecoilValue(isEmployeeState);
  const [sortKey, setSortKey] = useState("advicedAt");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [curPage, setCurPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const [adviceRequestTrigger, setAdviceRequestTrigger] = useRecoilState(
    AdviceRequestTriggerState,
  );
  const isClosing = useRecoilValue(isClosingCaseState);

  useEffect(() => {
    if (typeof clientId !== "number" || typeof lawsuitId !== "number") {
      // TODO
      return;
    }
    if (adviceRequestTrigger) {
      setAdviceRequestTrigger(false);
    }

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const data = res.data;
      const adviceList: Advicedata[] = data.adviceDtoList;
      setAdvices(adviceList);
      setAdviceId(adviceList[0]?.id);
      setCount(data.count);
    };

    requestDeprecated("GET", `/advices/lawsuits/${lawsuitId}`, {
      params: {
        curPage: (curPage + 1).toString(),
        rowsPerPage: rowsPerPage.toString(),
        ...(sortKey !== null ? { sortKey: sortKey } : {}),
        ...(sortOrder !== null ? { sortOrder: sortOrder } : {}),
      },
      withToken: true,
      onSuccess: handleRequestSuccess,
    });
  }, [lawsuitId, adviceRequestTrigger, curPage, rowsPerPage, sortOrder]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: "column",
        position: "relative",
      }}
    >
      {isEmployee && !isClosing && (
        <Box>
          <AdviceRegisterPopUpButton />
        </Box>
      )}
      <Card>
        <CardTitle text="상담 리스트" />
        <Box>
          <AdviceListTable
            advices={advices.map((item) => ({
              ...item,
            }))}
            count={count}
            curPage={curPage}
            setCurPage={setCurPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            sortKey={sortKey}
            setSortKey={setSortKey}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </Box>
      </Card>

      {adviceEditPopUpOpen ? <AdviceEditPopUp setAdvices={setAdvices} /> : null}
      {adviceDeletePopUpOpen ? (
        <AdviceDeletePopUp setAdvices={setAdvices} />
      ) : null}
      {adviceRegisterPopUpOpen ? (
        <AdviceRegisterPopUp setAdvices={setAdvices} />
      ) : null}
    </Box>
  );
}

export default Adviceinfo;
