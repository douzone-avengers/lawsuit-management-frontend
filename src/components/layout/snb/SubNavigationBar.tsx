import { CircularProgress } from "@mui/material";
import { useRecoilValue } from "recoil";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import subNavigationBarState from "../../../states/layout/SubNavigationBarState.tsx";
import SubNavigationBarItem from "./SubNavigationBarItem.tsx";
import ClientRegisterPopUpButton from "../../client/ClientRegisterPopUpButton.tsx";
import employeeIdState from "../../../states/employee/EmployeeIdState";
import snbLoadedState from "../../../states/common/SnbLoadedState.ts";
import { useMemo, useState } from "react";
import { isEmployeeState } from "../../../states/user/UserState.ts";
import userClientIdState from "../../../states/user/UserClientIdState.tsx";

function SubNavigationBar() {
  const clientId = useRecoilValue(clientIdState);
  const caseId = useRecoilValue(caseIdState);
  const employeeId = useRecoilValue(employeeIdState);
  const subNavigationBar = useRecoilValue(subNavigationBarState);
  const { items } = useRecoilValue(subNavigationBarState);
  const snbLoaded = useRecoilValue(snbLoadedState);
  const [searchTerm, setSearchTerm] = useState("");
  const isEmployee = useRecoilValue(isEmployeeState);
  const userClientId = useRecoilValue(userClientIdState);

  const filteredItems = isEmployee
    ? useMemo(
        () =>
          items.filter((it) =>
            it.text.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        [items, searchTerm],
      )
    : items.filter((item) => item.id === userClientId);

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
          {isEmployee && (
            <div style={{ height: 48 }}>
              <input
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontSize: 16,
                  height: "100%",
                  width: "99%",
                  border: "none",
                  outline: "none",
                  borderBottom: "1px solid lightgray",
                }}
                placeholder="검색..."
                value={searchTerm}
                type="search"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
          )}
          {snbLoaded ? (
            filteredItems.map((item) => (
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
      {isEmployee &&
      (subNavigationBar.type === "client" ||
        subNavigationBar.type === "caseClient") ? (
        <ClientRegisterPopUpButton />
      ) : null}
    </div>
  );
}

export default SubNavigationBar;
