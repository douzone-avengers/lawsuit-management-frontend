import { rest } from "msw";
import clientLawsuitMapTable from "../mapper/clientLawsuitMapTable";
import lawsuitTable from "./lawsuitTable";
import memberTable from "../member/memberTable.ts";
import clientTable from "../client/clientTable.ts";
import memberLawsuitMapTable from "../mapper/memberLawsuitMapTable";

const lawsuitDetailHandler = rest.get(
  "/api/lawsuits/:lawsuitId",
  async (req, res, ctx) => {
    const lawsuitId = Number.parseInt(req.params["lawsuitId"] as string);

    const lawsuit = lawsuitTable.filter((item) => item.id === lawsuitId)[0];

    if (!lawsuit) {
      res(ctx.status(200));
    }

    const employeeIds = memberLawsuitMapTable
      .filter((item) => item.lawsuitId === lawsuit.id)
      .map((item) => item.memberId);

    const employees = memberTable
      .filter((item) => employeeIds.includes(item.id))
      .map(({ id, name, email }) => {
        return {
          id,
          name,
          email,
        };
      });

    const clientIds = clientLawsuitMapTable
      .filter((item) => item.lawsuitId === lawsuit.id)
      .map((item) => item.clientId);

    const clients = clientTable
      .filter((item) => clientIds.includes(item.id))
      .map(({ id, name, email }) => {
        return {
          id,
          name,
          email,
        };
      });

    return res(
      ctx.status(200),
      ctx.json({
        data: {
          lawsuit,
          employees,
          clients,
        },
      }),
    );
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

const closingHandler = rest.get(
  "/api/lawsuit/:lawsuitId/client/:clientId",
  async (req, res, ctx) => {
    const clientId = Number.parseInt(req.params["clientId"] as string);
    const lawsuitId = Number.parseInt(req.params["lawsuitId"] as string);

    const lawsuitIds = clientLawsuitMapTable
      .filter(
        (item) => item.clientId === clientId && item.lawsuitId === lawsuitId,
      )
      .map((item) => item.lawsuitId);

    const result = lawsuitTable.filter((item) => lawsuitIds.includes(item.id));

    return res(ctx.status(200), ctx.json({ data: result }));
  },
);

const lawsuitHandlers = [
  lawsuitDetailHandler,
  lawsuitByMemberHandler,
  closingHandler,
];

export default lawsuitHandlers;
