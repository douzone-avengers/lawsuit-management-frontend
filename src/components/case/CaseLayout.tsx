import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import caseButtonIdState from "../../states/case/CaseButtonIdState";
import caseIdState from "../../states/case/CaseIdState";
import clientIdState from "../../states/client/ClientIdState";
import ClientInfo from "../common/ClientInfo";
import CaseRegisterButton from "./CaseRegisterButton";

function CaseLayout() {
  const caseButtonId = useRecoilValue(caseButtonIdState);
  const clientId = useRecoilValue(clientIdState);
  const caseId = useRecoilValue(caseIdState);
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
      <ButtonGroup variant="outlined" size="large" fullWidth>
        <Button
          variant={caseButtonId === 0 ? "contained" : "outlined"}
          onClick={() => {
            navigate(`/cases/list?client=${clientId}`);
          }}
        >
          사건 리스트
        </Button>
        <Button
          variant={caseButtonId === 1 ? "contained" : "outlined"}
          onClick={() => {
            navigate(`/cases/${caseId}?client=${clientId}`);
          }}
        >
          사건 상세
        </Button>
      </ButtonGroup>
      <ClientInfo rightButton={<CaseRegisterButton />} />
      <Outlet />
    </Box>
  );
}

export default CaseLayout;