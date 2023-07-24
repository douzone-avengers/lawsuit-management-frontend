import { rest } from "msw";
import clientLawsuitMapTable from "../mapper/clientLawsuitMapTable";
import lawsuitTable from "./lawsuitTable";
import memberLawsuitMapTable from "../mapper/memberLawsuitMapTable.ts";
import memberTable from "../member/memberTable.ts";
import hierarchyTable from "../hierarchy/hierarchyTable.ts";
import clientTable from "../client/clientTable.ts";

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
      .map(({ name, hierarchyId }) => {
        return {
          name,
          hierarchy: hierarchyTable.filter((item) => item.id === hierarchyId)[0]
            .name,
        };
      });

    const clientIds = clientLawsuitMapTable
      .filter((item) => item.lawsuitId === lawsuit.id)
      .map((item) => item.clientId);

    const clients = clientTable
      .filter((item) => clientIds.includes(item.id))
      .map(({ name }) => {
        return {
          name,
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

const lawsuitClientDetailHandler = rest.get(
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

const lawsuitHandlers = [lawsuitDetailHandler, lawsuitClientDetailHandler];

export default lawsuitHandlers;
