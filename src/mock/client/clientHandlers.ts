import { rest } from "msw";
import clientTable from "./clientTable";

const clientsHandler = rest.get("/api/clients", async (_, res, ctx) => {
  return res(ctx.status(200), ctx.json({ data: clientTable }));
});

const clientDetailHandler = rest.get(
  "/api/clients/:clientId",
  async (req, res, ctx) => {
    const clientId = Number.parseInt(req.params["clientId"] as string);

    const client = clientTable.filter((item) => item.id === clientId)[0];

    return res(ctx.status(200), ctx.json({ data: client }));
  }
);

const clientAddHandler = rest.post("/api/clients", async (req, res, ctx) => {
  const body = await req.json();
  const name = body["name"];
  const phone = body["phone"];
  const email = body["email"];
  const address = body["address"];

  clientTable.push({
    id: clientTable.length + 1,
    name,
    phone,
    email,
    address,
  });

  return res(ctx.status(200), ctx.json({ data: clientTable }));
});

const clientHandlers = [clientsHandler, clientDetailHandler, clientAddHandler];

export default clientHandlers;
