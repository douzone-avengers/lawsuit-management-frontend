import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import request, { RequestSuccessHandler } from "../../../lib/request.ts";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import ClientInfoCard from "../../client/ClientInfoCard.tsx";
import { LawsuitData } from "../../../mock/lawsuit/lawsuitTable.ts";
import ClosingTable from "./ClosingTable.tsx";
import adviceIdState from "../../../states/advice/AdviceState.tsx";

function ClosingInfo() {
  const clientId = useRecoilValue(clientIdState);
  const lawsuitId = useRecoilValue(caseIdState);
  const adviceId = useRecoilValue(adviceIdState);
  const setLawsuitId = useSetRecoilState(caseIdState);
  const navigate = useNavigate();
  const [lawsuits, setLawsuits] = useState<LawsuitData[]>([]);

  useEffect(() => {
    if (typeof clientId !== "number") {
      // TODO
      return;
    }

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: { data: LawsuitData[] } = res.data;
      const { data } = body;
      setLawsuits(data);
      setLawsuitId(data[0]?.id);
    };

    request("GET", `/lawsuit/${lawsuitId}/client/${clientId}`, {
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
