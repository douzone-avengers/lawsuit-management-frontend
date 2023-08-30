import { Box, CircularProgress } from "@mui/material";
import List from "@mui/material/List";
import { useRecoilState, useRecoilValue } from "recoil";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import subNavigationBarState from "../../../states/layout/SubNavigationBarState.tsx";
import SubNavigationBarItem from "./SubNavigationBarItem.tsx";
import ClientRegisterPopUpButton from "../../client/ClientRegisterPopUpButton.tsx";
import employeeIdState from "../../../states/employee/EmployeeIdState";
import snbLoadedState from "../../../states/common/SnbLoadedState.ts";

function SubNavigationBar() {
  const clientId = useRecoilValue(clientIdState);
  const caseId = useRecoilValue(caseIdState);
  const employeeId = useRecoilValue(employeeIdState);
  const subNavigationBar = useRecoilValue(subNavigationBarState);
  const [snbLoaded] = useRecoilState(snbLoadedState);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <List sx={{ width: 240, height: "100%", padding: 0 }}>
        {snbLoaded ? (
          subNavigationBar.items.map((item) => (
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
                  : subNavigationBar.type === "employee" &&
                    employeeId === item.id
              }
            />
          ))
        ) : (
          <div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </div>
        )}
      </List>

      {subNavigationBar.type === "client" ||
      subNavigationBar.type === "caseClient" ? (
        <ClientRegisterPopUpButton />
      ) : null}
    </Box>
  );
}

export default SubNavigationBar;
