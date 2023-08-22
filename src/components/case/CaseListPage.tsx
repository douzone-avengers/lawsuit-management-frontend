import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../lib/requestDeprecated.ts";
import clientIdState from "../../states/client/ClientIdState";
import ClientInfoCard from "../client/ClientInfoCard.tsx";
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

function CaseListPage() {
  const clientId = useRecoilValue(clientIdState);
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
  const setCaseId = useSetRecoilState(caseIdState);
  const caseAddPopUpOpen = useRecoilValue(caseAddPopUpOpenState);

  const totalLength = caseList.length;
  const aLength = caseList.filter(
    (item) => item.lawsuitStatus === "REGISTRATION",
  ).length;
  const bLength = caseList.filter(
    (item) => item.lawsuitStatus === "PROCEEDING",
  ).length;
  const cLength = caseList.filter(
    (item) => item.lawsuitStatus === "CLOSING",
  ).length;

  const prevDependencies = useRef({
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
  }, [clientId, rowsPerPage, page, searchLawsuitStatus, searchWord]);

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

      const mappedLawsuitList = lawsuitData.lawsuitList.map((item) => ({
        ...item,
        lawsuitStatus: mapLawsuitStatus(item.lawsuitStatus),
      }));

      setCases(mappedLawsuitList);
      setCount(lawsuitData.count);
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("GET", `/lawsuits/clients/${clientId}`, {
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

  useEffect(() => {
    if (cases && cases.length > 0) {
      setCaseId(cases[0].id);
    }
  }, [cases]);

  // 의뢰인별 전체 사건 리스트
  useEffect(() => {
    if (count === 0) {
      return;
    }
    const handleCaseListRequestSuccess: RequestSuccessHandler = (res) => {
      const lawsuitData: {
        lawsuitList: LawsuitInfo[];
        count: number;
      } = res.data;

      setCaseList(lawsuitData.lawsuitList);
    };

    requestDeprecated("GET", `/lawsuits/clients/${clientId}`, {
      useMock: false,
      withToken: true,
      params: {
        curPage: "1",
        rowsPerPage: count.toString(),
        searchWord: "",
      },
      onSuccess: handleCaseListRequestSuccess,
    });
  }, [clientId, count]);

  let filteredCases: LawsuitInfo[];

  switch (searchLawsuitStatus) {
    case "등록":
      filteredCases = cases.filter((item) => item.lawsuitStatus === "등록");
      break;
    case "진행":
      filteredCases = cases.filter((item) => item.lawsuitStatus === "진행");
      break;
    case "종결":
      filteredCases = cases.filter((item) => item.lawsuitStatus === "종결");
      break;
    default:
      filteredCases = cases;
  }

  const [triggerSearch, setTriggerSearch] = useState(false);
  useEffect(() => {
    if (triggerSearch) {
      searchRequest(true, false);
      setTriggerSearch(false);
    }
  }, [triggerSearch]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: "column",
        position: "relative",
      }}
    >
      <ClientInfoCard />
      <Card>
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
                label={`등록 (${aLength})`}
                onClick={() => {
                  setSearchLawsuitStatus("등록");
                }}
              />
              <Chip
                variant={searchLawsuitStatus === "진행" ? "filled" : "outlined"}
                label={`진행 (${bLength})`}
                onClick={() => {
                  setSearchLawsuitStatus("진행");
                }}
              />
              <Chip
                variant={searchLawsuitStatus === "종결" ? "filled" : "outlined"}
                label={`종결 (${cLength})`}
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
          cases={filteredCases.map((item) => ({
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
      <CaseAddPopUpButton />
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
  );
}

export default CaseListPage;
