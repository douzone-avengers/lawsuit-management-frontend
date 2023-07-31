import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import request, { RequestSuccessHandler } from "../../lib/request.ts";
import { Advicedata } from "../../mock/advice/adviceTable.ts";
import adviceRegisterPopUpOpenState from "../../states/advice/AdviceRegisterPopUpOpenState.tsx";
import adviceIdState from "../../states/advice/AdviceState.tsx";
import caseIdState from "../../states/case/CaseIdState.tsx";
import clientIdState from "../../states/client/ClientIdState.tsx";
import ClientInfoCard from "../client/ClientInfoCard.tsx";
import AdviceListTable from "./AdviceListTable.tsx";
import AdviceRegisterPopUp from "./AdviceRegisterPopUp.tsx";
import AdviceRegisterPopUpButton from "./AdviceRegisterPopUpButton.tsx";

function Adviceinfo() {
  const clientId = useRecoilValue(clientIdState);
  const lawsuitId = useRecoilValue(caseIdState);
  const setAdviceId = useSetRecoilState(adviceIdState);
  const adviceRegisterPopUpOpen = useRecoilValue(adviceRegisterPopUpOpenState);

  const navigate = useNavigate();
  const [advices, setAdvices] = useState<Advicedata[]>([]);

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

    request("GET", `/lawsuit/${lawsuitId}/client/${clientId}/advices`, {
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
      <Box>
        <AdviceRegisterPopUpButton />
      </Box>
      <Box>
        <AdviceListTable
          advices={advices.map((item) => ({
            ...item,
            onClick: () => {
              navigate(`/cases/${item.id}?client=${clientId}`);
              <ClientInfoCard></ClientInfoCard>;
            },
          }))}
        />
      </Box>
      {adviceRegisterPopUpOpen ? <AdviceRegisterPopUp /> : null}
    </Box>
  );
}

export default Adviceinfo;
