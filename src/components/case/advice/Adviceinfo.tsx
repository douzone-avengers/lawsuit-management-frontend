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
import adviceEditPopUpOpenState from "../../../states/advice/adviceEditPopUpOpenState.tsx";
import AdviceEditPopUp from "./table/popup/AdviceEditPopUp.tsx";
import adviceDeletePopUpOpenState from "../../../states/advice/adviceDeletePopUpOpenState.tsx";
import AdviceDeletePopUp from "./table/popup/AdviceDeletePopUp.tsx";
import Card from "@mui/material/Card";
import CardTitle from "../../common/CardTitle.tsx";

function Adviceinfo() {
  const clientId = useRecoilValue(clientIdState);
  const lawsuitId = useRecoilValue(caseIdState);
  const [_, setAdviceId] = useRecoilState(adviceIdState);
  const adviceRegisterPopUpOpen = useRecoilValue(adviceRegisterPopUpOpenState);
  const adviceEditPopUpOpen = useRecoilValue(adviceEditPopUpOpenState);
  const adviceDeletePopUpOpen = useRecoilValue(adviceDeletePopUpOpenState);
  const [advices, setAdvices] = useState<Advicedata[]>([]);
  const isEmployee = useRecoilValue(isEmployeeState);

  useEffect(() => {
    if (typeof clientId !== "number" || typeof lawsuitId !== "number") {
      // TODO
      return;
    }

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: Advicedata[] = res.data;
      setAdvices(body);
      setAdviceId(body[0]?.id);
    };

    requestDeprecated("GET", `/advices?lawsuit=${lawsuitId}`, {
      withToken: true,
      onSuccess: handleRequestSuccess,
    });
  }, [lawsuitId]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: "column",
        position: "relative",
      }}
    >
      {isEmployee && (
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
