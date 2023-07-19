import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import caseButtonIdState from "../../states/case/CaseButtonIdState";
import caseIdState from "../../states/case/CaseIdState";
import clientIdState from "../../states/client/ClientIdState";
import mainNavigationBarState from "../../states/layout/MainNavigationBarState";
import subNavigationBarTypeState from "../../states/layout/SubNavigationBarTypeState";
import CaseDetailPage from "../case/CaseDetailPage";
import CaseLayout from "../case/CaseLayout";
import CaseListPage from "../case/CaseListPage";
import CasesPage from "../case/CasesPage";
import ClientDetailPage from "../client/ClientDetailPage";
import ClientsPage from "../client/ClientsPage";
import EmployeeDetailPage from "../employee/EmployeeDetailPage";
import EmployeesPage from "../employee/EmployeesPage";
import NotFoundPage from "../error/NotFoundPage";
import HomePage from "../home/HomePage";
import JoinPage from "../join/JoinPage";
import Layout from "../layout/Layout";
import LoginPage from "../login/LoginPage";

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  const setClientId = useSetRecoilState(clientIdState);
  const setCaseId = useSetRecoilState(caseIdState);
  const [mainNavigationBar, setMainNavigationBar] = useRecoilState(
    mainNavigationBarState,
  );
  const setSubNavigationBarType = useSetRecoilState(subNavigationBarTypeState);
  const setCaseButtonId = useSetRecoilState(caseButtonIdState);

  useEffect(() => {
    const { pathname, search } = location;

    console.log(pathname, search);

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

    // /
    if (length === 1 && paths[1] === "") {
      return;
    }

    // /clients
    if (length === 1 && paths[1] === "clients") {
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: 0,
      });
      setSubNavigationBarType("client");
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
      setSubNavigationBarType("client");
      return;
    }

    // /cases
    if (length === 1 && paths[1] === "cases") {
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: 1,
      });
      setSubNavigationBarType("caseClient");
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
      setSubNavigationBarType("caseClient");
      setCaseButtonId(2);
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
      setSubNavigationBarType("case");
      setCaseButtonId(3);
      return;
    }

    // /employees
    if (length === 1 && paths[1] === "employees") {
      setMainNavigationBar({
        ...mainNavigationBar,
        curId: 2,
      });
      return;
    }

    // /login
    if (length === 1 && paths[1] === "login") {
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
      setSubNavigationBarType("client");
      setCaseButtonId(0);
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
        <Route path="employees">
          {/* /employees */}
          <Route index element={<EmployeesPage />} />
          {/* /employees/:employeeId */}
          <Route path=":employeeId" element={<EmployeeDetailPage />} />
        </Route>
        <Route path="cases" element={<CaseLayout />}>
          {/* /cases */}
          <Route index element={<CasesPage />} />
          {/* /cases/list?client=:clientId */}
          <Route path="list" element={<CaseListPage />} />
          {/* /cases/:caseId?client=:clientId */}
          <Route path=":caseId" element={<CaseDetailPage />} />
        </Route>
      </Route>
      {/* /login */}
      <Route path="login" element={<LoginPage />} />
      {/* /join */}
      <Route path="join" element={<JoinPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
