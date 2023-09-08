import Box from "@mui/material/Box";
import { useRecoilValue } from "recoil";
import caseIdState from "../../states/case/CaseIdState";
import clientIdState from "../../states/client/ClientIdState";
import employeeIdState from "../../states/employee/EmployeeIdState";
import { useEffect, useState } from "react";
import subNavigationBarState from "../../states/layout/SubNavigationBarState.tsx";
import userState from "../../states/user/UserState.ts";

function Debug() {
  const clientId = useRecoilValue(clientIdState);
  const caseId = useRecoilValue(caseIdState);
  const employeeId = useRecoilValue(employeeIdState);
  const subNavigationBar = useRecoilValue(subNavigationBarState);
  const user = useRecoilValue(userState);
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
        zIndex: 9999,
        position: "fixed",
        right: 0,
        bottom: 0,
      }}
    >
      <div>user: {user?.id ?? "null"}</div>
      <div>client: {clientId ?? "null"}</div>
      <div>case: {caseId ?? "null"}</div>
      <div>employee: {employeeId ?? "null"}</div>
      <div>snb: {subNavigationBar.type ?? "null"}</div>
    </Box>
  ) : null;
}

export default Debug;
