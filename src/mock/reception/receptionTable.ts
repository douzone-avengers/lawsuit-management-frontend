export type Category = "fixed" | "scheduled";

export type ReceptionData = {
  id: number;
  lawsuitId: number;
  deadline: Date;
  status: boolean;
  contents: string;
  receivedAt: Date;
  category: Category;
  isDeleted: boolean;
};

const ReceptionTable: ReceptionData[] = [
  {
    id: 1,
    lawsuitId: 1,
    deadline: new Date("2023-08-15"),
    status: false,
    contents: "불변기간 문서 1",
    receivedAt: new Date("2023-07-20"),
    category: "fixed",
    isDeleted: false,
  },
  {
    id: 2,
    lawsuitId: 1,
    deadline: new Date("2023-09-10"),
    status: false,
    contents: "기일정보 문서 1",
    receivedAt: new Date("2023-07-22"),
    category: "scheduled",
    isDeleted: false,
  },
  {
    id: 3,
    lawsuitId: 1,
    deadline: new Date("2023-07-31"),
    status: false,
    contents: "불변기간 문서 2",
    receivedAt: new Date("2023-07-19"),
    category: "fixed",
    isDeleted: false,
  },
  {
    id: 4,
    lawsuitId: 1,
    deadline: new Date("2023-09-20"),
    status: false,
    contents: "불변기간 문서 3",
    receivedAt: new Date("2023-07-18"),
    category: "fixed",
    isDeleted: false,
  },
  {
    id: 5,
    lawsuitId: 1,
    deadline: new Date("2023-08-05"),
    status: false,
    contents: "기일정보 문서 2",
    receivedAt: new Date("2023-07-25"),
    category: "scheduled",
    isDeleted: false,
  },
  {
    id: 6,
    lawsuitId: 1,
    deadline: new Date("2023-09-02"),
    status: false,
    contents: "불변기간 문서 4",
    receivedAt: new Date("2023-07-21"),
    category: "fixed",
    isDeleted: false,
  },
  {
    id: 7,
    lawsuitId: 1,
    deadline: new Date("2023-08-25"),
    status: false,
    contents: "기일정보 문서 3",
    receivedAt: new Date("2023-07-26"),
    category: "scheduled",
    isDeleted: false,
  },
  {
    id: 8,
    lawsuitId: 1,
    deadline: new Date("2023-09-15"),
    status: false,
    contents: "기일정보 문서 4",
    receivedAt: new Date("2023-07-29"),
    category: "scheduled",
    isDeleted: false,
  },
  {
    id: 9,
    lawsuitId: 1,
    deadline: new Date("2023-08-10"),
    status: false,
    contents: "불변기간 문서 5",
    receivedAt: new Date("2023-07-30"),
    category: "fixed",
    isDeleted: false,
  },
  {
    id: 10,
    lawsuitId: 1,
    deadline: new Date("2023-09-05"),
    status: false,
    contents: "기일정보 문서 5",
    receivedAt: new Date("2023-07-31"),
    category: "scheduled",
    isDeleted: false,
  },
];

export default ReceptionTable;
