import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import caseIdState from "../../states/case/CaseIdState";
import clientIdState from "../../states/client/ClientIdState";
import mainNavigationBarState from "../../states/layout/MainNavigationBarState";
import CaseDetailPage from "../case/CaseDetailPage";
import CaseLayout from "../case/CaseLayout";
import CaseListPage from "../case/CaseListPage";
import CasesPage from "../case/CasesPage";
import ClientDetailPage from "../client/ClientDetailPage";
import ClientsPage from "../client/ClientsPage";
import NotFoundPage from "../error/NotFoundPage";
import HomePage from "../home/HomePage";
import JoinPage from "../join/JoinPage";
import Layout from "../layout/Layout";
import LoginPage from "../login/LoginPage";
import EmployeeLayout from "../employee/EmployeeLayout";
import PrivatePage from "../private/PrivatePage";
import EmployeeListPage from "../employee/list/EmployeesListPage";
import employeeIdState from "../../states/employee/EmployeeIdState";
import EmployeeDetailPage from "../employee/case/EmployeeDetailPage";
import caseTabIdState from "../../states/case/CaseTabIdState.tsx";
import ValidatePage from "../join/ValidatePage";
import SchedulePage from "../schedule/SchedulePage.tsx";
import scheduleButtonIsClickState from "../schedule/ScheduleButtonIsClick.tsx";
import subNavigationBarState from "../../states/layout/SubNavigationBarState.tsx";
import requestDeprecated from "../../lib/requestDeprecated.ts";
import { ClientData } from "../../type/ResponseType.ts";
import { SubNavigationBarItemState } from "../layout/snb/SubNavigationBarItem.tsx";
import PersonIcon from "@mui/icons-material/Person";
import BalanceIcon from "@mui/icons-material/Balance";
import { MemberInfo } from "../employee/type/MemberInfo.tsx";
import roleListState from "../../states/data/roleListState.ts";
import snbLoadedState from "../../states/common/SnbLoadedState.ts";
import privateButtonIsClickState from "../../states/private/PrivateButtonIsClickState";

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  const [mainNavigationBar, setMainNavigationBar] = useRecoilState(
    mainNavigationBarState,
  );
  const [subNavigationBar, setSubNavigationBar] = useRecoilState(
    subNavigationBarState,
  );
  const [clientId, setClientId] = useRecoilState(clientIdState);
  const setCaseId = useSetRecoilState(caseIdState);
  const setEmployeeId = useSetRecoilState(employeeIdState);
  const setSnbLoaded = useSetRecoilState(snbLoadedState);

  const setCaseTabId = useSetRecoilState(caseTabIdState);
  const setScheduleButtonIsClick = useSetRecoilState(
    scheduleButtonIsClickState,
  );
  const setPrivateButtonIsClick = useSetRecoilState(privateButtonIsClickState);
  const roleList = useRecoilValue(roleListState);

  useEffect(() => {
    const { pathname, search } = location;

    const paths = pathname.split("/");
    const param: Record<string, string> = {};
    if (search !== "") {
      const arr = search.substring(1).split("&");
      for (const item of arr) {
        const [key, value] = item.split("=");
        param[key] = value;
      }
    }
    const length = paths.length - 1;

    // *
    setCaseTabId(0);
    setScheduleButtonIsClick(false);
    setPrivateButtonIsClick(false);

    // /
    if (length === 1 && paths[1] === "") {
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: -1,
      });
      setSubNavigationBar({
        type: "none",
        curId: -1,
        items: [],
      });
      setSnbLoaded(true);
      setClientId(null);
      setCaseId(null);
      setEmployeeId(null);
      return;
    }

    // /clients
    if (length === 1 && paths[1] === "clients") {
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: 0,
      });
      setSnbLoaded(false);
      requestDeprecated("GET", "/clients", {
        onSuccess: (res) => {
          const body: ClientData[] = res.data;
          const newItems: SubNavigationBarItemState[] = body.map((item) => {
            return {
              id: item.id,
              text: item.name,
              url: `clients/${item.id}`,
              SvgIcon: PersonIcon,
            };
          });
          setSubNavigationBar({
            type: "client",
            curId: newItems[0].id,
            items: newItems,
          });
          setSnbLoaded(true);
        },
      });
      setClientId(null);
      setCaseId(null);
      setEmployeeId(null);
      return;
    }

    // /clients/:clientId
    if (length === 2 && paths[1] === "clients" && paths[2]) {
      const newClientId = Number.parseInt(paths[2]);
      if (subNavigationBar.type === "client") {
        setClientId(newClientId);
        setCaseId(null);
        setEmployeeId(null);
        return;
      }
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: 0,
      });
      setSnbLoaded(false);
      requestDeprecated("GET", "/clients", {
        onSuccess: (res) => {
          const body: ClientData[] = res.data;
          const newItems: SubNavigationBarItemState[] = body.map((item) => {
            return {
              id: item.id,
              text: item.name,
              url: `clients/${item.id}`,
              SvgIcon: PersonIcon,
            };
          });
          setSubNavigationBar({
            type: "client",
            curId: newItems[0].id,
            items: newItems,
          });
          setSnbLoaded(true);
        },
      });
      setClientId(newClientId);
      setCaseId(null);
      setEmployeeId(null);
      return;
    }

    // /cases
    if (length === 1 && paths[1] === "cases") {
      if (subNavigationBar.type === "caseClient") {
        setClientId(null);
        setCaseId(null);
        setEmployeeId(null);
        return;
      }
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: 1,
      });
      setSnbLoaded(false);
      requestDeprecated("GET", "/clients", {
        onSuccess: (res) => {
          const body: { id: number; name: string }[] = res.data;
          const newItems: SubNavigationBarItemState[] = body.map((item) => {
            return {
              id: item.id,
              text: item.name,
              url: `cases/clients/${item.id}`,
              SvgIcon: PersonIcon,
            };
          });
          setSubNavigationBar({
            type: "caseClient",
            curId: newItems[0].id,
            items: newItems,
          });
          setSnbLoaded(true);
        },
      });
      setClientId(null);
      setCaseId(null);
      setEmployeeId(null);

      return;
    }

    // /cases/client/:clientId
    if (
      length === 3 &&
      paths[1] === "cases" &&
      paths[2] === "clients" &&
      paths[3]
    ) {
      const newClientId = Number.parseInt(paths[3]);

      if (subNavigationBar.type === "caseClient") {
        setClientId(newClientId);
        setCaseId(null);
        setEmployeeId(null);
        return;
      }

      setMainNavigationBar({
        ...mainNavigationBar,
        curId: 1,
      });
      setSnbLoaded(false);
      requestDeprecated("GET", "/clients", {
        onSuccess: (res) => {
          const body: { id: number; name: string }[] = res.data;
          const newItems: SubNavigationBarItemState[] = body.map((item) => {
            return {
              id: item.id,
              text: item.name,
              url: `cases/clients/${item.id}`,
              SvgIcon: PersonIcon,
            };
          });
          setSubNavigationBar({
            type: "caseClient",
            curId: newItems[0].id,
            items: newItems,
          });
          setSnbLoaded(true);
        },
      });

      setClientId(newClientId);
      setCaseId(null);
      setEmployeeId(null);
      return;
    }

    // /cases/:caseId/client/:clientId
    if (
      length === 4 &&
      paths[1] === "cases" &&
      paths[2] &&
      paths[3] === "clients" &&
      paths[4]
    ) {
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: 1,
      });

      const newClientId = Number.parseInt(paths[4]);
      const newCaseId = Number.parseInt(paths[2]);

      if (subNavigationBar.type === "case") {
        setClientId(newClientId);
        setCaseId(newCaseId);
        setEmployeeId(null);
        return;
      }

      setSnbLoaded(false);
      requestDeprecated(
        "GET",
        `/lawsuits/clients/${clientId}?curPage=1&rowsPerPage=5&searchWord=`,
        {
          onSuccess: (res) => {
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
                  url: `cases/${item.id}/clients/${clientId}`,
                  SvgIcon: BalanceIcon,
                };
              },
            );
            setSubNavigationBar({
              type: "case",
              curId: newItems[0].id,
              items: newItems,
            });
            setSnbLoaded(true);
          },
        },
      );

      setClientId(newClientId);
      setCaseId(newCaseId);
      setEmployeeId(null);
      return;
    }

    // /employees
    if (length === 1 && paths[1] === "employees") {
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: 2, //사원
      });
      setSubNavigationBar({
        type: "none",
        curId: -1,
        items: [],
      });
      setSnbLoaded(true);
      setClientId(null);
      setCaseId(null);
      setEmployeeId(null);
      return;
    }

    // /employees/:employeeId
    if (
      length === 2 &&
      paths[1] === "employees" &&
      paths[2] &&
      !isNaN(Number(paths[2]))
    ) {
      if (subNavigationBar.type === "employee") {
        setClientId(null);
        setCaseId(null);
        setEmployeeId(Number.parseInt(paths[2]));
        return;
      }

      setMainNavigationBar({
        ...mainNavigationBar,
        curId: 2,
      });
      setSnbLoaded(false);
      requestDeprecated("GET", `/members/employees`, {
        onSuccess: (res) => {
          const memberInfos: MemberInfo[] = res.data.memberDtoNonPassList;
          const newItems: SubNavigationBarItemState[] = memberInfos.map(
            (item) => {
              return {
                id: item.id,
                text: item.name,
                subText: roleList.filter((it) => it.id == item.roleId)[0]
                  .nameKr,
                url: `employees/${item.id}`,
                SvgIcon: BalanceIcon,
              };
            },
          );
          setSubNavigationBar({
            type: "employee",
            curId: newItems[0].id,
            items: newItems,
          });
          setSnbLoaded(true);
        },
      });
      setClientId(null);
      setCaseId(null);
      setEmployeeId(Number.parseInt(paths[2]));

      return;
    }

    // /schedule
    if (length === 1 && paths[1] === "schedule") {
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: -1,
      });
      setSubNavigationBar({
        type: "none",
        curId: -1,
        items: [],
      });
      setSnbLoaded(true);
      setClientId(null);
      setCaseId(null);
      setEmployeeId(null);

      setScheduleButtonIsClick(true);
      return;
    }

    // /private
    if (length === 1 && paths[1] === "private") {
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: -1,
      });
      setSubNavigationBar({
        type: "none",
        curId: -1,
        items: [],
      });
      setSnbLoaded(true);
      setClientId(null);
      setCaseId(null);
      setEmployeeId(null);

      setPrivateButtonIsClick(true);
      return;
    }

    // /login
    if (length === 1 && paths[1] === "login") {
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: -1,
      });
      setSubNavigationBar({
        type: "none",
        curId: -1,
        items: [],
      });
      setSnbLoaded(true);
      setClientId(null);
      setCaseId(null);
      setEmployeeId(null);

      return;
    }

    // /validate
    if (length === 1 && paths[1] === "validate") {
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: -1,
      });
      setSubNavigationBar({
        type: "none",
        curId: -1,
        items: [],
      });
      setSnbLoaded(true);
      setClientId(null);
      setCaseId(null);
      setEmployeeId(null);

      return;
    }

    // /join
    if (length === 1 && paths[1] === "join") {
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: -1,
      });
      setSubNavigationBar({
        type: "none",
        curId: -1,
        items: [],
      });
      setSnbLoaded(true);
      setClientId(null);
      setCaseId(null);
      setEmployeeId(null);

      return;
    }

    // /error
    if (length === 1 && paths[1] === "error") {
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: -1,
      });
      setSubNavigationBar({
        type: "none",
        curId: -1,
        items: [],
      });
      setSnbLoaded(true);
      setClientId(null);
      setCaseId(null);
      setEmployeeId(null);

      return;
    }

    navigate("error");
  }, [location, clientId]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* / */}
        <Route index element={<HomePage />} />
        <Route path="clients">
          {/* /clients */}
          <Route index element={<ClientsPage />} />
          <Route path=":clientId">
            {/* /clients/:clientId */}
            <Route index element={<ClientDetailPage />} />
          </Route>
        </Route>
        <Route path="cases" element={<CaseLayout />}>
          {/* /cases */}
          <Route index element={<CasesPage />} />
          {/*/cases/clients/clientId */}
          <Route path="clients/:clientId" element={<CaseListPage />} />
          {/*/cases/:caseId?client=:clientId */}
          <Route
            path=":caseId/clients/:clientId"
            element={<CaseDetailPage />}
          />
        </Route>
        <Route path="employees" element={<EmployeeLayout />}>
          {/* /employees/}*/}
          <Route path={""} element={<EmployeeListPage />} />
          {/* /employees/:employeeId */}
          <Route path=":employeeId" element={<EmployeeDetailPage />} />
        </Route>
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="private" element={<PrivatePage />} />
      </Route>
      {/* /login */}
      <Route path="login" element={<LoginPage />} />
      {/* /validate */}
      <Route path="validate" element={<ValidatePage />} />
      {/* /join */}
      <Route path="join" element={<JoinPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
