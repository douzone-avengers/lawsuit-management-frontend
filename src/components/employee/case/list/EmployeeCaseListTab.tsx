import { useEffect, useRef, useState } from "react";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../../../lib/requestDeprecated.ts";
import { useRecoilState } from "recoil";
import employeeIdState from "../../../../states/employee/EmployeeIdState";
import Box from "@mui/material/Box";
import { LawsuitInfo } from "../../../case/type/LawsuitInfo.tsx";
import { useNavigate } from "react-router-dom";
import { LawsuitStatus } from "../../../../type/ResponseType";
import CaseListTable from "../../../case/CaseListTable";

function EmployeeCaseListTab() {
  const [employeeId] = useRecoilState(employeeIdState);
  const navigate = useNavigate();
  const [cases, setCases] = useState<LawsuitInfo[]>([]);
  const [caseList, setCaseList] = useState<LawsuitInfo[]>([]);

  //for paging
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const [searchLawsuitStatus, setSearchLawsuitStatus] =
    useState<LawsuitStatus | null>(null);
  const [searchWord, setSearchWord] = useState<string | null>(null);
  const [curSearchWord, setCurSearchWord] = useState<string | null>(null);

  const totalLength = caseList.length;

  const prevDependencies = useRef({
    searchLawsuitStatus,
    rowsPerPage,
    page,
  });

  useEffect(() => {
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
      useMock: false,
      params: {
        curPage: (page + 1).toString(),
        rowsPerPage: rowsPerPage.toString(),
        searchWord: searchWord || "",
      },
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });
  };

  return (
    <Box>
      <CaseListTable
        cases={cases.map((item) => ({
          ...item,
          onClick: () => {
            navigate(`/cases/${item.id}?client=2`);
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

export default EmployeeCaseListTab;
