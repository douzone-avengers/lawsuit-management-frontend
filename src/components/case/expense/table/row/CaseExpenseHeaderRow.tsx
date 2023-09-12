import { useRecoilValue, useSetRecoilState } from "recoil";
import caseExpenseAddPopUpOpenState from "../../../../../states/case/info/expense/CaseExpenseAddPopUpOpenState.tsx";
import Box from "@mui/material/Box";
import { Button, TableSortLabel } from "@mui/material";
import React from "react";
import TableCell from "@mui/material/TableCell";
import { HeadCell } from "../../../type/HeadCell.tsx";
import { isEmployeeState } from "../../../../../states/user/UserState.ts";

type Props = {
  sortKey: string;
  setSortKey: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: "desc" | "asc";
  setSortOrder: React.Dispatch<React.SetStateAction<"desc" | "asc">>;
};

function CaseExpenseHeaderRow({
  sortKey,
  setSortKey,
  sortOrder,
  setSortOrder,
}: Props) {
  const isEmployee = useRecoilValue(isEmployeeState);

  const setExpenseAddPopUpOpen = useSetRecoilState(
    caseExpenseAddPopUpOpenState,
  );

  const handleExpenseAddButtonClick = () => {
    setExpenseAddPopUpOpen(true);
  };

  const sortHandler = (targetSortKey: string) => {
    if (sortKey === targetSortKey) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
      return;
    }
    setSortKey(targetSortKey);
    setSortOrder("asc");
  };

  const headCells: HeadCell[] = [
    {
      id: "speningAt",
      label: "지출일",
      canSort: true,
    },
    {
      id: "contents",
      label: "내용",
      canSort: true,
    },
    {
      id: "amount",
      label: "금액",
      canSort: true,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: 200,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <TableCell
          key={headCells[0].id}
          sx={{
            minWidth: 150,
            fontSize: 16,
            padding: 0,
            borderBottom: "none",
          }}
          align="center"
        >
          <TableSortLabel
            sx={{ align: "center", paddingLeft: "17.99px" }}
            active={sortKey === headCells[0].id}
            direction={sortKey === headCells[0].id ? sortOrder : "asc"}
            onClick={() => {
              sortHandler(headCells[0].id);
            }}
          >
            <b>{headCells[0].label}</b>
          </TableSortLabel>
        </TableCell>
      </Box>
      <Box
        sx={{
          width: 500,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TableCell
          key={headCells[1].id}
          sx={{
            fontSize: 16,
            padding: 0,
            borderBottom: "none",
            minWidth: 200,
          }}
          align="center"
        >
          <TableSortLabel
            sx={{ align: "center", paddingLeft: "17.99px" }}
            active={sortKey === headCells[1].id}
            direction={sortKey === headCells[1].id ? sortOrder : "asc"}
            onClick={() => {
              sortHandler(headCells[1].id);
            }}
          >
            <b>{headCells[1].label}</b>
          </TableSortLabel>
        </TableCell>
      </Box>
      <Box
        sx={{
          width: 200,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TableCell
          key={headCells[2].id}
          sx={{
            fontSize: 16,
            padding: 0,
            borderBottom: "none",
            minWidth: 100,
          }}
          align="center"
        >
          <TableSortLabel
            sx={{ align: "center", paddingLeft: "17.99px" }}
            active={sortKey === headCells[2].id}
            direction={sortKey === headCells[2].id ? sortOrder : "asc"}
            onClick={() => {
              sortHandler(headCells[2].id);
            }}
          >
            <b>{headCells[2].label}</b>
          </TableSortLabel>
        </TableCell>
      </Box>
      {isEmployee && (
        <Box
          sx={{
            width: 150,
            minWidth: 150,
            height: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{ width: "100%", height: 35, color: "secondary", fontSize: 16 }}
            onClick={handleExpenseAddButtonClick}
          >
            등록
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default CaseExpenseHeaderRow;
