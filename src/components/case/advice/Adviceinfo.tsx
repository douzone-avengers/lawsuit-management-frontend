import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import request, { RequestSuccessHandler } from "../../../lib/request.ts";
import adviceRegisterPopUpOpenState from "../../../states/advice/AdviceRegisterPopUpOpenState.tsx";
import adviceIdState from "../../../states/advice/AdviceState.tsx";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import AdviceListTable from "./AdviceListTable.tsx";
import AdviceRegisterPopUp from "./AdviceRegisterPopUp.tsx";
import AdviceRegisterPopUpButton from "./AdviceRegisterPopUpButton.tsx";
import adviceDisplayState from "../../../states/advice/AdviceDisplayState.tsx";
import AdviceDetailTable from "./AdviceDetailTable.tsx";
import { Advicedata } from "../../../type/ResponseType.ts";

function Adviceinfo() {
  const clientId = useRecoilValue(clientIdState);
  const lawsuitId = useRecoilValue(caseIdState);
  const [, setAdviceId] = useRecoilState(adviceIdState);
  const adviceRegisterPopUpOpen = useRecoilValue(adviceRegisterPopUpOpenState);
  const [adviceDisplay, setAdviceDisplay] = useRecoilState(adviceDisplayState);

  const [advices, setAdvices] = useState<Advicedata[]>([]);

  useEffect(() => {
    setAdviceDisplay(0);
  }, []);

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
          <AdviceDetailTable />
        ) : null}
      </Box>
      {adviceRegisterPopUpOpen ? <AdviceRegisterPopUp /> : null}
    </Box>
  );
}

export default Adviceinfo;
