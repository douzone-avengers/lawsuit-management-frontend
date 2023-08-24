import PopUp from "../common/PopUp.tsx";
import { useSetRecoilState } from "recoil";
import clientRemovePopUpOpenState from "../../states/client/ClientRemovePopUpOpenState.tsx";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

function ClientRemovePopUp() {
  const setClientRemovePopUpOpen = useSetRecoilState(
    clientRemovePopUpOpenState,
  );

  const handleCloseButtonClick = () => {
    setClientRemovePopUpOpen(false);
  };

  return (
    <PopUp width={480} popUpType="alert">
      <DialogTitle>해당 의뢰인을 삭제하시겠습니까?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          사건의 단일 의뢰인일 경우, 사건이 함께 삭제됩니다.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleCloseButtonClick}>
          예
        </Button>
        <Button variant="contained" onClick={handleCloseButtonClick}>
          아니오
        </Button>
      </DialogActions>
    </PopUp>
  );
}

export default ClientRemovePopUp;
