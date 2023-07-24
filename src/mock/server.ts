import { setupWorker } from "msw";
import clientHandlers from "./client/clientHandlers";
import lawsuitHandlers from "./lawsuit/lawsuitHandlers";
import memberHandlers from "./member/memberHandlers";
import tokenHandlers from "./token/tokenHandlers";
import adviceHandlers from "./advice/adviceHandlers";
const handlers = [
  ...clientHandlers,
  ...lawsuitHandlers,
  ...tokenHandlers,
  ...memberHandlers,
  ...adviceHandlers,
];

export const worker = setupWorker(...handlers);
