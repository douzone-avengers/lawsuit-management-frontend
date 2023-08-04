export type ExpenseData = {
  id: number;
  lawsuitId: number;
  speningAt: Date;
  contents: string;
  amount: number;
  isDeleted: boolean;
};

const expenseTable: ExpenseData[] = [
  {
    id: 1,
    lawsuitId: 1,
    speningAt: new Date("2023-07-05"),
    contents: "지불내용 1",
    amount: 100000,
    isDeleted: false,
  },
  {
    id: 2,
    lawsuitId: 1,
    speningAt: new Date("2023-07-10"),
    contents: "지불내용 2",
    amount: 200000,
    isDeleted: false,
  },
  {
    id: 3,
    lawsuitId: 1,
    speningAt: new Date("2023-07-15"),
    contents: "지불내용 3",
    amount: 300000,
    isDeleted: false,
  },
  {
    id: 4,
    lawsuitId: 1,
    speningAt: new Date("2023-07-17"),
    contents: "지불내용 4",
    amount: 400000,
    isDeleted: false,
  },
  {
    id: 5,
    lawsuitId: 1,
    speningAt: new Date("2023-07-21"),
    contents: "지불내용 5",
    amount: 500000,
    isDeleted: false,
  },
  {
    id: 6,
    lawsuitId: 1,
    speningAt: new Date("2023-07-26"),
    contents: "지불내용 6",
    amount: 600000,
    isDeleted: false,
  },
  {
    id: 7,
    lawsuitId: 1,
    speningAt: new Date("2023-07-28"),
    contents: "지불내용 7",
    amount: 700000,
    isDeleted: false,
  },
  {
    id: 8,
    lawsuitId: 1,
    speningAt: new Date("2023-07-31"),
    contents: "지불내용 8",
    amount: 800000,
    isDeleted: false,
  },
  {
    id: 9,
    lawsuitId: 1,
    speningAt: new Date("2023-08-10"),
    contents: "지불내용 9",
    amount: 900000,
    isDeleted: false,
  },
  {
    id: 10,
    lawsuitId: 1,
    speningAt: new Date("2023-08-19"),
    contents: "지불내용 10",
    amount: 1000000,
    isDeleted: false,
  },
];

export default expenseTable;
