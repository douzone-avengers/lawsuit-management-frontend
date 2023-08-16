import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import request, { RequestSuccessHandler } from "../../lib/request";
import { LawsuitStatus } from "../../mock/lawsuit/lawsuitTable";
import caseIdState from "../../states/case/CaseIdState";
import clientIdState from "../../states/client/ClientIdState";
import ClientInfoCard from "../client/ClientInfoCard.tsx";
import CaseListTable from "./CaseListTable.tsx";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { LawsuitInfo } from "./type/LawsuitInfo.tsx";

function CaseListPage() {
  const clientId = useRecoilValue(clientIdState);
  const setCaseId = useSetRecoilState(caseIdState);
  const navigate = useNavigate();
  const [cases, setCases] = useState<LawsuitInfo[]>([]);
  const [lawsuitStatus, setLawsuitStatus] = useState<LawsuitStatus | null>(
    null,
  );
  const totalLength = cases.length;
  const aLength = cases.filter((item) => item.lawsuitStatus === "등록").length;
  const bLength = cases.filter((item) => item.lawsuitStatus === "진행").length;
  const cLength = cases.filter((item) => item.lawsuitStatus === "종결").length;

  useEffect(() => {
    if (typeof clientId !== "number") {
      // TODO
      return;
    }
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: {
        lawsuitList: LawsuitInfo[];
        pageRange: { startPage: number; endPage: number };
      } = res.data;
      setCases(body.lawsuitList);
      setCaseId(body.lawsuitList[0]?.id);
    };

    request("GET", `/lawsuits/clients/${clientId}?curPage=1&itemsPerPage=5`, {
      onSuccess: handleRequestSuccess,
      useMock: false,
    });
  }, [clientId]);

  let filteredCases: LawsuitInfo[];

  switch (lawsuitStatus) {
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

  const handleCaseAddButtonClick = () => {
    navigate("/cases/new");
  };

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
          <TextField size="small" fullWidth />
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
                variant={lawsuitStatus === null ? "filled" : "outlined"}
                label={`전체 (${totalLength})`}
                onClick={() => {
                  setLawsuitStatus(null);
                }}
              />
              <Chip
                variant={lawsuitStatus === "등록" ? "filled" : "outlined"}
                label={`등록 (${aLength})`}
                onClick={() => {
                  setLawsuitStatus("등록");
                }}
              />
              <Chip
                variant={lawsuitStatus === "진행" ? "filled" : "outlined"}
                label={`진행 (${bLength})`}
                onClick={() => {
                  setLawsuitStatus("진행");
                }}
              />
              <Chip
                variant={lawsuitStatus === "종결" ? "filled" : "outlined"}
                label={`종결 (${cLength})`}
                onClick={() => {
                  setLawsuitStatus("종결");
                }}
              />
            </Box>
            <Button variant="contained">검색</Button>
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
        />
      </Box>
      <Button
        variant="contained"
        sx={{ position: "fixed", bottom: 24, right: 24 }}
        onClick={handleCaseAddButtonClick}
      >
        사건 추가
      </Button>
    </Box>
  );
}

export default CaseListPage;
