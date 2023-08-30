import PopUp from "../common/PopUp.tsx";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import caseRemovePopUpOpenState from "../../states/case/CaseRemovePopUpOpenState.tsx";
import requestDeprecated, {
  RequestSuccessHandler,
} from "../../lib/requestDeprecated.ts";
import caseIdState from "../../states/case/CaseIdState.tsx";

function CaseRemovePopUp() {
  const setCaseRemovePopUpOpen = useSetRecoilState(caseRemovePopUpOpenState);
  const caseId = useRecoilValue(caseIdState);
  const handleRemoveButtonClick = () => {
    const handleRequestSuccess: RequestSuccessHandler = () => {
      alert("삭제 완료");
    };

    requestDeprecated("PATCH", `/lawsuits/${caseId}`, {
      useMock: false,
      onSuccess: handleRequestSuccess,
    });

    setCaseRemovePopUpOpen(false);
  };

  const handleCloseButtonClick = () => {
    setCaseRemovePopUpOpen(false);
  };

  return (
    <>
      <PopUp width={480} popUpType="alert">
        <DialogTitle>해당 사건을 삭제하시겠습니까?</DialogTitle>
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

export default CaseRemovePopUp;
