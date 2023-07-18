import Button from "@mui/material/Button";
import { useSetRecoilState } from "recoil";
import clientRegisterPopUpState from "../../states/layout/ClientRegisterPopUpOpenState";

function ClientRegisterPopUpButton() {
  const setClientRegisterPopUp = useSetRecoilState(clientRegisterPopUpState);
  const handleClick = () => {
    setClientRegisterPopUp(true);
  };
  return (
    <Button size="large" variant="contained" onClick={handleClick}>
      의뢰인 등록
    </Button>
  );
}

export default ClientRegisterPopUpButton;
