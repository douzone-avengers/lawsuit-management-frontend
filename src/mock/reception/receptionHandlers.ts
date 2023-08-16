import { rest } from "msw";
import receptionTable, { Category } from "./receptionTable.ts";
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

    const contentsParam = req.url.searchParams.get("contents") ?? "";
    if (contentsParam !== "") {
      const regex = new RegExp(contentsParam, "i");
      receptions = receptions.filter((item) => regex.test(item.contents));
    }

    const statusParam = req.url.searchParams.get("status") ?? "";
    switch (statusParam) {
      case "complete":
        receptions = receptions.filter((item) => item.status);
        break;
      case "incomplete":
        receptions = receptions.filter((item) => !item.status);
        break;
    }

    const categoryParam = req.url.searchParams.get("category") ?? "";
    switch (categoryParam) {
      case "scheduled":
        receptions = receptions.filter((item) => item.category === "scheduled");
        break;
      case "fixed":
        receptions = receptions.filter((item) => item.category === "fixed");
        break;
    }

    const startReceivedAtParam =
      req.url.searchParams.get("start-received-at") ?? "";
    if (startReceivedAtParam !== "") {
      receptions = receptions.filter((item) =>
        dayjs(item.receivedAt).isAfter(
          dayjs(startReceivedAtParam).subtract(1, "day"),
          "date",
        ),
      );
    }

    const endReceivedAtParam =
      req.url.searchParams.get("end-received-at") ?? "";
    if (endReceivedAtParam !== "") {
      receptions = receptions.filter((item) =>
        dayjs(item.receivedAt).isBefore(
          dayjs(endReceivedAtParam).add(1, "day"),
          "date",
        ),
      );
    }

    const startDeadlineParam = req.url.searchParams.get("start-deadline") ?? "";
    if (startDeadlineParam !== "") {
      receptions = receptions.filter((item) =>
        dayjs(item.deadline).isAfter(
          dayjs(startDeadlineParam).subtract(1, "day"),
          "date",
        ),
      );
    }

    const endDeadlineParam = req.url.searchParams.get("end-deadline") ?? "";
    if (endDeadlineParam !== "") {
      receptions = receptions.filter((item) =>
        dayjs(item.deadline).isBefore(
          dayjs(endDeadlineParam).add(1, "day"),
          "date",
        ),
      );
    }

    const pageParam = req.url.searchParams.get("page") ?? "0";
    const page = Number.parseInt(pageParam);

    const size = receptions.length;

    receptions = receptions
      .sort((a, b) => b.id - a.id)
      .slice(page * 5, (page + 1) * 5);

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
      status: boolean;
      category: Category;
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
      status: boolean;
      category: Category;
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

    if (body["status"] !== undefined) {
      foundReception.status = body["status"];
    }

    if (body["category"] !== undefined) {
      foundReception.category = body["category"];
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
