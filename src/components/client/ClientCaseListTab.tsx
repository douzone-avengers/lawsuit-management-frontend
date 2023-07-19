import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import request, { RequestSuccessHandler } from "../../lib/request";
import { LawsuitData } from "../../mock/lawsuit/lawsuitTable";
import clientIdState from "../../states/client/ClientIdState";
import CaseTable from "../case/CaseTable.tsx";
import Placeholder from "../common/Placeholder.tsx";

function ClientCaseListTab() {
  const clientId = useRecoilValue(clientIdState);
  const navigate = useNavigate();
  const [cases, setCases] = useState<LawsuitData[]>([]);

  useEffect(() => {
    if (typeof clientId !== "number") {
      // TODO
      return;
    }
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: { data: LawsuitData[] } = res.data;
      const { data } = body;
      setCases(data);
    };

    request("GET", `/lawsuits/clients/${clientId}`, {
      onSuccess: handleRequestSuccess,
    });
  }, [clientId]);

  return (
    <Box sx={{ display: "flex", gap: 3, flexDirection: "column" }}>
      <CaseTable
        cases={cases.map((item) => ({
          ...item,
          onClick: () => {
            navigate(`/cases/${item.id}?client=${clientId}`);
          },
        }))}
      />
      <Box sx={{ flexGrow: 1, height: 480 }}>
        <Placeholder />
      </Box>
    </Box>
  );
}

export default ClientCaseListTab;
