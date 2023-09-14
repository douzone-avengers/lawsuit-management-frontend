import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../lib/requestDeprecated.ts";
import clientIdState from "../../states/client/ClientIdState";
import CaseListTable from "../case/CaseListTable.tsx";
import { LawsuitInfo } from "../case/type/LawsuitInfo.tsx";
import { LawsuitCountInfo } from "../case/type/LawsuitCountInfo.tsx";

function ClientCaseListTab() {
  const clientId = useRecoilValue(clientIdState);
  const navigate = useNavigate();
  const [cases, setCases] = useState<LawsuitInfo[]>([]);
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  //for paging
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(0);

  const prevDependencies = useRef({
    sortKey,
    sortOrder,
    rowsPerPage,
    page,
  });

  useEffect(() => {
    if (typeof clientId !== "number") {
      // TODO
      return;
    }

    prevDependencies.current = {
      sortKey,
      sortOrder,
      rowsPerPage,
      page,
    };

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      // UI에 보여줄 때, 사건 상태를 한글로 보여주기 위함
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
        countDto: LawsuitCountInfo;
      } = res.data;

      const mappedLawsuitList = lawsuitData.lawsuitList.map((item) => ({
        ...item,
        lawsuitStatus: mapLawsuitStatus(item.lawsuitStatus),
      }));

      setCases(mappedLawsuitList);
      setCount(lawsuitData.countDto.total);
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/lawsuits/clients/${clientId}`, {
      withToken: true,
      params: {
        curPage: (page + 1).toString(),
        rowsPerPage: rowsPerPage.toString(),
        searchWord: "",
        ...(sortKey !== null ? { sortKey: sortKey } : {}),
        ...(sortOrder !== null ? { sortOrder: sortOrder } : {}),
      },
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  }, [clientId, rowsPerPage, page, sortKey, sortOrder]);

  return (
    <Box>
      <CaseListTable
        cases={cases.map((item) => ({
          ...item,
          onClick: () => {
            navigate(`/cases/${item.id}/clients/${clientId}`);
          },
        }))}
        count={count}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
    </Box>
  );
}

export default ClientCaseListTab;
