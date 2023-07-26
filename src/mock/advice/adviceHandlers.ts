import { rest } from "msw";
import clientAdviceMapTable from "../mapper/clientAdviceMapTable";
import { default as adviceTable, default as advicedata } from "./adviceTable";

const adviceDetailHandler = rest.get(
  "/api/lawsuit/:lawsuitId/client/:clientId/advices",
  async (req, res, ctx) => {
    const clientId = Number.parseInt(req.params["clientId"] as string);
    const lawsuitId = Number.parseInt(req.params["lawsuitId"] as string);

    const adviceIds = clientAdviceMapTable
      .filter(
        (item) => item.clientId === clientId && item.lawsuitId === lawsuitId,
      )
      .map((item) => item.adviceId);

    const result = advicedata.filter((item) => adviceIds.includes(item.id));

    return res(ctx.status(200), ctx.json({ data: result }));
  },
);
const adviceAddHandler = rest.post("/api/advices", async (req, res, ctx) => {
  const body = await req.json();
  // const name = body["name"];
  // const email = body["email"];
  const title = body["title"];
  const contents = body["contents"];
  const date = body["date"];

  adviceTable.push({
    id: adviceTable.length + 1,
    title,
    contents,
    date,
  });
  return res(ctx.status(200), ctx.json({ data: adviceTable }));
});

const adviceHandlers = [adviceDetailHandler, adviceAddHandler];

export default adviceHandlers;
