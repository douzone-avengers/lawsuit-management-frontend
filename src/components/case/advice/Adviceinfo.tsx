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
import adviceDisplayState from "../../../states/advice/AdviceDisplayState.tsx";
import AdviceDetailPage from "./AdviceDetailPage.tsx";
import { Advicedata } from "../../../type/ResponseType.ts";

function Adviceinfo() {
  const clientId = useRecoilValue(clientIdState);
  const lawsuitId = useRecoilValue(caseIdState);
  const [_, setAdviceId] = useRecoilState(adviceIdState);
  const adviceRegisterPopUpOpen = useRecoilValue(adviceRegisterPopUpOpenState);
  const [adviceDisplay, setAdviceDisplay] = useRecoilState(adviceDisplayState);

  const [advices, setAdvices] = useState<Advicedata[]>([]);

  useEffect(() => {
    setAdviceDisplay(0);
  }, []);

  useEffect(() => {
    if (typeof clientId !== "number" || typeof lawsuitId !== "number") {
      // TODO
      return;
    }

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: Advicedata[] = res.data;
      setAdvices(body);
      console.log(body);
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
      {adviceDisplay === 0 && (
        <Box>
          <AdviceRegisterPopUpButton />
        </Box>
      )}
      <Box>
        {adviceDisplay === 0 ? (
          <AdviceListTable
            advices={advices.map((item) => ({
              ...item,
              onClick: () => {
                setAdviceId(item.id);
                setAdviceDisplay(1);
              },
            }))}
          />
        ) : adviceDisplay === 1 ? (
          <AdviceDetailPage />
        ) : null}
      </Box>
      {adviceRegisterPopUpOpen ? (
        <AdviceRegisterPopUp setAdvices={setAdvices} />
      ) : null}
    </Box>
  );
}

export default Adviceinfo;
