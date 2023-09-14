import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableFooter, TablePagination, TableSortLabel } from "@mui/material";
import React, { useState } from "react";
import { delimiter } from "../../../../lib/convert";
import { LawsuitInfo } from "../../../case/type/LawsuitInfo";
import Button from "@mui/material/Button";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../../../lib/requestDeprecated";
import { useRecoilValue } from "recoil";
import employeeIdState from "../../../../states/employee/EmployeeIdState";
import ConfirmDialog from "../../../common/dialog/ConfirmDialog";
import NormalDialog from "../../../common/dialog/NormalDialog";
import Card from "@mui/material/Card";
import CardTitle from "../../../common/CardTitle";
import { HeadCell } from "../../../case/type/HeadCell";

type Props = {
  cases: (LawsuitInfo & { onClick: () => void })[];
  count: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  sortKey: string;
  setSortKey: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: "desc" | "asc";
  setSortOrder: React.Dispatch<React.SetStateAction<"desc" | "asc">>;
  setRefreshTrigger: React.Dispatch<React.SetStateAction<boolean>>;
};

function EmployeeCaseListTable({
  cases,
  count,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  setRefreshTrigger,
  sortKey,
  setSortKey,
  sortOrder,
  setSortOrder,
}: Props) {
  const employeeId = useRecoilValue(employeeIdState);
  const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] = useState(false);
  const [selectedLawsuitId, setSelectedLawsuitId] = useState<number | null>(
    null,
  );

  const [isResultOpen, setIsResultOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteEmployeeFromLawsuitRequest = (
    lawsuitId: number | null,
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!lawsuitId) {
        reject("Invalid lawsuitId");
        return;
      }

      const handleRequestSuccess: RequestSuccessHandler = (res) => {
        setResultMessage("삭제되었습니다.");
        setIsResultOpen(true);
        setRefreshTrigger(true);
        resolve(res);
      };

      const handleRequestFail: RequestFailHandler = (e) => {
        setResultMessage(
          (e.response.data as { code: string; message: string }).message,
        );
        setIsResultOpen(true);
        reject(e);
      };

      requestDeprecated(
        "PATCH",
        `/members/employees/${employeeId}/lawsuits/${lawsuitId}`,
        {
          withToken: true,

          onSuccess: handleRequestSuccess,
          onFail: handleRequestFail,
        },
      );
    });
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
      id: "number",
      label: "번호",
      canSort: false,
      width: "5%",
    },
    {
      id: "name",
      label: "사건명",
      canSort: true,
      width: "20%",
    },
    {
      id: "lawsuitNum",
      label: "사건번호",
      canSort: true,
      width: "15%",
    },
    {
      id: "lawsuitStatus",
      label: "사건상태",
      canSort: true,
      width: "15%",
    },
    {
      id: "commissionFee",
      label: "의뢰비",
      canSort: true,
      width: "10%",
    },
    {
      id: "contingentFee",
      label: "성공보수",
      canSort: true,
      width: "10%",
    },
    {
      id: "createdAt",
      label: "등록일",
      canSort: true,
      width: "15%",
    },
    {
      id: "remove",
      label: "담당자 제거",
      canSort: false,
      width: "10%",
    },
  ];

  return (
    <>
      <NormalDialog
        openStatus={isResultOpen}
        setOpenStatus={setIsResultOpen}
        title={"결과"}
        text={resultMessage}
      />

      <ConfirmDialog
        openStatus={isRemoveConfirmOpen}
        setOpenStatus={setIsRemoveConfirmOpen}
        title={"담당자 제거"}
        text={`담당자를 제거하시겠습니까? 단, 단일 담당자 사건일 경우 제거할 수 없습니다.`}
        agreeAction={() => deleteEmployeeFromLawsuitRequest(selectedLawsuitId)}
      />

      <Card sx={{ marginBottom: 2, marginTop: 3 }}>
        <CardTitle text="사건 리스트" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {headCells.map((headCell) =>
                  !headCell.canSort ? (
                    <TableCell
                      key={headCell.id}
                      align="left"
                      style={{ width: headCell.width }}
                    >
                      <b>{headCell.label}</b>
                    </TableCell>
                  ) : (
                    <TableCell
                      key={headCell.id}
                      align="left"
                      style={{ width: headCell.width }}
                    >
                      <TableSortLabel
                        active={sortKey === headCell.id}
                        direction={sortKey === headCell.id ? sortOrder : "asc"}
                        onClick={() => {
                          sortHandler(headCell.id);
                        }}
                      >
                        <b>{headCell.label}</b>
                      </TableSortLabel>
                    </TableCell>
                  ),
                )}
              </TableRow>
            </TableHead>
            {cases.length > 0 ? (
              <TableBody>
                {cases.map((item, index) => (
                  <TableRow
                    key={item.id}
                    hover={true}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                    onClick={item.onClick}
                  >
                    <TableCell
                      align="left"
                      component="th"
                      scope="row"
                      style={{ width: headCells[0].width }}
                    >
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ width: headCells[1].width }}
                    >
                      {item.name}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ width: headCells[2].width }}
                    >
                      {item.lawsuitNum ? item.lawsuitNum : "-"}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ width: headCells[3].width }}
                    >
                      {item.lawsuitStatus}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ width: headCells[4].width }}
                    >
                      {delimiter(item.commissionFee)}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ width: headCells[5].width }}
                    >
                      {delimiter(item.contingentFee)}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ width: headCells[6].width }}
                    >
                      {item.createdAt.toString().substring(0, 10)}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ width: headCells[7].width }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={(event) => {
                          event.stopPropagation();
                          setIsRemoveConfirmOpen(true);
                          setSelectedLawsuitId(item.id);
                        }}
                      >
                        담당자 제거
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  colSpan={8}
                >
                  <br />
                  담당 사건이 없습니다.
                  <br />
                  <br />
                </TableCell>
              </TableBody>
            )}

            <TableFooter>
              <TableRow>
                <TableCell colSpan={8} style={{ textAlign: "center" }}>
                  <TablePagination
                    sx={{ display: "inline-flex", verticalAlign: "middle" }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={count}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}

export default EmployeeCaseListTable;
