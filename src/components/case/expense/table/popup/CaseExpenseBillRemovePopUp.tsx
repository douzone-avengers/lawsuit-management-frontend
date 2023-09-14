import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import PopUp from "../../../../common/PopUp.tsx";
import { useRecoilValue, useSetRecoilState } from "recoil";
import caseExpenseBillRemovePopUpOpenState from "../../../../../states/case/info/expense/expenseBill/CaseExpenseBillRemovePopUpOpenState.tsx";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../../../../lib/requestDeprecated.ts";
import caseExpenseIdState from "../../../../../states/case/info/expense/CaseExpenseIdState.tsx";
import caseExpenseBillState, {
  CaseExpenseBillRowType,
} from "../../../../../states/case/info/expense/expenseBill/CaseExpenseBillState.tsx";
import caseExpenseBillSizeState from "../../../../../states/case/info/expense/expenseBill/CaseExpenseBillSizeState.tsx";
import caseExpenseBillPageState from "../../../../../states/case/info/expense/expenseBill/CaseExpenseBillPageState.tsx";
import caseExpenseBillIdState from "../../../../../states/case/info/expense/expenseBill/CaseExpenseBillIdState.tsx";

function CaseExpenseBillRemovePopUp() {
  const caseExpenseId = useRecoilValue(caseExpenseIdState);
  const caseExpenseBillId = useRecoilValue(caseExpenseBillIdState);
  const page = useRecoilValue(caseExpenseBillPageState);
  const setSize = useSetRecoilState(caseExpenseBillSizeState);
  const setExpenseBill = useSetRecoilState(caseExpenseBillState);
  const setExpenseRemovePopUpOpen = useSetRecoilState(
    caseExpenseBillRemovePopUpOpenState,
  );

  const handleRemoveButtonClick = () => {
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

    requestDeprecated("PATCH", `/expenses/delete/${caseExpenseBillId}/bill`, {
      params: {
        ...(caseExpenseId !== null && {
          expenseId: caseExpenseId.toString(),
          page: page.toString(),
        }),
      },
      onSuccess: handleRequestSuccess,
      onFail: handleRequestFail,
    });

    setExpenseRemovePopUpOpen(false);
  };

  const handleCloseButtonClick = () => {
    setExpenseRemovePopUpOpen(false);
  };

  return (
    <>
      <PopUp width={480} popUpType="alert">
        <DialogTitle>해당 증빙 자료를 삭제하시겠습니까?</DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={handleRemoveButtonClick}>
            예
          </Button>
          <Button
            variant="contained"
            onClick={handleCloseButtonClick}
            sx={{
              background: "#ef5350",
              "&:hover": {
                backgroundColor: "red",
              },
            }}
          >
            아니오
          </Button>
        </DialogActions>
      </PopUp>
    </>
  );
}

export default CaseExpenseBillRemovePopUp;
