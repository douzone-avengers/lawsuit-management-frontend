import { useSetRecoilState } from "recoil";
import caseExpenseAddPopUpOpenState from "../../../../../states/case/info/expense/CaseExpenseAddPopUpOpenState.tsx";
import Box from "@mui/material/Box";
import { Button, TableSortLabel } from "@mui/material";
import { HeadCell } from "../../../../employee/type/HeadCell.tsx";
import React from "react";
import TableCell from "@mui/material/TableCell";

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
        background: "#2196f3",
        color: "white",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "15%",
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!headCells[0].canSort ? (
          <TableCell key={headCells[0].id} align="center">
            <b>{headCells[0].label}</b>
          </TableCell>
        ) : (
          <TableCell key={headCells[0].id} align="center">
            <TableSortLabel
              sx={{ align: "center" }}
              active={sortKey === headCells[0].id}
              direction={sortKey === headCells[0].id ? sortOrder : "asc"}
              onClick={() => {
                sortHandler(headCells[0].id);
              }}
            >
              <b>{headCells[0].label}</b>
            </TableSortLabel>
          </TableCell>
        )}
      </Box>
      <Box
        sx={{
          width: "55%",
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!headCells[1].canSort ? (
          <TableCell key={headCells[1].id} align="center">
            <b>{headCells[1].label}</b>
          </TableCell>
        ) : (
          <TableCell key={headCells[1].id} align="center">
            <TableSortLabel
              sx={{ align: "center" }}
              active={sortKey === headCells[1].id}
              direction={sortKey === headCells[1].id ? sortOrder : "asc"}
              onClick={() => {
                sortHandler(headCells[1].id);
              }}
            >
              <b>{headCells[1].label}</b>
            </TableSortLabel>
          </TableCell>
        )}
      </Box>
      <Box
        sx={{
          width: "15%",
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!headCells[2].canSort ? (
          <TableCell key={headCells[2].id} align="center">
            <b>{headCells[2].label}</b>
          </TableCell>
        ) : (
          <TableCell key={headCells[2].id} align="center">
            <TableSortLabel
              sx={{ align: "center" }}
              active={sortKey === headCells[2].id}
              direction={sortKey === headCells[2].id ? sortOrder : "asc"}
              onClick={() => {
                sortHandler(headCells[2].id);
              }}
            >
              <b>{headCells[2].label}</b>
            </TableSortLabel>
          </TableCell>
        )}
      </Box>
      <Box
        sx={{
          width: "20%",
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{ width: "73%", color: "secondary" }}
          onClick={handleExpenseAddButtonClick}
        >
          등록
        </Button>
      </Box>
    </Box>
  );
}

export default CaseExpenseHeaderRow;
