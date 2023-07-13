import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import AppRoutes from "./AppRoutes";

export default function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </RecoilRoot>
  );
}
