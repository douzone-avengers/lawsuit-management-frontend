import BalanceIcon from "@mui/icons-material/Balance";
import PersonIcon from "@mui/icons-material/Person";
import { Box } from "@mui/material";
import List from "@mui/material/List";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import request, { RequestSuccessHandler } from "../../../lib/request.ts";
import { ClientData } from "../../../mock/client/clientTable.ts";
import { LawsuitData } from "../../../mock/lawsuit/lawsuitTable.ts";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import subNavigationBarState from "../../../states/layout/SubNavigationBarState.tsx";
import subNavigationBarTypeState from "../../../states/layout/SubNavigationBarTypeState.tsx";
import SubNavigationBarItem, {
  SubNavigationBarItemState,
} from "./SubNavigationBarItem.tsx";
import ClientRegisterPopUpButton from "../../client/ClientRegisterPopUpButton.tsx";
import { MemberInfo } from "../../../mock/member/memberHandlers";
import employeeIdState from "../../../states/employee/EmployeeIdState";
import employeeButtonIdState from "../../../states/employee/EmployeeButtonIdState";

function SubNavigationBar() {
  const memberId = useRecoilValue(clientIdState);
  const caseId = useRecoilValue(caseIdState);
  const employeeId = useRecoilValue(employeeIdState);
  const [subNavigationBar, setSubNavigationBar] = useRecoilState(
    subNavigationBarState,
  );
  const subNavigationBarType = useRecoilValue(subNavigationBarTypeState);
  const employeeButton = useRecoilValue(employeeButtonIdState);

  useEffect(() => {
    if (subNavigationBarType === "client") {
      const handleRequestSuccess: RequestSuccessHandler = (res) => {
        const body: { data: ClientData[] } = res.data;
        const newItems: SubNavigationBarItemState[] = body.data.map((item) => {
          return {
            id: item.id,
            text: item.name,
            url: `clients/${item.id}`,
            SvgIcon: PersonIcon,
          };
        });
        setSubNavigationBar({ ...subNavigationBar, items: newItems });
      };
      request("GET", "/clients", {
        onSuccess: handleRequestSuccess,
      });
    } else if (subNavigationBarType === "caseClient") {
      const handleRequestSuccess: RequestSuccessHandler = (res) => {
        const body: { id: number; name: string }[] = res.data;
        const newItems: SubNavigationBarItemState[] = body.map((item) => {
          return {
            id: item.id,
            text: item.name,
            url: `cases/list?client=${item.id}`,
            SvgIcon: PersonIcon,
          };
        });
        console.log(newItems);
        setSubNavigationBar({ ...subNavigationBar, items: newItems });
      };
      request("GET", "/clients", {
        onSuccess: handleRequestSuccess,
        useMock: false,
      });
    } else if (subNavigationBarType === "case") {
      const handleRequestSuccess: RequestSuccessHandler = (res) => {
        const body: { data: LawsuitData[] } = res.data;
        const newItems: SubNavigationBarItemState[] = body.data.map((item) => {
          return {
            id: item.id,
            text: item.name,
            subText: item.lawsuitNum,
            url: `cases/${item.id}?client=${memberId}`,
            SvgIcon: BalanceIcon,
          };
        });
        setSubNavigationBar({ ...subNavigationBar, items: newItems });
      };
      request("GET", `/lawsuits/members/${memberId}`, {
        onSuccess: handleRequestSuccess,
      });
    } else if (subNavigationBarType === "employee") {
      const handleRequestSuccess: RequestSuccessHandler = (res) => {
        const body: { data: MemberInfo[] } = res.data;
        const newItems: SubNavigationBarItemState[] = body.data.map((item) => {
          return {
            id: item.id,
            text: item.name,
            subText: item.role,
            url:
              employeeButton === 2
                ? `employees/${item.id}`
                : `employees/${item.id}/cases`,
            SvgIcon: BalanceIcon,
          };
        });
        setSubNavigationBar({ ...subNavigationBar, items: newItems });
      };
      request("GET", `/members?role=ADMIN,EMPLOYEE`, {
        onSuccess: handleRequestSuccess,
      });
    }
  }, [subNavigationBarType]);

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
              (subNavigationBarType === "client" ||
                subNavigationBarType === "caseClient") &&
              memberId === item.id
                ? true
                : subNavigationBarType === "case" && caseId === item.id
                ? true
                : subNavigationBarType === "employee" && employeeId === item.id
            }
          />
        ))}
      </List>
      {subNavigationBarType === "client" ||
      subNavigationBarType === "caseClient" ? (
        <ClientRegisterPopUpButton />
      ) : null}
    </Box>
  );
}

export default SubNavigationBar;
