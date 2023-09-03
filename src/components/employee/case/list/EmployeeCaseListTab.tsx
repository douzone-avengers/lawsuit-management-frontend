import { useEffect, useRef, useState } from "react";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../../../lib/requestDeprecated.ts";
import { useRecoilValue } from "recoil";
import employeeIdState from "../../../../states/employee/EmployeeIdState";
import Box from "@mui/material/Box";
import { LawsuitInfo } from "../../../case/type/LawsuitInfo.tsx";
import { useNavigate } from "react-router-dom";
import { LawsuitStatus } from "../../../../type/ResponseType";
import EmployeeCaseListTable from "./EmployeeCaseListTable";

function EmployeeCaseListTab() {
  const employeeId = useRecoilValue(employeeIdState);
  const navigate = useNavigate();
  const [cases, setCases] = useState<LawsuitInfo[]>([]);

  //for paging
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const [searchLawsuitStatus] = useState<LawsuitStatus | null>(null);
  const [searchWord] = useState<string | null>(null);
  const [_, setCurSearchWord] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const prevDependencies = useRef({
    searchLawsuitStatus,
    rowsPerPage,
    page,
  });

  useEffect(() => {
    if (employeeId === null) return;
    // page만 변화했는지 체크
    if (
      prevDependencies.current.searchLawsuitStatus === searchLawsuitStatus &&
      prevDependencies.current.rowsPerPage === rowsPerPage &&
      prevDependencies.current.page !== page
    ) {
      searchRequest(false, true);
    } else {
      searchRequest(true, true);
    }

    prevDependencies.current = {
      searchLawsuitStatus,
      rowsPerPage,
      page,
    };
  }, [employeeId, rowsPerPage, page, searchLawsuitStatus, searchWord]);

  useEffect(() => {
    if (!refreshTrigger) {
      return;
    }
    setRefreshTrigger(false);
    searchRequest(true, true);
  });

  // 검색
  const searchRequest = (isInitPage?: boolean, isGetBackWord?: boolean) => {
    if (isInitPage) {
      setPage(0);
    }
    if (isGetBackWord) {
      setCurSearchWord(searchWord);
    }

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const lawsuitData: {
        lawsuitList: LawsuitInfo[];
        count: number;
      } = res.data;

      console.dir(lawsuitData.lawsuitList);

      setCases(lawsuitData.lawsuitList);
      setCount(lawsuitData.count);
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/lawsuits/employees/${employeeId}`, {
      withToken: true,

      params: {
        curPage: (page + 1).toString(),
        rowsPerPage: rowsPerPage.toString(),
        searchWord: searchWord || "",
      },
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  };

  //t
  const caseRequestAndNavigate = (lawsuitId: number) => {
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      navigate(`/cases/${lawsuitId}/clients/${res.data.clients[0].id}`);
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/lawsuits/${lawsuitId}/basic`, {
      withToken: true,
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  };

  return (
    <Box>
      <EmployeeCaseListTable
        cases={cases.map((item) => ({
          ...item,
          onClick: () => {
            caseRequestAndNavigate(item.id);
          },
        }))}
        count={count}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        setRefreshTrigger={setRefreshTrigger}
      />
    </Box>
  );
}

export default EmployeeCaseListTab;
