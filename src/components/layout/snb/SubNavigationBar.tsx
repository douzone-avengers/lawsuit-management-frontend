import BalanceIcon from "@mui/icons-material/Balance";
import PersonIcon from "@mui/icons-material/Person";
import { Box } from "@mui/material";
import List from "@mui/material/List";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import request, { RequestSuccessHandler } from "../../../lib/request.ts";
import { ClientData } from "../../../mock/client/clientTable.ts";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import subNavigationBarState from "../../../states/layout/SubNavigationBarState.tsx";
import subNavigationBarTypeState from "../../../states/layout/SubNavigationBarTypeState.tsx";
import SubNavigationBarItem, {
  SubNavigationBarItemState,
} from "./SubNavigationBarItem.tsx";
import ClientRegisterPopUpButton from "../../client/ClientRegisterPopUpButton.tsx";
import employeeIdState from "../../../states/employee/EmployeeIdState";
import employeeButtonIdState from "../../../states/employee/EmployeeButtonIdState";
import { MemberInfo } from "../../employee/type/MemberInfo";

function SubNavigationBar() {
  const clientId = useRecoilValue(clientIdState);
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
        const body: ClientData[] = res.data;
        const newItems: SubNavigationBarItemState[] = body.map((item) => {
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
        useMock: false,
        withToken: true,
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
        setSubNavigationBar({ ...subNavigationBar, items: newItems });
      };
      request("GET", "/clients", {
        onSuccess: handleRequestSuccess,
        useMock: false,
      });
    } else if (subNavigationBarType === "case") {
      const handleRequestSuccess: RequestSuccessHandler = (res) => {
        const body: {
          lawsuitList: { id: number; name: string; lawsuitNum: string }[];
          pageRange: { startPage: number; endPage: number };
        } = res.data;

        const newItems: SubNavigationBarItemState[] = body.lawsuitList.map(
          (item) => {
            return {
              id: item.id,
              text: item.name,
              subText: item.lawsuitNum,
              url: `cases/${item.id}?client=${clientId}`,
              SvgIcon: BalanceIcon,
            };
          },
        );
        setSubNavigationBar({ ...subNavigationBar, items: newItems });
      };
      request("GET", `/lawsuits/clients/${clientId}?curPage=1&itemsPerPage=5`, {
        onSuccess: handleRequestSuccess,
        useMock: false,
      });
    } else if (subNavigationBarType === "employee") {
      const handleRequestSuccess: RequestSuccessHandler = (res) => {
        const memberInfos: MemberInfo[] = res.data.memberDtoNonPassList;

        const newItems: SubNavigationBarItemState[] = memberInfos.map(
          (item) => {
            return {
              id: item.id,
              text: item.name,
              subText: item.roleId.toString(),
              url:
                employeeButton === 2
                  ? `employees/${item.id}`
                  : `employees/${item.id}/cases`,
              SvgIcon: BalanceIcon,
            };
          },
        );

        //타겟
        setSubNavigationBar({ ...subNavigationBar, items: newItems });
      };

      request("GET", `/members/employees`, {
        useMock: false,
        withToken: true,
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
              clientId === item.id
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
