export type ReceptionType = "불변" | "기일";

export type ReceptionData = {
  id: number;
  lawsuitId: number;
  deadline: Date;
  isDone: boolean;
  contents: string;
  receivedAt: Date;
  receptionType: ReceptionType;
  isDeleted: boolean;
};

const ReceptionTable: ReceptionData[] = [
  {
    id: 1,
    lawsuitId: 0,
    deadline: new Date("2023-08-15"),
    isDone: false,
    contents: "불변기간 문서 1",
    receivedAt: new Date("2023-07-20"),
    receptionType: "불변",
    isDeleted: false,
  },
  {
    id: 2,
    lawsuitId: 0,
    deadline: new Date("2023-09-10"),
    isDone: true,
    contents: "기일정보 문서 1",
    receivedAt: new Date("2023-07-22"),
    receptionType: "기일",
    isDeleted: false,
  },
  {
    id: 3,
    lawsuitId: 0,
    deadline: new Date("2023-07-31"),
    isDone: false,
    contents: "불변기간 문서 2",
    receivedAt: new Date("2023-07-19"),
    receptionType: "불변",
    isDeleted: false,
  },
  {
    id: 4,
    lawsuitId: 0,
    deadline: new Date("2023-09-20"),
    isDone: false,
    contents: "불변기간 문서 3",
    receivedAt: new Date("2023-07-18"),
    receptionType: "불변",
    isDeleted: false,
  },
  {
    id: 5,
    lawsuitId: 0,
    deadline: new Date("2023-08-05"),
    isDone: true,
    contents: "기일정보 문서 2",
    receivedAt: new Date("2023-07-25"),
    receptionType: "기일",
    isDeleted: false,
  },
  {
    id: 6,
    lawsuitId: 0,
    deadline: new Date("2023-09-02"),
    isDone: false,
    contents: "불변기간 문서 4",
    receivedAt: new Date("2023-07-21"),
    receptionType: "불변",
    isDeleted: false,
  },
  {
    id: 7,
    lawsuitId: 0,
    deadline: new Date("2023-08-25"),
    isDone: true,
    contents: "기일정보 문서 3",
    receivedAt: new Date("2023-07-26"),
    receptionType: "기일",
    isDeleted: false,
  },
  {
    id: 8,
    lawsuitId: 0,
    deadline: new Date("2023-09-15"),
    isDone: true,
    contents: "기일정보 문서 4",
    receivedAt: new Date("2023-07-29"),
    receptionType: "기일",
    isDeleted: false,
  },
  {
    id: 9,
    lawsuitId: 0,
    deadline: new Date("2023-08-10"),
    isDone: false,
    contents: "불변기간 문서 5",
    receivedAt: new Date("2023-07-30"),
    receptionType: "불변",
    isDeleted: false,
  },
  {
    id: 10,
    lawsuitId: 0,
    deadline: new Date("2023-09-05"),
    isDone: true,
    contents: "기일정보 문서 5",
    receivedAt: new Date("2023-07-31"),
    receptionType: "기일",
    isDeleted: false,
  },
];

export default ReceptionTable;
