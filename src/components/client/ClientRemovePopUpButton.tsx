import Button from "@mui/material/Button";
import { useSetRecoilState } from "recoil";
import clientRemovePopUpOpenState from "../../states/client/ClientRemovePopUpOpenState.tsx";

function ClientRemovePopUpButton() {
  const setClientRemovePopUp = useSetRecoilState(clientRemovePopUpOpenState);
  const handleClick = () => {
    setClientRemovePopUp(true);
  };
  return (
    <Button variant="contained" size="small" onClick={handleClick}>
      삭제
    </Button>
  );
}

export default ClientRemovePopUpButton;
