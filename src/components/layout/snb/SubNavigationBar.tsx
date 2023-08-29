import { Box } from "@mui/material";
import List from "@mui/material/List";
import { useRecoilValue } from "recoil";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import subNavigationBarState from "../../../states/layout/SubNavigationBarState.tsx";
import SubNavigationBarItem from "./SubNavigationBarItem.tsx";
import ClientRegisterPopUpButton from "../../client/ClientRegisterPopUpButton.tsx";
import employeeIdState from "../../../states/employee/EmployeeIdState";

function SubNavigationBar() {
  const clientId = useRecoilValue(clientIdState);
  const caseId = useRecoilValue(caseIdState);
  const employeeId = useRecoilValue(employeeIdState);
  const subNavigationBar = useRecoilValue(subNavigationBarState);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <List sx={{ width: 240, padding: 0 }}>
        {subNavigationBar.items.map((item) => (
          <SubNavigationBarItem
            key={item.id}
            item={item}
            selected={
              (subNavigationBar.type === "client" ||
                subNavigationBar.type === "caseClient") &&
              clientId === item.id
                ? true
                : subNavigationBar.type === "case" && caseId === item.id
                ? true
                : subNavigationBar.type === "employee" && employeeId === item.id
            }
          />
        ))}
      </List>

      {subNavigationBar.type === "client" ||
      subNavigationBar.type === "caseClient" ? (
        <ClientRegisterPopUpButton />
      ) : null}
    </Box>
  );
}

export default SubNavigationBar;
