import adviceIdState from "../../../states/advice/AdviceState.tsx";
import { useRecoilState, useRecoilValue } from "recoil";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../lib/requestDeprecated.ts";
import { useEffect, useState } from "react";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import Box from "@mui/material/Box";
import { AllLawsuitType } from "../closing/print/PdfComponent.tsx";
import AdviceInfoCard from "./AdviceInfoCard.tsx";

function AdviceDetailPage() {
  const [adviceId] = useRecoilState(adviceIdState);
  const clientId = useRecoilValue(clientIdState);
  const lawsuitId = useRecoilValue(caseIdState);
  const [_, setData] = useState<AllLawsuitType | null>(null);

  // const [advices, setAdvices] = useState<Advicedata[]>([]);
  // const [client, setClient] = useState<ClientData | null>(null);

  useEffect(() => {
    if (typeof clientId !== "number" && typeof lawsuitId !== "number") {
      // TODO
      return;
    }
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const advice: AllLawsuitType = res.data;
      setData(advice);
    };

    /*const handleRequestSuccess: RequestSuccessHandler = (res) => {
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
    }); */

    requestDeprecated(
      "GET",
      `/lawsuit/${lawsuitId}/client/${clientId}/advices/${adviceId}`,
      {
        withToken: true,
        onSuccess: handleRequestSuccess,
      },
    );
  }, [lawsuitId]);
  // const advice = data?.advices.filter((item) => item.id === adviceId)[0];

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
        <AdviceInfoCard />
      </Box>
    </Box>
  );
}
export default AdviceDetailPage;
