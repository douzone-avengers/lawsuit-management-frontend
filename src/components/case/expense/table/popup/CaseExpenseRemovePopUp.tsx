import { useRecoilValue, useSetRecoilState } from "recoil";
import caseExpenseRemovePopUpOpenState from "../../../../../states/case/info/expense/CaseExpenseRemovePopUpOpenState.tsx";
import Button from "@mui/material/Button";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../../../../lib/requestDeprecated.ts";
import caseExpensesState, {
  CaseExpenseRowType,
} from "../../../../../states/case/info/expense/CaseExpensesState.tsx";
import { caseExpenseSearchUrlState } from "../../../../../states/case/info/expense/CaseExpenseSearchState.tsx";
import caseExpenseSizeState from "../../../../../states/case/info/expense/CaseExpenseSizeState.tsx";
import PopUp from "../../../../common/PopUp.tsx";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import caseExpenseIdState from "../../../../../states/case/info/expense/CaseExpenseIdState.tsx";
import caseExpenseRemoveDialogState from "../../../../../states/case/info/expense/CaseExpenseRemoveDialogState.tsx";

function CaseExpenseRemovePopUp() {
  const setExpenseRemovePopUpOpen = useSetRecoilState(
    caseExpenseRemovePopUpOpenState,
  );
  const setExpenses = useSetRecoilState(caseExpensesState);
  const setSize = useSetRecoilState(caseExpenseSizeState);
  const caseExpenseId = useRecoilValue(caseExpenseIdState);
  const url = useRecoilValue(caseExpenseSearchUrlState);

  const setOpenDialog = useSetRecoilState(caseExpenseRemoveDialogState);

  const handleRemoveButtonClick = () => {
    const handleRequestSuccess: RequestSuccessHandler = () => {
      const handleRequestSuccess2: RequestSuccessHandler = (res) => {
        const {
          expenses,
          size,
        }: { expenses: CaseExpenseRowType[]; size: number } = res.data;
        setExpenses(
          expenses.map((item) => {
            return { ...item, editable: false };
          }),
        );

        setSize(size);
        setOpenDialog({
          open: true,
          title: "삭제 완료",
          message: "지출 정보가 삭제되었습니다.",
        });
      };

      requestDeprecated("GET", url, {
        onSuccess: handleRequestSuccess2,
      });

      setExpenseRemovePopUpOpen(false);
    };

    requestDeprecated("PATCH", `/expenses/delete/${caseExpenseId}`, {
      onSuccess: handleRequestSuccess,
    });
  };

  const handleCloseButtonClick = () => {
    setExpenseRemovePopUpOpen(false);
  };

  return (
    <>
      <PopUp width={480} popUpType="alert">
        <DialogTitle>해당 지출 내역을 삭제하시겠습니까?</DialogTitle>
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

export default CaseExpenseRemovePopUp;
