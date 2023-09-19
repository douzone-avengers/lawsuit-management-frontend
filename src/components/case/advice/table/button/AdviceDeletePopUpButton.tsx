import adviceDeletePopUpOpenState from "../../../../../states/advice/adviceDeletePopUpOpenState.tsx";
import { useSetRecoilState } from "recoil";
import Button from "@mui/material/Button";
import adviceIdState from "../../../../../states/advice/AdviceIdState.tsx";

type Props = {
  curAdviceId: number;
};

function AdviceDeletePopUpButton({ curAdviceId }: Props) {
  const setAdviceDeletePopUp = useSetRecoilState(adviceDeletePopUpOpenState);
  const setAdviceId = useSetRecoilState(adviceIdState);

  const handleAdviceDeleteButtonClick = () => {
    setAdviceId(curAdviceId);
    setAdviceDeletePopUp(true);
  };

  return (
    <Button
      variant={"outlined"}
      color="error"
      onClick={handleAdviceDeleteButtonClick}
    >
      삭제
    </Button>
  );
}

export default AdviceDeletePopUpButton;
