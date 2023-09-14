import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../lib/requestDeprecated.ts";
import clientIdState from "../../states/client/ClientIdState";
import CaseListTable from "./CaseListTable.tsx";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { LawsuitInfo } from "./type/LawsuitInfo.tsx";
import caseIdState from "../../states/case/CaseIdState.tsx";
import { LawsuitStatus } from "../../type/ResponseType.ts";
import { mapLawsuitStatus } from "../../lib/convert.ts";
import CaseAddPopUpButton from "./CaseAddPopUpButton.tsx";
import caseAddPopUpOpenState from "../../states/case/CaseAddPopUpOpenState.tsx";
import CaseAddPopUp from "./CaseAddPopUp.tsx";
import { LawsuitCountInfo } from "./type/LawsuitCountInfo.tsx";
import CardTitle from "../common/CardTitle.tsx";
import { isEmployeeState } from "../../states/user/UserState.ts";

function CaseListPage() {
  const clientId = useRecoilValue(clientIdState);
  const navigate = useNavigate();
  const [cases, setCases] = useState<LawsuitInfo[]>([]);
  //for paging
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchLawsuitStatus, setSearchLawsuitStatus] =
    useState<LawsuitStatus | null>(null);
  const [searchWord, setSearchWord] = useState<string | null>(null);
  const [curSearchWord, setCurSearchWord] = useState<string | null>(null);
  const setCaseId = useSetRecoilState(caseIdState);
  const [count, setCount] = useState(0);
  const [totalLength, setTotalLength] = useState(0);
  const [registrationLength, setRegistrationLength] = useState(0);
  const [proceedingLength, setProceedingLength] = useState(0);
  const [closingLength, setClosingLength] = useState(0);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const caseAddPopUpOpen = useRecoilValue(caseAddPopUpOpenState);
  const isEmployee = useRecoilValue(isEmployeeState);

  const prevDependencies = useRef({
    sortKey,
    sortOrder,
    searchLawsuitStatus,
    rowsPerPage,
    page,
  });

  useEffect(() => {
    if (typeof clientId !== "number") {
      // TODO
      return;
    }

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
    clientId,
    rowsPerPage,
    page,
    searchLawsuitStatus,
    searchWord,
    sortKey,
    sortOrder,
  ]);

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

    requestDeprecated("GET", `/lawsuits/clients/${clientId}`, {
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

  useEffect(() => {
    setSearchLawsuitStatus(null);
    setSearchWord("");
  }, [clientId]);

  useEffect(() => {
    if (cases && cases.length > 0) {
      setCaseId(cases[0].id);
    }
  }, [cases]);

  useEffect(() => {
    if (triggerSearch) {
      searchRequest(true, false);
      setTriggerSearch(false);
    }
  }, [triggerSearch]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: "column",
          position: "relative",
        }}
      >
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
                  variant={
                    searchLawsuitStatus === "등록" ? "filled" : "outlined"
                  }
                  label={`등록 (${registrationLength})`}
                  onClick={() => {
                    setSearchLawsuitStatus("등록");
                  }}
                />
                <Chip
                  variant={
                    searchLawsuitStatus === "진행" ? "filled" : "outlined"
                  }
                  label={`진행 (${proceedingLength})`}
                  onClick={() => {
                    setSearchLawsuitStatus("진행");
                  }}
                />
                <Chip
                  variant={
                    searchLawsuitStatus === "종결" ? "filled" : "outlined"
                  }
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
                  setTriggerSearch(true);
                }}
              >
                검색
              </Button>
            </Box>
          </CardContent>
        </Card>
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
        {caseAddPopUpOpen ? (
          <CaseAddPopUp
            clientId={clientId}
            setCases={setCases}
            setCount={setCount}
            page={page}
            rowsPerPage={rowsPerPage}
            searchWord={searchWord}
          />
        ) : null}
      </Box>
      {isEmployee ? <CaseAddPopUpButton /> : null}
    </>
  );
}

export default CaseListPage;
