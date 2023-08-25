import Box from "@mui/material/Box";
import { useRecoilValue } from "recoil";
import caseIdState from "../../states/case/CaseIdState";
import clientIdState from "../../states/client/ClientIdState";
import employeeIdState from "../../states/employee/EmployeeIdState";
import subNavigationBarTypeState from "../../states/layout/SubNavigationBarTypeState.tsx";
import { useEffect, useState } from "react";

function Debug() {
  const clientId = useRecoilValue(clientIdState);
  const caseId = useRecoilValue(caseIdState);
  const employeeId = useRecoilValue(employeeIdState);
  const subNavigationBarType = useRecoilValue(subNavigationBarTypeState);

  const [show, setShow] = useState(true);

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setShow((prev) => !prev);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
  }, []);

  return show ? (
    <Box
      sx={{
        position: "absolute",
        right: 200,
        bottom: 0,
      }}
    >
      <div>clientId: {clientId}</div>
      <div>caseId: {caseId}</div>
      <div>employeeId: {employeeId}</div>
      <div>subNavigationBarType: {subNavigationBarType}</div>
    </Box>
  ) : null;
}

export default Debug;
