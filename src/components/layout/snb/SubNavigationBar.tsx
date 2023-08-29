import BalanceIcon from "@mui/icons-material/Balance";
import PersonIcon from "@mui/icons-material/Person";
import { Box, CircularProgress } from "@mui/material";
import List from "@mui/material/List";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import caseIdState from "../../../states/case/CaseIdState.tsx";
import clientIdState from "../../../states/client/ClientIdState.tsx";
import subNavigationBarState from "../../../states/layout/SubNavigationBarState.tsx";
import SubNavigationBarItem, {
  SubNavigationBarItemState,
} from "./SubNavigationBarItem.tsx";
import ClientRegisterPopUpButton from "../../client/ClientRegisterPopUpButton.tsx";
import employeeIdState from "../../../states/employee/EmployeeIdState";
import employeeButtonIdState from "../../../states/employee/EmployeeButtonIdState";
import { MemberInfo } from "../../employee/type/MemberInfo";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../lib/requestDeprecated";
import { ClientData } from "../../../type/ResponseType";
import roleListState from "../../../states/data/roleListState";

function SubNavigationBar() {
  const roleList = useRecoilValue(roleListState);

  const clientId = useRecoilValue(clientIdState);
  const caseId = useRecoilValue(caseIdState);
  const employeeId = useRecoilValue(employeeIdState);
  const [, setSubNavigationBar] = useRecoilState(subNavigationBarState);
  const subNavigationBar = useRecoilValue(subNavigationBarState);
  const employeeButton = useRecoilValue(employeeButtonIdState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (subNavigationBar.type === "client") {
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
        setIsLoaded(true);
      };
      requestDeprecated("GET", "/clients", {
        withToken: true,
        onSuccess: handleRequestSuccess,
      });
    } else if (subNavigationBar.type === "caseClient") {
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
        setIsLoaded(true);
      };
      requestDeprecated("GET", "/clients", {
        onSuccess: handleRequestSuccess,
      });
    } else if (subNavigationBar.type === "case") {
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
        setIsLoaded(true);
      };
      requestDeprecated(
        "GET",
        `/lawsuits/clients/${clientId}?curPage=1&rowsPerPage=5&searchWord=`,
        {
          onSuccess: handleRequestSuccess,
        },
      );
    } else if (subNavigationBar.type === "employee") {
      const handleRequestSuccess: RequestSuccessHandler = (res) => {
        const memberInfos: MemberInfo[] = res.data.memberDtoNonPassList;
        const newItems: SubNavigationBarItemState[] = memberInfos.map(
          (item) => {
            return {
              id: item.id,
              text: item.name,
              subText: roleList.filter((it) => it.id == item.roleId)[0].nameKr,
              url:
                employeeButton === 2
                  ? `employees/${item.id}`
                  : `employees/${item.id}/cases`,
              SvgIcon: BalanceIcon,
            };
          },
        );
        setSubNavigationBar({ ...subNavigationBar, items: newItems });
        setIsLoaded(true);
      };
      requestDeprecated("GET", `/members/employees`, {
        withToken: true,
        onSuccess: handleRequestSuccess,
      });
    }
  }, [subNavigationBar, employeeButton]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {isLoaded ? (
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
                  : subNavigationBar.type === "employee" &&
                    employeeId === item.id
              }
            />
          ))}
        </List>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%", // 이것은 Box가 부모 컴포넌트의 전체 높이를 차지하도록 합니다. 필요에 따라 조정하십시오.
          }}
        >
          <CircularProgress size={100} />
        </Box>
      )}

      {subNavigationBar.type === "client" ||
      subNavigationBar.type === "caseClient" ? (
        <ClientRegisterPopUpButton />
      ) : null}
    </Box>
  );
}

export default SubNavigationBar;
