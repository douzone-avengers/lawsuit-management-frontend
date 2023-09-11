import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import PopUp from "../../../../common/PopUp.tsx";
import { useRecoilValue, useSetRecoilState } from "recoil";
import caseExpenseBillRemovePopUpOpenState from "../../../../../states/case/info/expense/CaseExpenseBillRemovePopUpOpenState.tsx";
import caseExpenseBillIdState from "../../../../../states/case/info/expense/CaseExpenseBillIdState.tsx";
import requestDeprecated, {
  RequestFailHandler,
  RequestSuccessHandler,
} from "../../../../../lib/requestDeprecated.ts";
import caseExpenseIdState from "../../../../../states/case/info/expense/CaseExpenseIdState.tsx";
import caseExpenseBillState, {
  CaseExpenseBillRowType,
} from "../../../../../states/case/info/expense/CaseExpenseBillState.tsx";

function CaseExpenseBillRemovePopUp() {
  const caseExpenseId = useRecoilValue(caseExpenseIdState);
  const caseExpenseBillId = useRecoilValue(caseExpenseBillIdState);
  const setExpenseBill = useSetRecoilState(caseExpenseBillState);
  const setExpenseRemovePopUpOpen = useSetRecoilState(
    caseExpenseBillRemovePopUpOpenState,
  );

  const handleRemoveButtonClick = () => {
    const handleRequestSuccess: RequestSuccessHandler = () => {
      const handleRequestSuccess2: RequestSuccessHandler = (res) => {
        const expenseBill: CaseExpenseBillRowType[] = res.data;

        setExpenseBill(
          expenseBill.map((item) => {
            return { ...item, editable: false };
          }),
        );
      };

      requestDeprecated("GET", `expenses/${caseExpenseId}/bill`, {
        onSuccess: handleRequestSuccess2,
      });
    };

    const handleRequestFail: RequestFailHandler = (e) => {
      alert((e.response.data as { code: string; message: string }).message);
    };

    requestDeprecated("PATCH", `/expenses/delete/${caseExpenseBillId}/bill`, {
      params: {
        ...(caseExpenseId !== null && {
          expenseId: caseExpenseId.toString(),
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

export default CaseExpenseBillRemovePopUp;
