import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import { Button } from "@mui/material";
import { ChangeEvent, useRef } from "react";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../../../../lib/requestDeprecated.ts";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isEmployeeState } from "../../../../../states/user/UserState.ts";
import { caseExpenseBillUrlState } from "../../../../../states/case/info/expense/expenseBill/CaseExpenseBillPageState.tsx";
import caseExpenseBillState, {
  CaseExpenseBillRowType,
} from "../../../../../states/case/info/expense/expenseBill/CaseExpenseBillState.tsx";
import caseExpenseBillSizeState from "../../../../../states/case/info/expense/expenseBill/CaseExpenseBillSizeState.tsx";

function CaseExpenseBillHeaderRow() {
  const isEmployee = useRecoilValue(isEmployeeState);
  const setExpenseBill = useSetRecoilState(caseExpenseBillState);
  const setSize = useSetRecoilState(caseExpenseBillSizeState);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const url = useRecoilValue(caseExpenseBillUrlState);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const handleRequestSuccess: RequestSuccessHandler = (res) => {
        const {
          expenseBill,
          size,
        }: { expenseBill: CaseExpenseBillRowType[]; size: number } = res.data;

        setExpenseBill(
          expenseBill.map((item) => {
            return { ...item, editable: false };
          }),
        );
        setSize(size);
      };

      const handleRequestFail: RequestFailHandler = (e) => {
        alert((e.response.data as { code: string; message: string }).message);
      };

      // formData 서버로 전송
      requestDeprecated("POST", url, {
        body: formData,
        onSuccess: handleRequestSuccess,
        onFail: handleRequestFail,
      });
    }
  };

  const handleExpenseBillAddButtonClick = () => {
    // 파일 선택을 위한 input 요소 클릭
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
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
          sx={{
            minWidth: 150,
            fontSize: 16,
            padding: 0,
            borderBottom: "none",
          }}
          align="center"
        >
          <b>지출 증빙자료</b>
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
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .gif" // 허용할 파일 확장자를 지정
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileInputChange}
          />
          <Button
            variant="contained"
            sx={{ width: "100%", height: 35, color: "secondary", fontSize: 16 }}
            onClick={handleExpenseBillAddButtonClick}
          >
            등록
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default CaseExpenseBillHeaderRow;
