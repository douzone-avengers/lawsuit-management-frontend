import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../lib/requestDeprecated.ts";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import ClientInfoCard from "../../client/ClientInfoCard.tsx";
import ClosingTable from "./ClosingTable.tsx";
import adviceIdState from "../../../states/advice/AdviceState.tsx";
import { LawsuitInfo } from "../type/LawsuitInfo.tsx";

function ClosingInfo() {
  const clientId = useRecoilValue(clientIdState);
  const lawsuitId = useRecoilValue(caseIdState);
  const adviceId = useRecoilValue(adviceIdState);
  const setLawsuitId = useSetRecoilState(caseIdState);
  const navigate = useNavigate();
  const [lawsuits, setLawsuits] = useState<LawsuitInfo[]>([]);

  useEffect(() => {
    if (typeof clientId !== "number") {
      // TODO
      return;
    }

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: { data: LawsuitInfo[] } = res.data;
      const { data } = body;
      setLawsuits(data);
      setLawsuitId(data[0]?.id);
    };

    requestDeprecated("GET", `/lawsuit/${lawsuitId}/client/${clientId}`, {
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
      {/* <ClientInfoCard /> */}
      <Box></Box>
      <Box>
        <ClosingTable
          lawsuits={lawsuits.map((item) => ({
            ...item,
            onClick: () => {
              navigate(
                `/cases/${item.id}?client=${clientId}/advice=${adviceId}`,
              );
              <ClientInfoCard></ClientInfoCard>;
            },
          }))}
        />
      </Box>
    </Box>
  );
}

export default ClosingInfo;
