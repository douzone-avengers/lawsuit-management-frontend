import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import { Button } from "@mui/material";
import { ChangeEvent, useRef } from "react";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../../../../lib/requestDeprecated.ts";
import { useRecoilValue } from "recoil";
import { isEmployeeState } from "../../../../../states/user/UserState.ts";
import caseExpenseIdState from "../../../../../states/case/info/expense/CaseExpenseIdState.tsx";

type Props = {
  setTrigger: any;
};

function CaseExpenseBillHeaderRow({ setTrigger }: Props) {
  const isEmployee = useRecoilValue(isEmployeeState);
  const expenseId = useRecoilValue(caseExpenseIdState);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const handleRequestSuccess: RequestSuccessHandler = () => {
        setTrigger(true);
      };

      const handleRequestFail: RequestFailHandler = (e) => {
        alert((e.response.data as { code: string; message: string }).message);
      };

      // formData 서버로 전송
      requestDeprecated("POST", `/expenses/${expenseId}/bill`, {
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
            sx={{ width: "100%", color: "secondary", fontSize: 16 }}
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
