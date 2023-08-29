import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import caseButtonIdState from "../../states/case/CaseButtonIdState";
import caseIdState from "../../states/case/CaseIdState";
import clientIdState from "../../states/client/ClientIdState";
import mainNavigationBarState from "../../states/layout/MainNavigationBarState";
import CaseDetailPage from "../case/CaseDetailPage";
import CaseLayout from "../case/CaseLayout";
import CaseListPage from "../case/CaseListPage";
import CasesPage from "../case/CasesPage";
import ClientDetailPage from "../client/ClientDetailPage";
import ClientsPage from "../client/ClientsPage";
import EmployeeDetailPage from "../employee/detail/EmployeeDetailPage";
import EmployeePage from "../employee/EmployeePage";
import NotFoundPage from "../error/NotFoundPage";
import HomePage from "../home/HomePage";
import JoinPage from "../join/JoinPage";
import Layout from "../layout/Layout";
import LoginPage from "../login/LoginPage";
import EmployeeLayout from "../employee/EmployeeLayout";
import EmployeePrivatePage from "../employee/private/EmployeePrivatePage";
import employeeButtonIdState from "../../states/employee/EmployeeButtonIdState";
import EmployeeListPage from "../employee/list/EmployeesListPage";
import employeeIdState from "../../states/employee/EmployeeIdState";
import EmployeeCasePage from "../employee/case/list/EmployeeCasePage";
import caseTabIdState from "../../states/case/CaseTabIdState.tsx";
import ValidatePage from "../join/ValidatePage";
import SchedulePage from "../schedule/SchedulePage.tsx";
import scheduleButtonIsClickState from "../schedule/ScheduleButtonIsClick.tsx";
import TestPage from "../test/TestPage.tsx";
import subNavigationBarState from "../../states/layout/SubNavigationBarState.tsx";

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  const setSubNavigationBar = useSetRecoilState(subNavigationBarState);
  const setClientId = useSetRecoilState(clientIdState);
  const setCaseId = useSetRecoilState(caseIdState);
  const [mainNavigationBar, setMainNavigationBar] = useRecoilState(
    mainNavigationBarState,
  );
  const setCaseButtonId = useSetRecoilState(caseButtonIdState);
  const setEmployeeButtonId = useSetRecoilState(employeeButtonIdState);
  const setEmployeeId = useSetRecoilState(employeeIdState);
  const setCaseTabId = useSetRecoilState(caseTabIdState);
  const setScheduleButtonIsClick = useSetRecoilState(
    scheduleButtonIsClickState,
  );

  useEffect(() => {
    const { pathname, search } = location;

    console.log(`${pathname}${search}`);

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

    // /
    if (length === 1 && paths[1] === "") {
      setSubNavigationBar("none");
      return;
    }

    // /clients
    if (length === 1 && paths[1] === "clients") {
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: 0,
      });
      setSubNavigationBar("client");
      return;
    }

    // /clients/:clientId
    if (length === 2 && paths[1] === "clients" && paths[2]) {
      const newClientId = Number.parseInt(paths[2]);
      setClientId(newClientId);
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: 0,
      });
      setSubNavigationBar("client");
      return;
    }

    // /cases
    if (length === 1 && paths[1] === "cases") {
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: 1,
      });
      setSubNavigationBar("none");
      return;
    }

    // /cases/new
    if (length === 2 && paths[1] === "cases" && paths[2] === "new") {
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: 1,
      });
      setClientId(null);
      setSubNavigationBar("none");
      return;
    }

    // /cases/list?client=:clientId
    if (
      length === 2 &&
      paths[1] === "cases" &&
      paths[2] === "list" &&
      param["client"]
    ) {
      const newClientId = Number.parseInt(param["client"]);
      setClientId(newClientId);
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: 1,
      });
      setSubNavigationBar("caseClient");
      setCaseButtonId(0);
      return;
    }

    // /cases/:caseId?client=:clientId
    if (length === 2 && paths[1] === "cases" && paths[2] && param["client"]) {
      const newClientId = Number.parseInt(param["client"]);
      setClientId(newClientId);
      const newCaseId = Number.parseInt(paths[2]);
      setCaseId(newCaseId);
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: 1,
      });
      setSubNavigationBar("case");
      setCaseButtonId(1);
      return;
    }

    // /employees
    if (length === 1 && paths[1] === "employees") {
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: 2, //사원
      });
      setSubNavigationBar("none");
      return;
    }

    // /employees/private
    if (length === 2 && paths[1] === "employees" && paths[2] === "private") {
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: 2,
      });
      setEmployeeButtonId(0);
      setSubNavigationBar("none");
      return;
    }

    // /employees/list
    if (length === 2 && paths[1] === "employees" && paths[2] === "list") {
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: 2,
      });
      setEmployeeButtonId(1);
      setSubNavigationBar("none");
      return;
    }

    // /employees/:employeeId
    if (
      length === 2 &&
      paths[1] === "employees" &&
      paths[2] &&
      !isNaN(Number(paths[2]))
    ) {
      setEmployeeButtonId(2);
      setEmployeeId(Number.parseInt(paths[2]));
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: 2,
      });
      setSubNavigationBar("employee");
      return;
    }

    // /employees/:employeeId/cases
    if (
      length === 3 &&
      paths[1] === "employees" &&
      paths[2] &&
      !isNaN(Number(paths[2])) &&
      paths[3] === "cases"
    ) {
      setEmployeeId(Number.parseInt(paths[2]));
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: 2,
      });
      setSubNavigationBar("employee");
      setEmployeeButtonId(3);
      return;
    }

    // /schedule
    if (length === 1 && paths[1] === "schedule") {
      setClientId(null);
      setCaseId(null);
      setEmployeeId(null);
      setSubNavigationBar("none");
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: -1,
      });
      setScheduleButtonIsClick(true);
      return;
    }

    // /login
    if (length === 1 && paths[1] === "login") {
      cleanUp();
      return;
    }

    // /validate
    if (length === 1 && paths[1] === "validate") {
      cleanUp();
      return;
    }

    // /join
    if (length === 1 && paths[1] === "join") {
      cleanUp();
      return;
    }

    // /error
    if (length === 1 && paths[1] === "error") {
      cleanUp();
      return;
    }

    // clean up
    cleanUp();
    navigate("error");

    function cleanUp() {
      setClientId(null);
      setCaseId(null);
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: -1,
      });
      setSubNavigationBar("none");
      setCaseButtonId(0);
      setEmployeeId(null);
      setEmployeeButtonId(0);
    }
  }, [location]);

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

          {/* /cases/list?client=:clientId */}
          <Route path="list" element={<CaseListPage />} />
          {/* /cases/:caseId?client=:clientId */}
          <Route path=":caseId" element={<CaseDetailPage />} />
        </Route>
        <Route path="employees" element={<EmployeeLayout />}>
          {/* /employees */}
          <Route index element={<EmployeePage />} />
          {/*/employees/private*/}
          <Route path="private" element={<EmployeePrivatePage />} />
          {/*/employees/list*/}
          <Route path={"list"} element={<EmployeeListPage />} />
          {/* /employees/:employeeId */}
          <Route path=":employeeId" element={<EmployeeDetailPage />} />
          <Route path=":employeeId/cases" element={<EmployeeCasePage />} />
        </Route>
        <Route path="schedule" element={<SchedulePage />} />
      </Route>
      {/* /login */}
      <Route path="login" element={<LoginPage />} />
      {/* /validate */}
      <Route path="validate" element={<ValidatePage />} />
      {/* /join */}
      <Route path="join" element={<JoinPage />} />
      <Route path="test" element={<TestPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
