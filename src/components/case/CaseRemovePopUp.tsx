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
import clientIdState from "../../states/client/ClientIdState.tsx";
import { useNavigate } from "react-router-dom";

function CaseRemovePopUp() {
  const setCaseRemovePopUpOpen = useSetRecoilState(caseRemovePopUpOpenState);
  const clientId = useRecoilValue(clientIdState);
  const caseId = useRecoilValue(caseIdState);
  const navigate = useNavigate();
  const handleRemoveButtonClick = () => {
    const handleRequestSuccess: RequestSuccessHandler = () => {
      alert("사건이 삭제되었습니다.");
      navigate(`/cases/clients/${clientId}`);
    };

    requestDeprecated("PATCH", `/lawsuits/${caseId}`, {
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
