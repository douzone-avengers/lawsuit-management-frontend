import Box from "@mui/material/Box";
import { useRecoilValue } from "recoil";
import caseIdState from "../../states/case/CaseIdState";
import clientIdState from "../../states/client/ClientIdState";
import employeeIdState from "../../states/employee/EmployeeIdState";

function Debug() {
  const clientId = useRecoilValue(clientIdState);
  const caseId = useRecoilValue(caseIdState);
  const employeeId = useRecoilValue(employeeIdState);

  return (
    <Box
      sx={{
        position: "absolute",
        right: 0,
        bottom: 0,
      }}
    >
      <div>clientId: {clientId}</div>
      <div>caseId: {caseId}</div>
      <div>employeeId: {employeeId}</div>
    </Box>
  );
}

export default Debug;
