import { rest, setupWorker } from "msw";

type ClientRow = {
  id: number;
  email: string;
  password: string;
  signupStatus: boolean;
  name: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

const clients: ClientRow[] = [
  {
    id: 0,
    email: "이메일0",
    password: "비밀번호0",
    signupStatus: true,
    name: "이름0",
    phone: "전화번호0",
    address: "주소0",
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  },
  {
    id: 1,
    email: "이메일1",
    password: "비밀번호1",
    signupStatus: true,
    name: "이름1",
    phone: "전화번호1",
    address: "주소1",
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  },
  {
    id: 2,
    email: "이메일2",
    password: "비밀번호2",
    signupStatus: true,
    name: "이름2",
    phone: "전화번호2",
    address: "주소2",
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  },
  {
    id: 3,
    email: "이메일3",
    password: "비밀번호3",
    signupStatus: true,
    name: "이름3",
    phone: "전화번호3",
    address: "주소3",
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  },
  {
    id: 4,
    email: "이메일4",
    password: "비밀번호4",
    signupStatus: true,
    name: "이름4",
    phone: "전화번호4",
    address: "주소4",
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  },
];

type LawsuitRow = {
  id: number;
  lawsuitType: string;
  courtName: string;
  lawsuitStatus: "등록" | "진행" | "종결";
  result: "원고승" | "원고패";
  name: string;
  commissionFee: number;
  contingentFee: number;
  lawsuitNum: string;
  judgementDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
};

const lawsuits: LawsuitRow[] = [
  {
    id: 0,
    lawsuitType: "형사",
    courtName: "법원 0",
    lawsuitStatus: "등록",
    result: "원고승",
    name: "사건 0",
    commissionFee: 0,
    contingentFee: 0,
    lawsuitNum: "0",
    judgementDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
  },
  {
    id: 1,
    lawsuitType: "형사",
    courtName: "법원 1",
    lawsuitStatus: "등록",
    result: "원고승",
    name: "사건 1",
    commissionFee: 1,
    contingentFee: 1,
    lawsuitNum: "1",
    judgementDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
  },
  {
    id: 2,
    lawsuitType: "형사",
    courtName: "법원 2",
    lawsuitStatus: "등록",
    result: "원고승",
    name: "사건 2",
    commissionFee: 2,
    contingentFee: 2,
    lawsuitNum: "2",
    judgementDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
  },
  {
    id: 3,
    lawsuitType: "형사",
    courtName: "법원 3",
    lawsuitStatus: "등록",
    result: "원고승",
    name: "사건 3",
    commissionFee: 3,
    contingentFee: 3,
    lawsuitNum: "3",
    judgementDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
  },
  {
    id: 4,
    lawsuitType: "형사",
    courtName: "법원 4",
    lawsuitStatus: "등록",
    result: "원고승",
    name: "사건 4",
    commissionFee: 4,
    contingentFee: 4,
    lawsuitNum: "4",
    judgementDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
  },
  {
    id: 5,
    lawsuitType: "형사",
    courtName: "법원 5",
    lawsuitStatus: "등록",
    result: "원고승",
    name: "사건 5",
    commissionFee: 5,
    contingentFee: 5,
    lawsuitNum: "5",
    judgementDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
  },
  {
    id: 6,
    lawsuitType: "형사",
    courtName: "법원 6",
    lawsuitStatus: "등록",
    result: "원고승",
    name: "사건 6",
    commissionFee: 6,
    contingentFee: 6,
    lawsuitNum: "6",
    judgementDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
  },
  {
    id: 7,
    lawsuitType: "형사",
    courtName: "법원 7",
    lawsuitStatus: "등록",
    result: "원고승",
    name: "사건 7",
    commissionFee: 7,
    contingentFee: 7,
    lawsuitNum: "7",
    judgementDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
  },
  {
    id: 8,
    lawsuitType: "형사",
    courtName: "법원 8",
    lawsuitStatus: "등록",
    result: "원고승",
    name: "사건 8",
    commissionFee: 8,
    contingentFee: 8,
    lawsuitNum: "8",
    judgementDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
  },
  {
    id: 9,
    lawsuitType: "형사",
    courtName: "법원 9",
    lawsuitStatus: "등록",
    result: "원고승",
    name: "사건 9",
    commissionFee: 9,
    contingentFee: 9,
    lawsuitNum: "9",
    judgementDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
  },
];

const handlers = [
  rest.get("/api/clients", async (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        clients.map((item) => {
          return {
            id: item.id,
            name: item.name,
            url: `/api/clients/${item.id}`,
          };
        })
      )
    );
  }),

  rest.get("/api/clients/:id", (req, res, ctx) => {
    const id = Number(req.params["id"]);
    const client = clients.filter((item) => item.id === id)[0];
    return res(
      ctx.status(200),
      ctx.json({
        id: client.id,
        email: client.email,
        name: client.name,
        phone: client.phone,
        address: client.address,
      })
    );
  }),

  rest.get("/api/lawsuits", async (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        lawsuits.map((item) => {
          return {
            id: item.id,
            name: item.name,
            url: `/api/lawsuits/${item.id}`,
          };
        })
      )
    );
  }),

  rest.get("/api/lawsuits/:id", (req, res, ctx) => {
    const id = Number(req.params["id"]);
    const advice = lawsuits.filter((item) => item.id === id)[0];
    return res(
      ctx.status(200),
      ctx.json({
        id: advice.id,
        lawsuitType: advice.lawsuitType,
        name: advice.name,
        courtName: advice.courtName,
        commissionFee: advice.commissionFee,
        contingentFee: advice.contingentFee,
        lawsuitStatus: advice.lawsuitStatus,
        lawsuitNum: advice.lawsuitNum,
        result: advice.result,
        judgementDate: advice.judgementDate,
      })
    );
  }),
];

export const worker = setupWorker(...handlers);
