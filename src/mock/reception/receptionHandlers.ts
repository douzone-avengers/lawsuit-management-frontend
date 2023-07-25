import { rest } from "msw";
import receptionTable, { ReceptionType } from "./receptionTable.ts";

const getReceptionsHandler = rest.get(
  "/api/receptions",
  async (req, res, ctx) => {
    const lawsuitId = Number.parseInt(
      req.url.searchParams.get("lawsuit") ?? "",
    );
    if (Number.isNaN(lawsuitId)) {
      return res(ctx.status(400));
    }

    let data = receptionTable.filter(
      (item) => item.lawsuitId === lawsuitId && !item.isDeleted,
    );

    const typeParam = req.url.searchParams.get("type");
    if (typeParam === "fixed") {
      data = data.filter((item) => item.receptionType === "불변");
    } else if (typeParam === "scheduled") {
      data = data.filter((item) => item.receptionType === "기일");
    }

    return res(
      ctx.status(200),
      ctx.json({
        data,
      }),
    );
  },
);

const getDetailReceptionHandler = rest.get(
  "/api/receptions/:receptionId",
  async (req, res, ctx) => {
    const receptionId = Number.parseInt(
      (req.params["receptionId"] as string) ?? "",
    );

    if (Number.isNaN(receptionId)) {
      return res(ctx.status(400));
    }

    let data = receptionTable.filter(
      (item) => item.id === receptionId && !item.isDeleted,
    )[0];

    return res(
      ctx.status(200),
      ctx.json({
        data,
      }),
    );
  },
);

const postReceptionHandler = rest.post(
  "/api/receptions",
  async (req, res, ctx) => {
    const body: {
      lawsuitId: number;
      isDone: boolean;
      receptionType: ReceptionType;
      contents: string;
      receivedAt: string;
      deadline: string;
    } = await req.json();

    receptionTable.push({
      id: receptionTable.length + 1,
      ...body,
      receivedAt: new Date(body.receivedAt),
      deadline: new Date(body.deadline),
      isDeleted: false,
    });

    return res(ctx.status(200));
  },
);

const updateReceptionHandler = rest.put(
  "/api/receptions/update/:receptionId",
  async (req, res, ctx) => {
    const body: {
      isDone: boolean;
      receptionType: ReceptionType;
      contents: string;
      receivedAt: string;
      deadline: string;
    } = await req.json();

    const receptionId = Number.parseInt(
      (req.params["receptionId"] as string) ?? "",
    );

    if (Number.isNaN(receptionId)) {
      return res(ctx.status(400));
    }

    const foundReception = receptionTable.filter(
      (item) => item.id === receptionId && !item.isDeleted,
    )[0];

    if (!foundReception) {
      return res(ctx.status(400));
    }

    if (body["isDone"] !== undefined) {
      foundReception.isDone = body["isDone"];
    }

    if (body["receptionType"] !== undefined) {
      foundReception.receptionType = body["receptionType"];
    }

    if (body["contents"] !== undefined) {
      foundReception.contents = body["contents"];
    }

    if (body["receivedAt"] !== undefined) {
      foundReception.receivedAt = new Date(body["receivedAt"]);
    }

    if (body["deadline"] !== undefined) {
      foundReception.deadline = new Date(body["deadline"]);
    }

    return res(ctx.status(200));
  },
);

const deleteReceptionHandler = rest.put(
  "/api/receptions/delete/:receptionId",
  async (req, res, ctx) => {
    const receptionId = Number.parseInt(
      (req.params["receptionId"] as string) ?? "",
    );

    if (Number.isNaN(receptionId)) {
      return res(ctx.status(400));
    }

    const foundReception = receptionTable.filter(
      (item) => item.id === receptionId && !item.isDeleted,
    )[0];

    if (!foundReception) {
      return res(ctx.status(400));
    }

    foundReception.isDeleted = true;

    return res(ctx.status(200));
  },
);

const receptionHandler = [
  getReceptionsHandler,
  getDetailReceptionHandler,
  postReceptionHandler,
  updateReceptionHandler,
  deleteReceptionHandler,
];

export default receptionHandler;
