import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import request, { RequestSuccessHandler } from "../../lib/request";
import clientIdState from "../../states/client/ClientIdState";
import CaseListTable from "../case/CaseListTable.tsx";
import { LawsuitInfo } from "../case/type/LawsuitInfo.tsx";
import { PagingInfo } from "../common/type/PagingInfo.tsx";

function ClientCaseListTab() {
  const clientId = useRecoilValue(clientIdState);
  const navigate = useNavigate();
  const [cases, setCases] = useState<LawsuitInfo[]>([]);

  useEffect(() => {
    if (typeof clientId !== "number") {
      // TODO
      return;
    }
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const lawsuitData: {
        lawsuitList: LawsuitInfo[];
        pageRange: PagingInfo;
      } = res.data;
      setCases(lawsuitData.lawsuitList);
    };

    request("GET", `/lawsuits/clients/${clientId}`, {
      useMock: false,
      withToken: true,
      params: {
        curPage: "1",
        itemsPerPage: "10",
      },
      onSuccess: handleRequestSuccess,
    });
  }, [clientId]);

  return (
    <Box>
      <CaseListTable
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
