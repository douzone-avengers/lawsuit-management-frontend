import { rest } from "msw";
import clientAdviceMapTable from "../mapper/clientAdviceMapTable";
import advicedata from "./advicedata";

const adviceDetailHandler = rest.get(
  "/api/lawsuit/clients/:clientId",
  async (req, res, ctx) => {
    const clientId = Number.parseInt(req.params["clientId"] as string);

    const adviceIds = clientAdviceMapTable
      .filter((item) => item.clientId === clientId)
      .map((item) => item.adviceId);

    const result = advicedata.filter((item) => adviceIds.includes(item.id));

    return res(ctx.status(200), ctx.json({ data: result }));
  },
);

const adviceHandlers = [adviceDetailHandler];

export default adviceHandlers;
