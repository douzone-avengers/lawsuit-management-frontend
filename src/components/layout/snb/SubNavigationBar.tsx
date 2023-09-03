import { Box, CircularProgress } from "@mui/material";
import List from "@mui/material/List";
import { useRecoilValue } from "recoil";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import subNavigationBarState from "../../../states/layout/SubNavigationBarState.tsx";
import SubNavigationBarItem from "./SubNavigationBarItem.tsx";
import ClientRegisterPopUpButton from "../../client/ClientRegisterPopUpButton.tsx";
import employeeIdState from "../../../states/employee/EmployeeIdState";
import snbLoadedState from "../../../states/common/SnbLoadedState.ts";
import "../../../stylesheet/custom.css";

function SubNavigationBar() {
  const clientId = useRecoilValue(clientIdState);
  const caseId = useRecoilValue(caseIdState);
  const employeeId = useRecoilValue(employeeIdState);
  const { type, items } = useRecoilValue(subNavigationBarState);
  const snbLoaded = useRecoilValue(snbLoadedState);

  return (
    <Box
      className="custom-scroll-bar"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        overflowY: "scroll",
      }}
    >
      <List sx={{ width: 240, height: "100%", padding: 0 }}>
        {snbLoaded ? (
          items.map((item) => (
            <SubNavigationBarItem
              key={item.id}
              item={item}
              selected={
                (type === "client" || type === "caseClient") &&
                clientId === item.id
                  ? true
                  : type === "case" && caseId === item.id
                  ? true
                  : type === "employee" && employeeId === item.id
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

      {type === "client" || type === "caseClient" ? (
        <ClientRegisterPopUpButton />
      ) : null}
    </Box>
  );
}

export default SubNavigationBar;
