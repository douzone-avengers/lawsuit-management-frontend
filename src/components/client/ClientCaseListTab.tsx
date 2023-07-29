import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import request, { RequestSuccessHandler } from "../../lib/request";
import { LawsuitData } from "../../mock/lawsuit/lawsuitTable";
import clientIdState from "../../states/client/ClientIdState";
import CaseListTable from "../case/CaseListTable.tsx";

function ClientCaseListTab() {
  const memberId = useRecoilValue(clientIdState);
  const navigate = useNavigate();
  const [cases, setCases] = useState<LawsuitData[]>([]);

  useEffect(() => {
    if (typeof memberId !== "number") {
      // TODO
      return;
    }
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: { data: LawsuitData[] } = res.data;
      const { data } = body;
      setCases(data);
    };

    request("GET", `/lawsuits/members/${memberId}`, {
      onSuccess: handleRequestSuccess,
    });
  }, [memberId]);

  return (
    <Box>
      <CaseListTable
        cases={cases.map((item) => ({
          ...item,
          onClick: () => {
            navigate(`/cases/${item.id}?client=${memberId}`);
          },
        }))}
      />
    </Box>
  );
}

export default ClientCaseListTab;
