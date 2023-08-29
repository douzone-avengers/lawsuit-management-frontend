import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableFooter, TablePagination } from "@mui/material";
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

type Props = {
  cases: (LawsuitInfo & { onClick: () => void })[];
  count: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ background: "#2196f3" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }} align="center">
                <b>번호</b>
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                <b>사건명</b>
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                <b>사건번호</b>
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                <b>사건상태</b>
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                <b>의뢰비</b>
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                <b>성공보수</b>
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                <b>담당자 제거</b>
              </TableCell>
            </TableRow>
          </TableHead>
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
                <TableCell align="center" component="th" scope="row">
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell align="center" onClick={item.onClick}>
                  {item.name}
                </TableCell>
                <TableCell align="center">{item.lawsuitNum}</TableCell>
                <TableCell align="center">{item.lawsuitStatus}</TableCell>
                <TableCell align="center">
                  {delimiter(item.commissionFee)}
                </TableCell>
                <TableCell align="center">
                  {delimiter(item.contingentFee)}
                </TableCell>
                <TableCell align="center">
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
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7} style={{ textAlign: "center" }}>
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
    </>
  );
}

export default EmployeeCaseListTable;
