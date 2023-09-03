import { Box, CircularProgress, TextField } from "@mui/material";
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
import { useMemo, useState } from "react";

function SubNavigationBar() {
  const clientId = useRecoilValue(clientIdState);
  const caseId = useRecoilValue(caseIdState);
  const employeeId = useRecoilValue(employeeIdState);
  const { type, items } = useRecoilValue(subNavigationBarState);
  const snbLoaded = useRecoilValue(snbLoadedState);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(
    () =>
      items.filter((it) =>
        it.text.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [items, searchTerm],
  );

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
      <TextField
        variant="standard"
        placeholder="검색..."
        value={searchTerm}
        type="search"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        sx={{
          width: "100%",
          marginBottom: 2,
          "& .MuiInputBase-input": {
            padding: "10px",
            fontSize: "1rem",
          },
          // "& .MuiInput-underline:before": {
          //   borderBottom: `2px solid ${theme.palette.primary.main}`,
          // },
        }}
      />
      <List sx={{ width: 240, height: "100%", padding: 0 }}>
        {snbLoaded ? (
          filteredItems.map((it) => (
            <SubNavigationBarItem
              key={it.id}
              item={it}
              selected={
                (type === "client" || type === "caseClient") &&
                clientId === it.id
                  ? true
                  : type === "case" && caseId === it.id
                  ? true
                  : type === "employee" && employeeId === it.id
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
