import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { worker } from "./mock/server.ts";

if (import.meta.env.DEV) {
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <App />
  </>,
);
