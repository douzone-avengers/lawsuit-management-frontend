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
import { mapLawsuitStatus } from "../../../../lib/convert";
import { LawsuitCountInfo } from "../../../case/type/LawsuitCountInfo";
import Card from "@mui/material/Card";
import CardTitle from "../../../common/CardTitle";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

function EmployeeCaseListTab() {
  const employeeId = useRecoilValue(employeeIdState);
  const navigate = useNavigate();
  const [cases, setCases] = useState<LawsuitInfo[]>([]);

  //for paging
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const [searchLawsuitStatus, setSearchLawsuitStatus] =
    useState<LawsuitStatus | null>(null);
  const [searchWord, setSearchWord] = useState<string | null>(null);
  const [curSearchWord, setCurSearchWord] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [totalLength, setTotalLength] = useState(0);
  const [registrationLength, setRegistrationLength] = useState(0);
  const [proceedingLength, setProceedingLength] = useState(0);
  const [closingLength, setClosingLength] = useState(0);
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const prevDependencies = useRef({
    searchLawsuitStatus,
    rowsPerPage,
    page,
    sortKey,
    sortOrder,
  });

  useEffect(() => {
    if (employeeId === null) return;
    // page만 변화했는지 체크
    if (
      prevDependencies.current.sortKey === sortKey &&
      prevDependencies.current.sortOrder === sortOrder &&
      prevDependencies.current.searchLawsuitStatus === searchLawsuitStatus &&
      prevDependencies.current.rowsPerPage === rowsPerPage &&
      prevDependencies.current.page !== page
    ) {
      searchRequest(false, true);
    } else {
      searchRequest(true, true);
    }

    prevDependencies.current = {
      sortKey,
      sortOrder,
      searchLawsuitStatus,
      rowsPerPage,
      page,
    };
  }, [
    employeeId,
    rowsPerPage,
    page,
    searchLawsuitStatus,
    searchWord,
    sortKey,
    sortOrder,
  ]);

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

    const converter = (nameKr: string | null) => {
      if (nameKr === "등록") {
        return "REGISTRATION";
      }
      if (nameKr === "진행") {
        return "PROCEEDING";
      }
      if (nameKr === "종결") {
        return "CLOSING";
      }
    };

    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const lawsuitData: {
        lawsuitList: LawsuitInfo[];
        countDto: LawsuitCountInfo;
      } = res.data;

      const mappedLawsuitList = lawsuitData.lawsuitList.map((item) => ({
        ...item,
        lawsuitStatus: mapLawsuitStatus(item.lawsuitStatus),
      }));

      if (searchLawsuitStatus === null) {
        setCount(lawsuitData.countDto.total);
      }
      if (searchLawsuitStatus === "등록") {
        setCount(lawsuitData.countDto.registration);
      }
      if (searchLawsuitStatus === "진행") {
        setCount(lawsuitData.countDto.proceeding);
      }
      if (searchLawsuitStatus === "종결") {
        setCount(lawsuitData.countDto.closing);
      }

      setCases(mappedLawsuitList);
      setTotalLength(lawsuitData.countDto.total);
      setRegistrationLength(lawsuitData.countDto.registration);
      setProceedingLength(lawsuitData.countDto.proceeding);
      setClosingLength(lawsuitData.countDto.closing);
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
        // lawsuitStatus가 null이 아닌 경우에만 포함시킴
        ...(searchLawsuitStatus !== null && {
          lawsuitStatus: converter(searchLawsuitStatus),
        }),
        ...(sortKey !== null ? { sortKey: sortKey } : {}),
        ...(sortOrder !== null ? { sortOrder: sortOrder } : {}),
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
      <Card>
        <CardTitle text="검색" />
        <CardContent>
          <TextField
            size="small"
            placeholder="사건명, 사건번호 검색"
            fullWidth
            value={curSearchWord}
            onChange={(e) => setCurSearchWord(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              marginTop: 3,
              height: 8,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <Chip
                variant={searchLawsuitStatus === null ? "filled" : "outlined"}
                label={`전체 (${totalLength})`}
                onClick={() => {
                  setSearchLawsuitStatus(null);
                }}
              />
              <Chip
                variant={searchLawsuitStatus === "등록" ? "filled" : "outlined"}
                label={`등록 (${registrationLength})`}
                onClick={() => {
                  setSearchLawsuitStatus("등록");
                }}
              />
              <Chip
                variant={searchLawsuitStatus === "진행" ? "filled" : "outlined"}
                label={`진행 (${proceedingLength})`}
                onClick={() => {
                  setSearchLawsuitStatus("진행");
                }}
              />
              <Chip
                variant={searchLawsuitStatus === "종결" ? "filled" : "outlined"}
                label={`종결 (${closingLength})`}
                onClick={() => {
                  setSearchLawsuitStatus("종결");
                }}
              />
            </Box>
            <Button
              variant="contained"
              onClick={() => {
                setSearchWord(curSearchWord);
                setRefreshTrigger(true);
              }}
            >
              검색
            </Button>
          </Box>
        </CardContent>
      </Card>
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
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
    </Box>
  );
}

export default EmployeeCaseListTab;
