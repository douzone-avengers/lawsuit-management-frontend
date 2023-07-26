import { rest } from "msw";
import receptionTable, { ReceptionType } from "./receptionTable.ts";
import * as dayjs from "dayjs";

const getReceptionsHandler = rest.get(
  "/api/receptions",
  async (req, res, ctx) => {
    const lawsuitParam = Number.parseInt(
      req.url.searchParams.get("lawsuit") ?? "",
    );

    if (Number.isNaN(lawsuitParam)) {
      return res(ctx.status(400));
    }

    let receptions = receptionTable.filter(
      (item) => item.lawsuitId === lawsuitParam && !item.isDeleted,
    );

    const statusParam = req.url.searchParams.get("status") ?? "";
    switch (statusParam) {
      case "complete":
        receptions = receptions.filter((item) => item.isDone);
        break;
      case "incomplete":
        receptions = receptions.filter((item) => !item.isDone);
        break;
    }

    const categoryParam = req.url.searchParams.get("category") ?? "";
    switch (categoryParam) {
      case "scheduled":
        receptions = receptions.filter((item) => item.receptionType === "기일");
        break;
      case "fixed":
        receptions = receptions.filter((item) => item.receptionType === "불변");
        break;
    }

    const startParam = req.url.searchParams.get("start") ?? "";
    if (startParam !== "") {
      receptions = receptions.filter((item) =>
        dayjs(item.deadline).isAfter(
          dayjs(startParam).subtract(1, "day"),
          "date",
        ),
      );
    }

    const endParam = req.url.searchParams.get("end") ?? "";
    if (endParam !== "") {
      receptions = receptions.filter((item) =>
        dayjs(item.deadline).isBefore(dayjs(endParam).add(1, "day"), "date"),
      );
    }

    const pageParam = req.url.searchParams.get("page") ?? "0";
    const page = Number.parseInt(pageParam);

    const size = receptions.length;
    receptions = receptions.slice(page * 5, (page + 1) * 5);

    return res(
      ctx.status(200),
      ctx.json({
        data: {
          receptions,
          size,
        },
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

    return res(ctx.status(200), ctx.json({ data: foundReception }));
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
