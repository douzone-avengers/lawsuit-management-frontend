import { rest } from "msw";
import clientLawsuitMapTable from "../mapper/clientLawsuitMapTable";
import lawsuitTable from "./lawsuitTable";
import memberLawsuitMapTable from "../mapper/memberLawsuitMapTable";

const lawsuitDetailHandler = rest.get(
  "/api/lawsuits/clients/:clientId",
  async (req, res, ctx) => {
    const clientId = Number.parseInt(req.params["clientId"] as string);

    const lawsuitIds = clientLawsuitMapTable
      .filter((item) => item.clientId === clientId)
      .map((item) => item.lawsuitId);

    const result = lawsuitTable.filter((item) => lawsuitIds.includes(item.id));

    return res(ctx.status(200), ctx.json({ data: result }));
  },
);

const lawsuitByMemberHandler = rest.get(
  "/api/lawsuits/members/:memberId",
  async (req, res, ctx) => {
    const memberId = Number.parseInt(req.params["memberId"] as string);

    const lawsuitIds = memberLawsuitMapTable
      .filter((item) => item.memberId === memberId)
      .map((item) => item.lawsuitId);

    const result = lawsuitTable.filter((item) => lawsuitIds.includes(item.id));

    return res(ctx.status(200), ctx.json({ data: result }));
  },
);

const lawsuitHandlers = [lawsuitDetailHandler, lawsuitByMemberHandler];

export default lawsuitHandlers;
