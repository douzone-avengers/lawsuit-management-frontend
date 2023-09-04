import { CircularProgress } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import subNavigationBarState from "../../../states/layout/SubNavigationBarState.tsx";
import SubNavigationBarItem from "./SubNavigationBarItem.tsx";
import ClientRegisterPopUpButton from "../../client/ClientRegisterPopUpButton.tsx";
import employeeIdState from "../../../states/employee/EmployeeIdState";
import snbLoadedState from "../../../states/common/SnbLoadedState.ts";
import { Box, CircularProgress, TextField } from "@mui/material";
import List from "@mui/material/List";
import { useRecoilValue } from "recoil";
import "../../../stylesheet/custom.css";
import { useMemo, useState } from "react";


function SubNavigationBar() {
  const clientId = useRecoilValue(clientIdState);
  const caseId = useRecoilValue(caseIdState);
  const employeeId = useRecoilValue(employeeIdState);
  const subNavigationBar = useRecoilValue(subNavigationBarState);
  const [snbLoaded] = useRecoilState(snbLoadedState);
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
    <div
      style={{
        width: 240,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: "1px solid lightgray",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 240,
          height: "100%",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            padding: 0,
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
            }}
          />
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
        </div>
      </div>
      {subNavigationBar.type === "client" ||
      subNavigationBar.type === "caseClient" ? (
        <ClientRegisterPopUpButton />
      ) : null}
    </div>

  );
}

export default SubNavigationBar;
