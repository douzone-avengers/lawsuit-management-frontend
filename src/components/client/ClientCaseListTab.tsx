import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import request, { RequestSuccessHandler } from "../../lib/request";
import clientIdState from "../../states/client/ClientIdState";
import CaseListTable from "../case/CaseListTable.tsx";
import { LawsuitInfo } from "../case/type/LawsuitInfo.tsx";

function ClientCaseListTab() {
  const clientId = useRecoilValue(clientIdState);
  const navigate = useNavigate();
  const [cases, setCases] = useState<LawsuitInfo[]>([]);

  //for paging
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(0);

  const prevDependencies = useRef({
    rowsPerPage,
    page,
  });

  useEffect(() => {
    if (typeof clientId !== "number") {
      // TODO
      return;
    }

    prevDependencies.current = {
      rowsPerPage,
      page,
    };

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      function mapLawsuitStatus(status: string) {
        switch (status) {
          case "REGISTRATION":
            return "등록";
          case "PROCEEDING":
            return "진행";
          case "CLOSING":
            return "종결";
          default:
            return status;
        }
      }

      const lawsuitData: {
        lawsuitList: LawsuitInfo[];
        count: number;
      } = res.data;

      const mappedLawsuitList = lawsuitData.lawsuitList.map((item) => ({
        ...item,
        lawsuitStatus: mapLawsuitStatus(item.lawsuitStatus),
      }));

      setCases(mappedLawsuitList);
      setCount(lawsuitData.count);
    };

    request("GET", `/lawsuits/clients/${clientId}`, {
      useMock: false,
      withToken: true,
      params: {
        curPage: (page + 1).toString(),
        rowsPerPage: rowsPerPage.toString(),
        searchWord: "",
      },
      onSuccess: handleRequestSuccess,
    });
  }, [clientId, rowsPerPage, page]);

  return (
    <Box>
      <CaseListTable
        cases={cases.map((item) => ({
          ...item,
          onClick: () => {
            navigate(`/cases/${item.id}?client=${clientId}`);
          },
        }))}
        count={count}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </Box>
  );
}

export default ClientCaseListTab;
