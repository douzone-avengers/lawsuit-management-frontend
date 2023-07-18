import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import request, { RequestSuccessHandler } from "../../lib/request";
import { LawsuitData, LawsuitStatus } from "../../mock/lawsuit/lawsuitTable";
import caseIdState from "../../states/case/CaseIdState";
import clientIdState from "../../states/client/ClientIdState";
import CaseTable from "../common/CaseTable";

function CaseListPage() {
  const clientId = useRecoilValue(clientIdState);
  const setCaseId = useSetRecoilState(caseIdState);
  const navigate = useNavigate();
  const [cases, setCases] = useState<LawsuitData[]>([]);
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
    const handleRequestSucccess: RequestSuccessHandler = (res) => {
      const body: { data: LawsuitData[] } = res.data;
      const { data } = body;
      setCases(data);
      setCaseId(data[0]?.id);
    };

    request("GET", `/lawsuits/clients/${clientId}`, {
      onSuccess: handleRequestSucccess,
    });
  }, [clientId]);

  let filteredCases: LawsuitData[];

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

  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
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
      </Stack>
      <CaseTable
        cases={filteredCases.map((item) => ({
          ...item,
          onClick: () => {
            navigate(`/cases/${item.id}?client=${clientId}`);
          },
        }))}
      />
    </Box>
  );
}

export default CaseListPage;
