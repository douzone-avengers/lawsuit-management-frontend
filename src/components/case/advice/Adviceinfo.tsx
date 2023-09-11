import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../lib/requestDeprecated.ts";
import adviceRegisterPopUpOpenState from "../../../states/advice/AdviceRegisterPopUpOpenState.tsx";
import adviceIdState from "../../../states/advice/AdviceState.tsx";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import AdviceListTable from "./AdviceListTable.tsx";
import AdviceRegisterPopUp from "./AdviceRegisterPopUp.tsx";
import AdviceRegisterPopUpButton from "./AdviceRegisterPopUpButton.tsx";
import { Advicedata } from "../../../type/ResponseType.ts";
import { isEmployeeState } from "../../../states/user/UserState.ts";

function Adviceinfo() {
  const clientId = useRecoilValue(clientIdState);
  const lawsuitId = useRecoilValue(caseIdState);
  const [_, setAdviceId] = useRecoilState(adviceIdState);
  const adviceRegisterPopUpOpen = useRecoilValue(adviceRegisterPopUpOpenState);
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
      <Box>
        <AdviceListTable
          advices={advices.map((item) => ({
            ...item,
          }))}
        />
      </Box>
      {adviceRegisterPopUpOpen ? (
        <AdviceRegisterPopUp setAdvices={setAdvices} />
      ) : null}
    </Box>
  );
}

export default Adviceinfo;
