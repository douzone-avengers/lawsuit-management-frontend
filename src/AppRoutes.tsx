import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Layout from "./Layout";
import HomePage from "./page/HomePage";
import NotFoundPage from "./page/NotFoundPage";
import CasePage from "./page/case/CasePage";
import ClientPage from "./page/client/ClientPage";
import EmployeePage from "./page/employee/EmployeePage";
import { pageState } from "./state/pageState";

export default function AppRoutes() {
  const location = useLocation();
  const setPageState = useSetRecoilState(pageState);

  useEffect(() => {
    const { pathname, search } = location;
    const paths = pathname.substring(1).split("/");
    const params: Record<string, string> = {};
    const paramArr = search
      .substring(1)
      .split("&")
      .map((item) => item.split("="));
    for (const param of paramArr) {
      const [key, value] = param;
      if (value === undefined) {
        break;
      }
      params[key] = value;
    }
    setPageState({ paths, params });
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="client" element={<ClientPage />} />
        <Route path="case" element={<CasePage />} />
        <Route path="employee" element={<EmployeePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
