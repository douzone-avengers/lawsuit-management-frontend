import { Route, Routes } from "react-router-dom";
import CasePage from "./page/CasePage";
import ClientPage from "./page/ClientPage";
import EmployeePage from "./page/EmployeePage";
import HomePage from "./page/HomePage";
import NotFoundPage from "./page/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="client" element={<ClientPage />} />
        <Route path="case" element={<CasePage />} />
        <Route path="employee" element={<EmployeePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
