import adviceIdState from "../../../states/advice/AdviceState.tsx";
import { useRecoilState, useRecoilValue } from "recoil";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../lib/requestDeprecated.ts";
import { useEffect, useState } from "react";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import AdviceDetailPage from "./AdviceDetailPage.tsx";
import Box from "@mui/material/Box";
import { Advicedata, ClientData } from "../../../type/ResponseType.ts";

function AdviceDetailTable() {
  const clientId = useRecoilValue(clientIdState);
  const lawsuitId = useRecoilValue(caseIdState);

  const [, setAdviceId] = useRecoilState(adviceIdState);
  const [, setClientId] = useRecoilState(clientIdState);

  const [advices, setAdvices] = useState<Advicedata[]>([]);
  const [client, setClient] = useState<ClientData | null>(null);

  useEffect(() => {
    if (typeof clientId !== "number") {
      // TODO
      return;
    }

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: { data: Advicedata[] } = res.data;
      const { data } = body;
      setAdvices(data);
      setAdviceId(data[0]?.id);
    };

    const handleRequest: RequestSuccessHandler = (res) => {
      const body: { data: ClientData } = res.data;
      const { data } = body;
      setClient(data);
      setClientId(data?.id);
    };

    requestDeprecated("GET", `/clients/${clientId}`, {
      onSuccess: handleRequest,
    });

    requestDeprecated(
      "GET",
      `/lawsuit/${lawsuitId}/client/${clientId}/advices`,
      {
        onSuccess: handleRequestSuccess,
      },
    );
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
      <Box></Box>
      <Box>
        <AdviceDetailPage advices={advices} client={client} />
      </Box>
    </Box>
  );
}
export default AdviceDetailTable;
