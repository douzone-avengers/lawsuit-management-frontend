import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import request, { RequestSuccessHandler } from "../../../lib/request.ts";
import {
  LawsuitData,
  LawsuitStatus,
} from "../../../mock/lawsuit/lawsuitTable.ts";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import ClientInfoCard from "../../client/ClientInfoCard.tsx";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AdviceListTable from "./AdviceListTable.tsx";
import { Advicedata } from "../../../mock/advice/advicedata.ts";

function Adviceinfo() {
  const clientId = useRecoilValue(clientIdState);
  const setCaseId = useSetRecoilState(caseIdState);
  const navigate = useNavigate();
  const [cases, setCases] = useState<Advicedata[]>([]);
  // const [lawsuitStatus, setLawsuitStatus] = useState<Advicedata | null>(null);

  useEffect(() => {
    if (typeof clientId !== "number") {
      // TODO
      return;
    }
    const handleRequestSuccess: RequestSuccessHandler = (res) => {
      const body: { data: Advicedata[] } = res.data;
      const { data } = body;
      setCases(data);
      setCaseId(data[0]?.id);
    };

    request("GET", `/lawsuit/clients/${clientId}`, {
      onSuccess: handleRequestSuccess,
    });
  }, [clientId]);

  // cases를 필터링하여 filteredCases에 할당
  const filteredCases: Advicedata[] = cases.filter((item) => {
    // 원하는 필터링 로직을 여기에 추가
    // 예시: item.title이 "상담"을 포함하는 경우만 필터링
    return true;
  });

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
      {/* <ClientInfoCard /> */}
      <Box>
        <Button variant="contained" sx={{ position: "revert" }}>
          상담 등록
        </Button>
      </Box>
      <Box>
        {/* filteredCases를 AdviceListTable 컴포넌트에 전달 */}
        <AdviceListTable
          cases={filteredCases.map((item) => ({
            ...item,
            onClick: () => {
              navigate(`/cases/${item.id}?client=${clientId}`);
              <ClientInfoCard></ClientInfoCard>;
            },
          }))}
        />
      </Box>
    </Box>
  );
}

export default Adviceinfo;
