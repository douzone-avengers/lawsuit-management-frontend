import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import request, { RequestSuccessHandler } from "../../lib/request";
import { LawsuitData } from "../../mock/lawsuit/lawsuitTable";
import clientIdState from "../../states/client/ClientIdState";
import CaseTable from "../common/CaseTable";
import ClientInfo from "../common/ClientInfo";

function ClientCaseListTab() {
  const clientId = useRecoilValue(clientIdState);
  const navigate = useNavigate();
  const [cases, setCases] = useState<LawsuitData[]>([]);

  useEffect(() => {
    if (typeof clientId !== "number") {
      // TODO
      return;
    }
    const handleRequestSucccess: RequestSuccessHandler = (res) => {
      const body: { data: LawsuitData[] } = res.data;
      const { data } = body;
      setCases(data);
    };

    request("GET", `/lawsuits/clients/${clientId}`, {
      onSuccess: handleRequestSucccess,
    });
  }, [clientId]);

  return (
    <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
      <ClientInfo />
      <CaseTable
        cases={cases.map((item) => ({
          ...item,
          onClick: () => {
            navigate(`/cases/${item.id}?client=${clientId}`);
          },
        }))}
      />
    </Box>
  );
}

export default ClientCaseListTab;
